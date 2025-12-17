var fs = require ("fs");
var {readFileSync, writeFileSync} = fs;

var config = {
	json: "./src/application/config.json",
	j_son: function (type, type_of) {
		var c_gen = true;
		var ad = false;
		if (type_of === "deploy") {
			c_gen = false;
			ad = true;
			}
		return {
			"setup": true,
			"internet": true,
			"type": type,
			"cache": "0.0.0",
			"cache:io": "2025-12-003",
			"cache:generator": c_gen,
			"cd:io": false,
			"cd:base_url": "https://vcredist.github.io",
			"AD__.s": ad,
			"*": "*"
			}
		},
	wrangler: {
		"bioskop": {name: "bioskop", main: "bioskop", type: "bioskop"},
		"bioskop-asia": {name: "bioskop-asia", main: "bioskop-asia", type: "bioskop"},
		"bokep": {name: "bokep", main: "bokep", type: "bokep"},
		},
	}

function wrangler (name, main) {
	return {
		"$schema": "node_modules/wrangler/config-schema.json",
		"name": name,
		"main": "src/app/" + main + ".ts",
		"compatibility_date": "2025-11-09",
		"observability": {"enabled": true},
		"assets": {"binding": "asset", "directory": "./public"},
		"vars": {},
		"d1_databases": [{"binding": "db", "database_name": "database", "database_id": "3af716b8-37f1-4772-854f-075fc4fe28b4"}]
		}
	}

wrangler.target = "./wrangler.jsonc";

function generate (the, type_of) {
	writeFileSync (wrangler.target, JSON.stringify (wrangler (the.name, the.main)));
	writeFileSync (config.json, JSON.stringify (config.j_son (the.type, type_of)));
	console.log ("OK");
	}

var the = config.wrangler [process.argv [2]]
var type_of = process.argv [3]

if (the) generate (the, type_of)