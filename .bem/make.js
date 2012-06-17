// Link up bem-bl
MAKE.decl('Arch', {

    getLibraries: function() {

        return {
            'bem-bl': {
                type: 'git',
                url: 'git://github.com/bem/bem-bl.git',
                // NOTE: Will be renamed in the nearest future
                treeish: 'feature-new-ometa'
            }
        };

    }

});
