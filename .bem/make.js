// Link up bem-bl
MAKE.decl('Arch', {

    getLibraries: function() {

        return {
            'bem-bl': {
                type: 'git',
                url: 'git://github.com/bem/bem-bl.git',
                treeish: '0.2'
            }
        };

    }

});

// Build i18n files
MAKE.decl('BundleNode', {

    getTechs: function() {
        return this.__base().concat(['i18n', 'i18n.js']);
    }

});
