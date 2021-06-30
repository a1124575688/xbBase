var fs = require("fs");
var data = fs.readFileSync('.env', 'utf-8');

function getParam (name) {
	var reg = new RegExp(name + " = ([^\\n\\r]*)");
	var r = data.match(reg);
	if (r != null) return unescape(r[1]);
	return null;
}

function setParam (name, value) {
	var reg = new RegExp(name + " = ([^\\n\\r]*)");
	data = data.replace(reg, name + ' = ' + value);
}

var runningServe;
var VUE_APP_SERVION = getParam('VUE_APP_SERVION');
var VUE_APP_ENVIROMENT = getParam('VUE_APP_ENVIROMENT');
var VUE_APP_INDEXDB_VERSION = getParam('VUE_APP_INDEXDB_VERSION');

try {
	let runningType = JSON.parse(process.env.npm_config_argv).original;
	VUE_APP_ENVIROMENT = runningType[1]
	runningServe = runningType.includes('serve');
} catch (ex) {
	let argv = process.argv;

	runningServe = argv.includes('serve');
}

if (!runningServe){
	VUE_APP_SERVION = (VUE_APP_SERVION * 1 + 0.01).toFixed(2);
	VUE_APP_INDEXDB_VERSION = VUE_APP_INDEXDB_VERSION * 1 + 1;
} else {
	VUE_APP_SERVION = (VUE_APP_SERVION * 1).toFixed(2);
}

setParam('VUE_APP_ENVIROMENT', VUE_APP_ENVIROMENT);
setParam('VUE_APP_SERVION', VUE_APP_SERVION);
setParam('VUE_APP_INDEXDB_VERSION', VUE_APP_INDEXDB_VERSION);

fs.writeFileSync('.env', data);

