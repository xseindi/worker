var fs = require ("fs");
var {readFileSync, writeFileSync} = fs;

var theme_id = "default";
var theme_group = "video";
var theme_version = "1.0.0";
var directory = `D:/HT_doc/cloudflare/worker/src/theme/${theme_group}/${theme_id}/${theme_version}`;
var dir_source = `${directory}/source`;
var file_source_layout = `${dir_source}/layout.html`;
var file_source_component = `${dir_source}/component.html`;
var file_layout = `${directory}/layout.json`;
var file_component = `${directory}/component.json`;

function str_after (search, string) { var pos = string.indexOf (search); if (pos !== undefined) return string.substr (pos + search.length); else return ""; }
function str_before (search, string) { return string.split (search) [0]; }

function parse (input, output) {
	var str = readFileSync (input).toString ();
	str = str.split ("\n");
	var template = {}
	for (var i in str) {
		var str_ln = str [i];
		var template_id;
		var template_code = "";
		if (str_ln.startsWith ('<template')) template_id = str_before ('"', str_after ('<template id="', str_ln));
		else if (str_ln === '</template>') template_id = undefined;
		else template_code = str_ln;
		if (template_id) if (template [template_id] === undefined) template [template_id] = [];
		if (template_code) template [template_id].push (template_code);
		}
	writeFileSync (output, JSON.stringify (template, null, "\t"));
	}

//

module.exports = exports = function () {
	// console.log (`${file_source_layout} > ${file_layout}`)
	// console.log (`${file_source_component} > ${file_component}`)
	parse (file_source_layout, file_layout);
	parse (file_source_component, file_component);
	}