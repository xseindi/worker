var fs = require ("fs");
var {readFileSync, writeFileSync} = fs;

var file_config_target = "./src/application/config.json"
var file_wrangler_target = "./wrangler.jsonc"
var file_robot_target = "./public/robots.txt"

var app = {
	"test": {
		type: "test",
		wrangler: {name: "test", main: "test.ts", database: {id: "4d4cc20c-4ef8-4313-8310-47dea5a807c6", name: "test"}},
		sitemap: {domain: "test.com", cache: "2025-12-21"},
		},
	"bioskop": {
		type: "bioskop",
		wrangler: {name: "bioskop", main: "bioskop.ts", database: {id: "3af716b8-37f1-4772-854f-075fc4fe28b4", name: "database"}},
		sitemap: {domain: "bioskopress.com", cache: "2025-12-21"},
		},
	"bokep": {
		type: "bokep",
		wrangler: {name: "bokep", main: "bokep.ts", database: {id: "691333b0-1e1f-4c27-a8d5-f6dbb5f7f7c3", name: "bokep"}},
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
			"d1_databases": [{"binding": "db", "database_id": application.wrangler.database.id, "database_name": application.wrangler.database.name}],
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
			"generator": gcc,
			"sitemap:cache": application.sitemap.cache,
			"cd:io": false,
			"cd:network": true,
			"cd:base_url": "https://vcredist.github.io",
			"AD__.s": ad,
			"*": "*",
			}
		if (id === "bioskop") {}
		else {
			delete data ["cache:generator"];
			delete data ["sitemap:cache"];
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
		else {
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/page.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/categories.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/tag.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/genre.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/article.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/article/2026-01.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/people.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/people/2026-01.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/video.xml`);
			robot.push (`Sitemap: https://${application.sitemap.domain}/sitemap/video/2026-01.xml`);
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
// writeRobot (id);