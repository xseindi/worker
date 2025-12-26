var fs = require ("fs");
var {readFileSync, writeFileSync} = fs;

var file_config_target = "./src/application/config.json"
var file_wrangler_target = "./wrangler.jsonc"
var file_robot_target = "./public/robots.txt"

var app = {
	"bioskop": {
		type: "bioskop",
		wrangler: {name: "bioskop", main: "bioskop.ts"},
		sitemap: {domain: "bioskopress.com", cache: "2025-12-21"},
		},
	"bokep": {
		type: "bokep",
		wrangler: {name: "bokep", main: "bokep.ts"},
		sitemap: {domain: "bioskopress.online", cache: "2025-12-21"},
		},
	}

function writeWrangler (id) {
	var application;
	if (application = app [id]) {
		var data = {
			"$schema": "node_modules/wrangler/config-schema.json",
			"name": application.wrangler.name,
			"main": "src/app/" + application.wrangler.main,
			"compatibility_date": "2025-11-09",
			"observability": {"enabled": true},
			"assets": {"binding": "asset", "directory": "./public"},
			"d1_databases": [{"binding": "db", "database_name": "database", "database_id": "3af716b8-37f1-4772-854f-075fc4fe28b4"}],
			"vars": {},
			}
		writeFileSync (file_wrangler_target, JSON.stringify (data, null, "\t"));
		console.log (`Writing ${file_wrangler_target} ... [OK]`);
		}
	}

function writeConfig (id, action) {
	var application;
	if (application = app [id]) {
		var gcc = true;
		var ad = false;
		if (action === "deploy") {
			gcc = false;
			ad = true;
			}
		var data = {
			"setup": true,
			"internet": (action === "deploy"),
			"type": application.type,
			"cache": "0.0.000",
			"cache:io": "2025-12-21",
			"cache:generator": gcc,
			"sitemap:cache": application.sitemap.cache,
			"cd:io": false,
			"cd:network": true,
			"cd:base_url": "https://vcredist.github.io",
			"AD__.s": ad,
			"*": "*"
			}
		writeFileSync (file_config_target, JSON.stringify (data, null, "\t"));
		console.log (`Writing ${file_config_target} ... [OK]`);
		}
	}

function writeRobot (id) {
	var application;
	if (application = app [id]) {
		var robot = ["User-agent: *"];
		robot.push ("Disallow: /cgi-bin/");
		robot.push ("Disallow: /cpanel/");
		robot.push ("Allow: /");
		robot.push ("");
		if (application.type == "bioskop") {
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/${application.sitemap.cache}/index.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/${application.sitemap.cache}/movie.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/${application.sitemap.cache}/tv.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/${application.sitemap.cache}/people.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/${application.sitemap.cache}/genre.xml`);
			}
		var data = robot.join ("\n");
		writeFileSync (file_robot_target, data);
		console.log (`Writing ${file_robot_target} ... [OK]`);
		}
	}

var id = process.argv [2]
var action = process.argv [3]

writeWrangler (id);
writeConfig (id, action);
writeRobot (id);