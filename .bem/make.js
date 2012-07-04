// Link up bem-bl
MAKE.decl('Arch', {

    getLibraries: function() {

        return {
            'bem-bl': {
                type: 'git',
                url: 'git://github.com/bem/bem-bl.git',
                treeish: 'i18n'
            }
        };

    }

});

// Build i18n files
MAKE.decl('BundleNode', {

    getTechs: function() {

        var arr = this.__base();

        // remove js tech
        arr.splice(arr.indexOf('js'), 1);

        // add i18n techs
        return arr.concat(['i18n', 'i18n.js']);

    }

});
