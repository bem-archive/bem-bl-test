var n = require('bem').nodes,
    Node = n.Node,
    BundlesLevelNode = n.BundlesLevelNode,
    LibraryNode = n.LibraryNode;

exports.arch = function() {
    var all = this.setNode(new Node('all')),
        build = this.setNode(new Node('build'), all),
        libs = createBlockLibrariesNodes(this, build);
    createBundlesLevelsNodes(this, build, libs);

    console.log('== Graph on build start ==\n', this.toString());
};

function createBlockLibrariesNodes(arch, parent) {
    return [
        arch.setNode(new LibraryNode('bem-bl', 'git://github.com/bem/bem-bl.git'), parent)
    ];
}

function createBundlesLevelsNodes(arch, parent, children) {
    return [
        arch.setNode(new BundlesLevelNode('pages'), parent, children)
    ];
}
