var nspell = require('nspell');
var aff = require('dictionary-en-us/index.aff');
var dic = require('dictionary-en-us/index.dic');
module.exports = nspell({aff: aff, dic: dic});
