var Generator,
    path = require('path'),
    util = require('util'),
    yosay = require('yosay'),
    yeoman = require('yeoman-generator'),
    _ = require('lodash');

Generator = module.exports = function Generator () {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('appname', {type: String, required: false});
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = _.camelCase(this.appname);
  this.appnameSlug = _.kebabCase(this.appname);
  this.gulpNotifyOnErrorString = 'Error: <%= error.message %>';
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function () {
  this.log(yosay('Hello motherfucker!'));
};
//
// Generator.prototype.installDependencies = function () {
//   this.npmInstall([
//     'gulp',
//     'gulp-less',
//     'gulp-minify-css',
//     'gulp-uglify',
//     'gulp-plumber',
//     'gulp-notify',
//     'gulp-jscs',
//     'gulp-jshint'
//   ], {saveDev: true});
// };

Generator.prototype.buildTemplates = function () {
  this.template('_package.json', 'package.json');
  this.template('_travis.yml', 'travis.yml');
  this.template('README.md', 'README.md');
  this.template('gulpfile.js', 'gulpfile.js');
  this.copy('gitignore', '.gitignore');
  this.copy('jscsrc', '.jscsrc');
  this.copy('jshintrc', '.jshintrc');
  this.copy('editorconfig', '.editorconfig');

  this.fs.copy(
    this.templatePath('src/scripts/main.js'),
    this.destinationPath('src/scripts/main.js')
  );
  this.fs.copy(
    this.templatePath('src/styles/main.less'),
    this.destinationPath('src/styles/main.less')
  );
  this.fs.copy(
    this.templatePath('test/spec/main.js'),
    this.destinationPath('test/spec/main.js')
  );
};
