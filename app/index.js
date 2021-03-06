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
  this.log(yosay('Hello! We\'re going to build a Javascript project'));
};

Generator.prototype.askFor = function () {
  var done = this.async();
  var prompts = [
    {
      type: 'input',
      name: 'appname',
      message: 'What is your project name?',
      default: this.appname
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description'
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: '1.0.0'
    },
    {
      type: 'input',
      name: 'repository',
      message: 'What is the name of your repository?'
    }
  ];

  this.prompt(prompts, function (answers) {
    this.appname = answers.appname;
    this.appnameSlug = _.kebabCase(this.appname);
    this.repository = answers.repository;
    this.projectDescription = answers.description;
    this.version = answers.version;
    done();
  }.bind(this));

};

Generator.prototype.buildTemplates = function () {
  this.template('_package.json', 'package.json');
  this.template('_travis.yml', '.travis.yml');
  this.template('README.md', 'README.md');
  this.template('gulpfile.js', 'gulpfile.js');
  this.copy('gitignore', '.gitignore');
  this.copy('jscsrc', '.jscsrc');
  this.copy('jshintrc', '.jshintrc');
  this.copy('editorconfig', '.editorconfig');
  this.copy('src/scripts/main.js', 'src/scripts/main.js');
  this.copy('src/styles/main.less', 'src/styles/main.less');
  this.template('test/spec/main.js', 'test/spec/main.js');
};

Generator.prototype.buildDeps = function () {
  this.installDependencies({bower: false});
};
