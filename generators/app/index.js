'use strict';
var yeoman 	= require('yeoman-generator'),
	chalk	= require('chalk'),
	yosay	= require('yosay'),
	path	= require('path'),
	util	= require('util'),
	lodash	= require('lodash'),
	slug	= require('slug'),

	umicmsExtensionGenerator = module.exports = function umicmsExtensionGenerator(args, options, config) {
		yeoman.generators.Base.apply(this, arguments);

		this.on('end', function () {
			// this.installDependencies({ skipInstall: options['skip-install'] });
			console.log("'opla!'", 'opla!');
		});

		this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../../package.json')));
	};

util.inherits(umicmsExtensionGenerator, yeoman.generators.Base);


umicmsExtensionGenerator.prototype.askFor = function askFor() {
	var cb = this.async();


	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [
		{
			name: 'destRootPath',
			message: 'Give the relative path to the root of UMI.CMS',
			default: './'
		},
		{
			name: 'moduleName',
			message: 'What is the name (slug) of the extended UMI.CMS module?',
			default: ''
		},
		{
			name: 'title',
			message: 'What is the title of the new UMI.CMS module extension?',
			default: 'My Module Extension Title'
		},
		{
			name: 'name',
			message: 'What is the name (slug) of the new UMI.CMS module extension?',
			default: 'myExtensionName'
		},
		{
			name: 'moduleDescription',
			message: 'Give me a description on what your module extension is supposed to do',
			default: 'A sample description for UMI.CMS module extension'
		},
		{
			name: 'needAdminStyles',
			message: 'Do you need adminzone XSLT styles to be generated?',
			default: 'y'
		},

		//author and header info
		{
			name: 'authorName',
			message: 'Who is the creator of this module?',
			default: 'Alexey Kovalev'
		},
		{
			name: 'authorEmail',
			message: 'What is your primary e-mail address',
			default: 'me@agkovalev.com'
		},

		{
			name: 'authorURL',
			message: 'What is the site where the author can be reached?',
			default: 'http://agkovalev.com'
		},

		{
			name: 'authorGitHub',
			message: 'What is your gitHub account?',
			default: 'agkovalev'
		},

		{
			name: 'authorCompanyName',
			message: '(optional) What is your company name?',
			default: 'Company Name'
		}
	];

	this.prompt(prompts, function (props) {
		//date helper
		var today = new Date();

		var prefix  = today.getUTCMonth() + 1;
		prefix     += '-' + today.getDate();
		prefix     += '-' + today.getFullYear();

		this.currentDate		= prefix;
		this.destRootPath		= props.destRootPath;
		this.title				= props.title;
		this.moduleName			= props.moduleName;
		this.name				= props.name;
		this.safeModuleName		= slug(this.moduleName, {
			replacement	: '_',
			lower		: true
		});
		this.safeExtensionName	= slug(this.name, {
			replacement	: '_',
			lower		: true
		});
		this.moduleDescription	= props.moduleDescription;
		this.needAdminStyles	= props.needAdminStyles;
		this.authorName			= props.authorName;
		this.authorEmail		= props.authorEmail;
		this.authorURL			= props.authorURL;
		this.authorGitHub		= props.authorGitHub;
		this.authorTwitter		= props.authorTwitter;
		this.authorCompanyName	= props.authorCompanyName;
		cb();
	}.bind(this));
};



umicmsExtensionGenerator.prototype.classesFiles = function classesFiles() {
	var destModulePath = this.destRootPath + 'classes/modules/' + this.safeModuleName + '/ext';

	if(this.safeModuleName !== '' && this.safeExtensionName !== ''){

		// main files
		this.template('ext/_site.php',           	destModulePath + '/site_' + this.safeExtensionName + '.php');
		this.template('ext/_admin.php',           	destModulePath + '/admin_' + this.safeExtensionName + '.php');
		this.template('ext/_common.php',           	destModulePath + '/common_' + this.safeExtensionName + '.php');
		this.template('ext/_event_handlers.php',  	destModulePath + '/__events_' + this.safeExtensionName + '.php');

		this.template('ext/_events.php',        	destModulePath + '/events_' + this.safeExtensionName + '.php');

		this.copy('ext/permissions.php',          	destModulePath + '/permissions.' + this.safeExtensionName + '.php');

		// langs
		this.template('ext/_i18n.ru.php',        	destModulePath + '/i18n.' + this.safeExtensionName + '.ru.php');
		this.template('ext/_i18n.en.php',         	destModulePath + '/i18n.' + this.safeExtensionName + '.en.php');
		this.template('ext/_lang.ru.php',     		destModulePath + '/lang.' + this.safeExtensionName + '.ru.php');
		this.template('ext/_lang.en.php',      		destModulePath + '/lang.' + this.safeExtensionName + '.en.php');
	}
	else{
		console.log('wrong module or extension name!');
	}

};

umicmsExtensionGenerator.prototype.stylesAdminFiles = function stylesAdminFiles() {
	var destStylesPath = this.destRootPath + 'styles/skins/mac/data/modules/' + this.safeModuleName + '/ext';

	if(this.needAdminStyles === 'y' || this.needAdminStyles === 'yes'){
		this.template('styles/ext/_formModify.xsl',       destStylesPath + '/form.modify.' + this.safeExtensionName + '.xsl');
		this.template('styles/ext/_listView.xsl',         destStylesPath + '/list.view.' + this.safeExtensionName + '.xsl');
		this.template('styles/ext/_listModify.xsl',       destStylesPath + '/list.modify.' + this.safeExtensionName + '.xsl');
		this.template('styles/ext/_settingsView.xsl',     destStylesPath + '/settings.view.' + this.safeExtensionName + '.xsl');
		this.template('styles/ext/_settingsModify.xsl',   destStylesPath + '/settings.modify.' + this.safeExtensionName + '.xsl');
	}
};
