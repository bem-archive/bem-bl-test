var Q = require('qq'),
    INHERIT = require('inherit'),
    PROTO = require('proto'),
    BEM = require('bem').api,
    createLevel = require('bem/lib/level').createLevel,
    createTech = require('bem/lib/tech').createTech,
    Context = require('bem/lib/context').Context,
    PATH = require('path'),
    CP = require('child_process'),
    UTIL = require('util');

exports.getGraph = function() {
    var graph = PROTO.newGraph();

    createBemBlNode(graph);
    createPagesNode(graph);
    createAllNode(graph);

    console.log('== Graph on build start ==\n', graph.toString());

    return graph;
};

function createAllNode(graph) {
    graph.setNode({}, 'all', null, ['pages*', 'bem-bl']);
}

function createBemBlNode(graph) {
    graph.setNode(new BlocksLibraryNode('bem-bl', 'git://github.com/bem/bem-bl.git'), 'bem-bl');
}

function createPagesNode(graph) {
    /*
    var levels = [
            'bem-bl/blocks-common/',
            'bem-bl/blocks-desktop/',
            'blocks/',
            'pages/example/blocks'
        ],

        pagesFiles = [],
        techHtml = require.resolve('./bem-bl/blocks-common/i-bem/bem/techs/html.js'),
        techBemHtml = require.resolve('./bem-bl/blocks-common/i-bem/bem/techs/bemhtml.js');
    */

    //pagesFiles.push(graph.setNode(new BemCreateNode('pages', { block: 'example' }, 'bemdecl.js')));
    //pagesFiles.push(graph.setNode(new BemCreateNode('pages', { block: 'example' }, techHtml, 'html')));
    //pagesFiles.push(graph.setNode(new BemBuildNode(levels, 'pages/example/example.bemdecl.js', 'deps.js', 'deps.js', 'pages/example/example')));
    //pagesFiles.push(graph.setNode(new BemBuildNode(levels, 'pages/example/example.deps.js', techBemHtml, 'bemhtml.js', 'pages/example/example')));
    //graph.setNode({}, 'pages', null, pagesFiles);

    graph.setNode(new PagesLevelNode('pages'));
}

function createPageNodes(graph, pagePath) {
    var techsDep = {
        'bemdecl.js': ['bemjson.js'],
        'deps.js': ['bemdecl.js'],
        'html': ['bemjson.js', 'bemhtml.js'],
        'bemhtml.js': ['deps.js'],
        'css': ['deps.js'],
        'ie.css': ['deps.js'],
        'js': ['deps.js']
    };
}

var Node = INHERIT({

    run: function() {},

    log: function(messages) {
        messages = Array.isArray(messages)? messages : [messages];
        this.messages = (this.messages || []).concat(messages);
    },

    dumpLog: function() {
        console.error((this.messages || []).join('\n'));
    }

});

var FileNode = INHERIT(Node, {

    __constructor: function(path) {
        this.path = path;
    },

    getId: function() {
        return this.path;
    },

    run: function() {
        this.log(UTIL.format("[*] Run '%s'", this.getId()));
        this.dumpLog();
    }

});

var MagicNode = INHERIT(FileNode, {

    getId: function() {
        return this.path + '*';
    }

});

var PagesLevelNode = INHERIT(MagicNode, {

    run: function(ctx) {
        if (ctx.graph.hasNode(this.path)) return;
        this.__base();

        ctx.plan.lock();

        // TODO: scan this.path for pages
        // TODO: generate targets for pages

        // TODO: create real node for pages level
        var parents = ctx.graph.parents[this.getId()],
            node = ctx.graph.setNode(new FileNode(this.path), null, parents);

        // TODO: link pages target with created pages level node
        ctx.graph.setNode(new PageNode(PATH.join(this.path, 'example')), null, node);

        console.log('== PagesLevelNode Graph ==\n', ctx.graph.toString());

        ctx.plan.unlock();
    }

});

var PageNode = INHERIT(MagicNode, {

    run: function(ctx) {
        if (ctx.graph.hasNode(this.path)) return;
        this.__base();

        ctx.plan.lock();

        // TODO: generate targets for page files
        // TODO: create real node for page

        var parents = ctx.graph.parents[this.getId()],
            node = ctx.graph.setNode(new FileNode(this.path), null, parents);

        // TODO: link page files target with created page node

        console.log('PageNode', ctx.graph.toString());

        ctx.plan.unlock();
    }

});

var BlocksLibraryNode = INHERIT(Node, {

    __constructor: function(path, repo, treeish) {
        this.path = path;
        this.repo = repo;
        this.treeish = treeish || 'master';
    },

    getId: function() {
        return this.path;
    },

    run: function() {
        var _this = this,
            up = Q.defer(),
            cmd;

        this.log(UTIL.format("[*] Run '%s'", this.getId()));

        if (PATH.existsSync(this.path)) {
            // git pull origin master
            cmd = UTIL.format('cd %s && git pull origin master', this.path);
        } else {
            // git clone repo path
            cmd = UTIL.format('git clone %s %s', this.repo, this.path);
        }

        this.log(cmd);
        CP.exec(cmd, function(err, stdout, stderr) {
            stdout && _this.log(stdout);
            stderr && _this.log(stderr);

            if (err) return up.reject(err);
            up.resolve();
        });

        return Q.when(up.promise, function() {
            // git checkout treeish
            var co = Q.defer();
                cmd = UTIL.format('cd %s && git checkout %s', _this.path, _this.treeish);

            _this.log(cmd);
            CP.exec(cmd, function(err, stdout, stderr) {
                stdout && _this.log(stdout);
                stderr && _this.log(stderr);

                if (err) return co.reject(err);
                co.resolve();

                _this.dumpLog();
            });
            return co.promise;
        });
    }

});

var BemCreateNode = INHERIT(Node, {

    __constructor: function(levelPath, item, tech, techName) {
        this.item = item;
        this.levelPath = levelPath;
        this.level = createLevel(levelPath);
        this.tech = this.level.getTech(techName, tech);
    },

    getId: function() {
        // TODO: fix getting of relative path to file to more elegant way
        var p = (new Array(this.levelPath.split('/').length)).join('../');
        return this.tech.getPath(PATH.relative(p, this.buildLevelPath()));
    },

    run: function() {
        var p = this.parseItem(this.item);
        p.opts.levelDir = this.levelPath;
        p.opts.forceTech = this.tech.getTechPath();

        this.log(UTIL.format('bem.create.%s(\n %j,\n %j\n)', p.cmd, p.opts, p.args));
        this.dumpLog();

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
    },

    buildLevelPath: function() {
        var i = this.item, getter, args;
        if (i.block) {
            getter = 'block';
            args = [i.block];
            if (i.elem) {
                getter = 'elem';
                args.push(i.elem);
            }
            if (i.mod) {
                getter += '-mod';
                args.push(i.mod);
                if (i.val) {
                    getter += '-val';
                    args.push(i.val);
                }
            }
            return this.level.get(getter, args);
        }
    }

});

var BemBuildNode = INHERIT(Node, {

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
    },

    getId: function() {
        return this.tech.getPath(this.output);
    },

    run: function() {
        var opts = {
            level: this.levelsPaths,
            declaration: this.decl,
            tech: this.techPath,
            outputName: this.output
        };

        this.log(UTIL.format('bem.build(\n %j\n)', opts));
        this.dumpLog();

        return BEM.build(opts);
    }

});
