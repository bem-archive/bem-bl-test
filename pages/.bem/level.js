var extend = require('bem/lib/util').extend,
    PATH = require('path'),

    BEM_TECHS = '../../bem-bl/blocks-common/i-bem/bem/techs';

exports.getTechs = function() {

    return {
        'bemjson.js': '',
        'js': 'js-i',
        'bemhtml.js': PATH.join(BEM_TECHS, 'bemhtml.js'),
        'html': PATH.join(BEM_TECHS, 'html.js'),
        'i18n': PATH.join(BEM_TECHS, 'i18n.js'),
        'i18n.js': PATH.join(BEM_TECHS, 'i18n.js.js'),
        'i18n.html': PATH.join(BEM_TECHS, 'i18n.html.js')
    };

};

exports.getConfig = function() {

    return extend({}, this.__base() || {}, {

        bundleBuildLevels: this.resolvePaths([
            '../../bem-bl/blocks-common',
            '../../bem-bl/blocks-desktop',
            '../../blocks'
        ])

    });

};
