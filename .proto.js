var Q = require('qq'),
    INHERIT = require('inherit'),
    PROTO = require('proto'),
    BEM = require('bem').api,
    createLevel = require('bem/lib/level').createLevel,
    Context = require('bem/lib/context').Context,
    PATH = require('path'),
    CP = require('child_process'),
    UTIL = require('util');

exports.getGraph = function() {
    var graph = PROTO.newGraph(),
        all = graph.setNode(new Node('all')),
        build = graph.setNode(new Node('build'), null, all),
        libs = createBlockLibrariesNodes(graph, build);
    createPagesLevelsNodes(graph, build, libs);

    console.log('== Graph on build start ==\n', graph.toString());

    return graph;
};

function createBlockLibrariesNodes(graph, parent) {
    return [
        graph.setNode(new BlocksLibraryNode('bem-bl', 'git://github.com/bem/bem-bl.git'), null, parent)
    ];
}

function createPagesLevelsNodes(graph, parent, children) {
    return [
        graph.setNode(new PagesLevelNode('pages'), null, parent, children)
    ];
}

var Node = INHERIT({

    __constructor: function(id) {
        this.id = id;
    },

    getId: function() {
        return this.id;
    },

    run: function(ctx) {
        var _this = this;
        console.log("[*] Run '%s'", this.getId());
        this.log(UTIL.format("[=] Log of '%s'", this.getId()));
        return Q.when(this.make(ctx), function(res) {
            _this.dumpLog();
            return res;
        });
    },

    make: function(ctx) {},

    log: function(messages) {
        messages = Array.isArray(messages)? messages : [messages];
        this.messages = (this.messages || []).concat(messages);
    },

    formatLog: function() {
        return (this.messages || []).join('\n');
    },

    dumpLog: function() {
        console.log(this.formatLog());
    }

});

var FileNode = INHERIT(Node, {

    __constructor: function(path) {
        this.path = path;
        this.__base(path);
    },

    // TODO: make() must check file existance
    make: function() {}

});

var MagicNode = INHERIT(FileNode, {

    getId: function() {
        return this.id + '*';
    },

    run: function(ctx) {
        if (ctx.graph.hasNode(this.path)) return;
        return this.__base(ctx);
    }

});

var PagesLevelNode = INHERIT(MagicNode, {

    __constructor: function(level) {
        this.level = typeof level == 'string'? createLevel(level) : level;
        this.__base(PATH.basename(this.level.dir));
    },

    make: function(ctx) {
        ctx.plan.lock();

        // create real node for pages level
        var parents = ctx.graph.parents[this.getId()],
            pageLevelNode = ctx.graph.setNode(new FileNode(this.path), null, parents);

        // scan level for pages
        var _this = this,
            decl = this.level.getDeclByIntrospection();

        // generate targets for pages
        decl.forEach(function(block) {
            // generate FileNode based page targets for emply pages
            // (without techs implementation)
            var pageNode;
            if (block.techs) {
                pageNode = ctx.graph.setNode(new PageNode(_this.level, block.name), null, pageLevelNode);
            } else {
                pageNode = ctx.graph.setNode(new FileNode(PATH.join(_this.level, block.name)), null, pageLevelNode);
            }

            // generate targets for subpages
            if (block.elems) block.elems.forEach(function(elem) {
                ctx.graph.setNode(new PageNode(_this.level, block.name, elem.name), null, pageNode);
            });
        });

//        console.log('== PagesLevelNode Graph ==\n', ctx.graph.toString());
//        console.log('== PagesLevelNode Plan ==\n', ctx.plan.toString());

        ctx.plan.unlock();
    }

});

