({
    block: 'b-page',
    title: 'b-link',
    head: [
        { elem: 'css', url: 'example.css' },
        { elem: 'css', url: 'example.ie.css', condition: 'lte IE 7' },
        { elem : 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: 'example.js' }
    ],
    content: [
        {
            block: 'b-link',
            mods : { pseudo : 'yes', togcolor : 'yes', color: 'green' },
            url: '#',
            target: '_blank',
            title: 'Кликни меня',
            content : 'Псевдоссылка, меняющая цвет по клику'
        }
    ]
})
