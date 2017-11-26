/*global require,__dirname,module*/
const webpack = require('webpack'),
      path = require('path'),
      fs = require('fs'),
      config = {
        module: {
          rules: [{test: /\.(aff|dic)$/, use: 'buffer-loader'}]
        },
        output: {
          path: path.resolve("./build"),
          filename: '[name].js',
          libraryTarget: "umd",
          library: "nspell"
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            include: /\.min\.js$/,
            minimize: true
          })
        ]
      },
      MAX_SIZE = 2 ** 21,
      minify = false;

buildAll().then(() => console.log("DONE")).catch(err => console.error(err));

async function buildAll() {
  var langs = fs.readdirSync("./node_modules/dictionaries/dictionaries/");
  !fs.existsSync("./src") && fs.mkdirSync("./src");

  for (let lang of langs) {
    let affStat = fs.statSync(`./node_modules/dictionaries/dictionaries/${lang}/index.aff`),
        dicStat = fs.statSync(`./node_modules/dictionaries/dictionaries/${lang}/index.dic`);
    if (affStat.size > MAX_SIZE || dicStat.size > MAX_SIZE) {
      console.log(`Skipping ${lang}, too big to bundle`);
      continue;
    }

    let target = `nspell.browser.${lang}`;
    console.log(`Building ${target}`);

    // 1. create source
    let fname = `./src/${target}.js`;
    fs.writeFileSync(fname, template(lang));

    // 2. build with webpack
    let entry = {[target]: fname};
    if (minify) entry[target + ".min"] = fname;
    await build({...config, entry});

    fs.unlinkSync(fname);
  }
  fs.rmdirSync("./src");
}


async function build(config) {
  return new Promise((resolve, reject) =>
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) reject(err || stats.compilation.errors);
      else resolve();
    }));
}

function template(lang) {
return `var nspell = require('nspell');
var aff = require('dictionaries/dictionaries/${lang}/index.aff');
var dic = require('dictionaries/dictionaries/${lang}/index.dic');
module.exports = nspell({aff: aff, dic: dic});`;
}