var PageNode = INHERIT(MagicNode, {

    __constructor: function(level, pageName, subPageName) {
        this.level = typeof level == 'string'? createLevel(level) : level;
        this.item = { block: pageName };

        if (subPageName) this.item.elem = subPageName;

        this.__base(PATH.dirname(this.getNodePrefix()));
    },

    make: function(ctx) {
        if (ctx.graph.hasNode(this.path)) return;
        this.__base();

        ctx.plan.lock();

        // create real node for page
        var parents = ctx.graph.parents[this.getId()],
            pageNode = ctx.graph.setNode(new FileNode(this.path), null, parents);

        // generate targets for page files
        for (var tech in this.getTechDeps()) {
            var fileNode = this.createNode(ctx, tech);
            ctx.graph.link(fileNode, pageNode);
        }

        // link targets for page files with each other
        this.linkNodes(ctx);

//        console.log('=== PageNode Graph ===\n', ctx.graph.toString());
//        console.log('=== PageNode Plan ===\n', ctx.plan.toString());

        ctx.plan.unlock();
    },

    createNode: function(ctx, tech) {
        if (this['create-node-' + tech]) {
            return this['create-node-' + tech](ctx, tech);
        }
        return ctx.graph.setNode(new FileNode(this.getPath(tech)));
    },

    linkNodes: function(ctx) {
        var deps = this.getTechDeps();
        for (var tech in deps) {
            for (var i = 0, l = deps[tech].length; i < l; i++) {
                ctx.graph.link(this.getPath(deps[tech][i]), this.getPath(tech));
            }
        }
    },

    getPath: function(tech) {
        // TODO: use Tech object to construct paths
        return this.getNodePrefix() + '.' + tech;
    },

    getTechDeps: function() {
        return {
            'bemjson.js': [],
            'bemdecl.js': ['bemjson.js'],
            'deps.js': ['bemdecl.js'],
            'html': ['bemjson.js', 'bemhtml.js'],
            'bemhtml.js': ['deps.js'],
            'css': ['deps.js'],
            'ie.css': ['deps.js'],
            'js': ['deps.js']
        };
    },

    getNodePrefix: function() {
        if (!this._nodeSuffix) {
            this._nodeSuffix = PATH.join(PATH.basename(this.level.dir), this.level.getRelByObj(this.item));
        }
        return this._nodeSuffix;
    },

    getLevels: function() {
        // TODO: move to config
        // TODO: page level blocks: 'pages/example/blocks'
        return [
            'bem-bl/blocks-common/',
            'bem-bl/blocks-desktop/',
            'blocks/'
        ];
    },

    getBemBuildNode: function(techName, techPath, declTech) {
        // TODO: page level blocks: 'pages/example/blocks'
        return new BemBuildNode(this.getLevels(), this.getPath(declTech), techPath, techName, this.getNodePrefix());
    },

    'create-node-bemdecl.js': function(ctx, tech) {
        return ctx.graph.setNode(new BemCreateNode(this.level, this.item, tech));
    },

    'create-node-deps.js': function(ctx, tech) {
        return ctx.graph.setNode(this.getBemBuildNode(tech, tech, 'bemdecl.js'));
    },

    'create-node-html': function(ctx, tech) {
        var techHtml = require.resolve('./bem-bl/blocks-common/i-bem/bem/techs/html');
        return ctx.graph.setNode(new BemCreateNode(this.level, this.item, techHtml, tech));
    },

    'create-node-bemhtml.js': function(ctx, tech) {
        var techBemHtml = require.resolve('./bem-bl/blocks-common/i-bem/bem/techs/bemhtml.js');
        return ctx.graph.setNode(this.getBemBuildNode(tech, techBemHtml, 'deps.js'));
    },

    'create-node-js': function(ctx, tech) {
        return ctx.graph.setNode(this.getBemBuildNode(tech, tech, 'deps.js'));
    },

    'create-node-css': function(ctx, tech) {
        return ctx.graph.setNode(this.getBemBuildNode(tech, tech, 'deps.js'));
    },

    'create-node-ie.css': function(ctx, tech) {
        return ctx.graph.setNode(this.getBemBuildNode(tech, tech, 'deps.js'));
    }

});

var BlocksLibraryNode = INHERIT(Node, {

    __constructor: function(path, repo, treeish) {
        this.path = path;
        this.repo = repo;
        this.treeish = treeish || 'master';
        this.__base(this.path);
    },

    make: function() {
        var _this = this,
            up = Q.defer(),
            cmd;

        if (PATH.existsSync(this.path)) {
            // git pull origin master
            cmd = UTIL.format('cd %s && git pull --progress origin master', this.path);
        } else {
            // git clone repo path
            cmd = UTIL.format('git clone --progress %s %s', this.repo, this.path);
        }

        this.log(cmd);
        CP.exec(cmd, function(err, stdout, stderr) {
            stdout && _this.log(stdout);
            stderr && _this.log(stderr);

            err? up.reject(err) : up.resolve();
        });

        return Q.when(up.promise, function() {
            // git checkout treeish
            var co = Q.defer();
                cmd = UTIL.format('cd %s && git checkout %s', _this.path, _this.treeish);

            _this.log(cmd);
            CP.exec(cmd, function(err, stdout, stderr) {
                stdout && _this.log(stdout);
                stderr && _this.log(stderr);

                err? co.reject(err) : co.resolve();
            });
            return co.promise;
        });
    }

});

var BemCreateNode = INHERIT(FileNode, {

    __constructor: function(level, item, tech, techName) {
        this.level = typeof level == 'string'? createLevel(level) : level;
        this.item = item;
        this.tech = this.level.getTech(techName, tech);

        var prefix = PATH.join(PATH.basename(this.level.dir), this.level.getRelByObj(this.item));
        this.__base(this.tech.getPath(prefix));
    },

    make: function() {
        var p = this.parseItem(this.item);
        p.opts.levelDir = this.level.dir;
        p.opts.forceTech = this.tech.getTechPath();

        this.log(UTIL.format('bem.create.%s(\n %j,\n %j\n)', p.cmd, p.opts, p.args));

        return BEM.create[p.cmd](p.opts, p.args);
    },

    parseItem: function(item) {
        var cmd = 'block',
            opts = { force: true },
            args = { names: item.block };
        if (item.mod) {
            cmd = 'mod';
            opts.blockName = item.block;
            args.names = item.mod;
            item.elem && (opts.elemName = item.elem);
            item.val && (opts.modVal = item.val);
        } else if (item.elem) {
            cmd = 'elem';
            opts.blockName = item.block;
            args.names = item.elem;
        }

        return {
            cmd: cmd,
            opts: opts,
            args: args
        };
    }

});

var BemBuildNode = INHERIT(FileNode, {

    __constructor: function(levels, decl, techPath, techName, output) {
        this.levelsPaths = levels;
        this.levels = levels.map(function(l) {
            return createLevel(l);
        });
        this.decl = decl;
        this.techPath = techPath;
        this.output = output;

        var ctx = new Context(this.levels);
        this.tech = ctx.getTech(techName, techPath);

        this.__base(this.tech.getPath(this.output));
    },

    make: function() {
        var opts = {
            level: this.levelsPaths,
            declaration: this.decl,
            tech: this.techPath,
            outputDir: PATH.dirname(this.output),
            outputName: PATH.basename(this.output)
        };

        this.log(UTIL.format('bem.build(\n %j\n)', opts));

        return BEM.build(opts);
    }

});
