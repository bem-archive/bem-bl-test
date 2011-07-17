({
    block: 'b-page',
    title: 'b-link',
    head: [
        { elem: 'css', url: '/pages/example.css' },
        { elem: 'css', url: '/pages/example.ie.css', condition: 'lte IE 7' },
        { elem : 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '/pages/example.js' }
    ],
    content: [
        {
            block: 'b-link',
            mods : { pseudo : 'yes', togcolour : 'yes' },
            url: '#',
            target: '_blank',
            title: 'Кликни меня',
            content : 'Псевдоссылка, меняющая цвет по клику'
        }
    ]
})
