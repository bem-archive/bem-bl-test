({
    mustDeps: [
        {
            block: 'i-bem',
            elem: 'dom',
            mods: { 'init': 'auto' }
        },
        { block: 'i-bem', elem: 'i18n' }
    ],
    shouldDeps: [
        {
            block: 'b-link',
            mods : { pseudo : 'yes', togcolor : 'yes', color: 'green' }
        },
        {
            block: 'i-tanker',
            elems: ['days', 'directions']
        }
    ]
})
