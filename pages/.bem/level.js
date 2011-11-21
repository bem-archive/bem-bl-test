var myPath = require('bem/lib/path');

exports.techs = {
    'bemdecl.js' : 'bem/lib/legacy-techs/bemdecl.js',
    'deps.js' : 'bem/lib/legacy-techs/deps.js'
};

for (var alias in exports.techs) {
    var p = exports.techs[alias];
    if (/\.{1,2}\//.test(p)) exports.techs[alias] = myPath.absolute(p, __dirname);
}

exports.defaultTechs = ['deps.js'];

exports.isIgnorablePath = function(path) {
    return (/\.(git|svn)$/.test(path) ||
        /(GNU|MAC)?[Mm]akefile/.test(path));
};
