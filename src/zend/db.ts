/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

import php from "../zend/engine";

import TABLE from "../zend/db_table";

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

import table_config from "../db/table_config.json";
import table_client from "../db/table_client.json";
import table_theme from "../db/table_theme.json";
import table_image from "../db/table_image.json";

import table_extra_bioskop_movie from "../db/bioskop/movie.json";
import table_extra_bioskop_tv from "../db/bioskop/tv.json";
import table_extra_bioskop_genre from "../db/bioskop/genre.json";

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.db = class {
	adapter: any;
	json: any = {"config": table_config, "client": table_client, "theme": table_theme, "image": table_image}
	extra: any = {bioskop: {movie: table_extra_bioskop_movie, tv: table_extra_bioskop_tv, genre: table_extra_bioskop_genre}}
	cache: any = {}
	constructor (adapter: any) {
		this.adapter = adapter;
		}
	select (table: string) {
		return new php.db.select (this, table);
		}
	update (table: string) {
		return new php.db.update (this, table);
		}
	delete (table: string) {
		return new php.db.delete (this, table);
		}
	value (value: any) {
		if (value === "true") return true;
		else if (value === "false") return false;
		else if (value === "null") return null;
		else if (typeof value === "string") if (value.trim ().startsWith ("[") || value.trim ().startsWith ("{")) return JSON.parse (value); else return value;
		else return value;
		}
	merge (data: any, dummy: any) {
		var id = [];
		var index = 0;
		if (typeof dummy === "string") dummy = this.json [dummy];
		for (var i in data) {
			id.push (data [i].id);
			index = data [i].id;
			}
		for (var i in dummy) {
			if ("id" in dummy [i]) {
				if (dummy [i].id === null) {
					index ++;
					dummy [i].id = index;
					}
				if (id.includes (dummy [i].id)) continue;
				else data.push (dummy [i]);
				}
			}
		return data;
		}
	async query (sql: string, ... data: any) {
		var db = await this.adapter.prepare (sql).bind (... data).run ();
		return new Promise (function (resolve, reject) {
			resolve ({success: db.success, meta: db.meta, data: db.results, array: function () { return php.array (db.results); }});
			});
		}
	async setup (option: any = {}) {
		var log: any = [];
		for (var i in TABLE) {
			var sql = [];
			if (option.drop === true) sql.push (`drop table if exists ${TABLE [i].name};`);
			sql.push (TABLE [i].sql);
			var db: any = await this.query (sql.join (" "));
			log.push ({name: TABLE [i].name, success: db.success, meta: db.meta});
			}
		if (option.data) {
			// await database (this);
			}
		return new Promise (function (resolve, reject) {
			resolve (log);
			});
		}
	async defrag () {
		var db = await this.adapter.prepare ("vacuum").bind ().run ();
		return new Promise (function (resolve, reject) {
			resolve (db);
			});
		}
	}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.db.select = class {
	db: any;
	sql: any = [];
	table: any = {}
	prop: any = {}
	json_data: any;
	j_son: boolean = false;
	constructor (db: any, table: string) {
		this.db = db;
		this.table.key = table;
		this.table.name = php.db.table (table);
		}
	find (filter: any = {}) {
		this.sql.push (`select * from ${this.table.name}`);
		this.prop.where = php.db.sql.where (this.prop.filter = filter);
		return this;
		}
	sort () {}
	limit () {}
	syntax () { return this.sql.join (" "); }
	async query () {
		if (this.prop.where) if (this.prop.where.key) this.sql.push (["where", this.prop.where.key.join (" and ")].join (" ")); else null; else this.prop.where = {value: []}
		if (this.prop.sort) {}
		if (this.prop.limit) {}
		var sql = this.syntax ();
		var db = await this.db.adapter.prepare (sql).bind (... this.prop.where.value).run ();
		var self = this;
		return new Promise (function (resolve, reject) {
			var data = db.results;
			if (self.j_son) data = php.array (self.db.merge (data, self.json_data)).filter (self.prop.filter).data;
			resolve ({
				success: db.success, meta: db.meta, data,
				array: function () { return php.array (data); },
				insert: function (data: any) { return new php.db.insert (self.db, self.table.key).set (data).query (); },
				});
			});
		}
	json (data: any) {
		if (typeof data === "string") data = this.db.json [data];
		else if (data === undefined) data = this.db.json [this.table.key];
		this.json_data = data;
		this.j_son = true;
		return this;
		}
	}

php.db.insert = class {
	db: any;
	sql: any = [];
	table: any = {}
	prop: any = {}
	data: any;
	key: any = [];
	value: any = [];
	tmp: any = [];
	constructor (db: any, table: string) {
		this.db = db;
		this.table.key = table;
		this.table.name = php.db.table (table);
		}
	set (data: any) {
		for (var key in data) {
			this.key.push (key);
			this.value.push (data [key]);
			this.tmp.push ("?");
			}
		return this;
		}
	async query () {
		var sql = `insert into ${this.table.name} (${this.key.join (", ")}) values (${this.tmp.join (", ")});`;
		var db = await this.db.adapter.prepare (sql).bind (... this.value).run ();
		return new Promise (function (resolve, reject) {
			resolve (db);
			});
		}
	}

php.db.update = class {
	db: any;
	sql: any = [];
	table: string;
	prop: any = {}
	constructor (db: any, table: string) {
		this.db = db;
		this.table = table;
		}
	}

php.db.delete = class {
	db: any;
	sql: any = [];
	table: string;
	prop: any = {}
	constructor (db: any, table: string) {
		this.db = db;
		this.table = table;
		}
	}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.db.table = function (table: string) {
	if (TABLE [table]) return TABLE [table].name;
	else return table;
	}

php.db.sql = function () {}

php.db.sql.where = function (data: any = {}) {
	var where = [];
	var key = [];
	var value = [];
	for (var i in data) {
		if (typeof data [i] === "object") {
			if (data [i].equal === false) {
				where.push ({key: `${i} != ?`, value: data [i].value});
				}
			}
		else where.push ({key: `${i} = ?`, value: data [i]});
		}
	if (where.length) {
		for (var i in where) {
			key.push (where [i].key);
			value.push (where [i].value);
			}
		return {key, value}
		}
	else return {value: []}
	}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/*
async function database (db: any) {
	await db.exec (`insert into table_config (key, value) values (?, ?);`, ["cache", "0.0.0"]);
	await db.exec (`insert into table_config (key, value) values (?, ?);`, ["cd:io", "false"]);
	await db.exec (`insert into table_config (key, value) values (?, ?);`, ["cd:base_url", "https://vcredist.github.io"]);
	await db.exec (`insert into table_client (id, host) values (?, ?);`, [1, "127.0.0.1"]);
	await db.exec (`insert into table_client (id, host, theme_id, theme_type, theme_version, json) values (?, ?, ?, ?, ?, ?);`, [2, "bioskop", "default", "video", "1.0.0", JSON.stringify ({
		"site:name": "Bioskop",
		"site:title": "Bioskop &#8212; Movies, TV Shows, Anime in One Place",
		"site:description": "Movie. TV Show.",
		"meta:description": "Watch Online and/or Download Movies, TV Shows, Anime in One Place for free on Bioskop, from Netflix, IMDB, TMDB, KissAsian, LK21, DramaCool",
		"meta:author": "Bioskop",
		"meta:generator": "Vue (3.5.25)",
		"meta:keyword": "movies, tv shows, anime, watch online, download, streaming, reviews, actors, actresses, photos, user ratings, synopsis, trailers, teasers, credits, cast",
		"meta:rating": "general",
		"google-site-verification": "",
		"tmdb:api": "d4b47b5286ba1ff0ddf4ddf78f70d6d8",
		"tmdb:api access:token": "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0N2I1Mjg2YmExZmYwZGRmNGRkZjc4ZjcwZDZkOCIsIm5iZiI6MTc2MzQzOTc5Ny45MSwic3ViIjoiNjkxYmY0YjU5Y2Y0Mzc3NzMzNjA5YzJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fsGVgPtDUktUWh02_mZZyi-cdqlzbdXd5uzc97_Os1U",
		"ad:adsterra": "https://www.effectivegatecpm.com/h83jmjq7?key=5a9ef1496ac083c698ab74f41502102e",
		"ad adsterra:adult": "https://www.effectivegatecpm.com/yndh9p11?key=4b2e330f757e5a69f7ef0785a939878e",
		"ad:monetag": "",
		})]);
	await db.exec (`insert into table_client (id, host, theme_id, theme_type, theme_version, json) values (?, ?, ?, ?, ?, ?);`, [3, "bokep", "default", "video", "1.0.0", JSON.stringify ({
		"site:name": "Bokep",
		"site:title": "Bokep &#8212; Porn Video, Stright, Lesbian, TransGender",
		"site:description": "Porn Video Show.",
		"meta:description": "Watch Online and/or Download Adult, Porn Video, Stright, Lesbian, TransGender, Teen in One Place for free on Bokep, from PornHub, XHAMSTER, XVideos.",
		"meta:author": "Bokep",
		"meta:generator": "Vue (3.5.25)",
		"meta:keyword": "adult, porn, stright, lesbian, transgender, teen, anal, hardcore, asian",
		"meta:rating": "adult",
		"google-site-verification": "",
		"tmdb:api": "d4b47b5286ba1ff0ddf4ddf78f70d6d8",
		"tmdb:api access:token": "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0N2I1Mjg2YmExZmYwZGRmNGRkZjc4ZjcwZDZkOCIsIm5iZiI6MTc2MzQzOTc5Ny45MSwic3ViIjoiNjkxYmY0YjU5Y2Y0Mzc3NzMzNjA5YzJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fsGVgPtDUktUWh02_mZZyi-cdqlzbdXd5uzc97_Os1U",
		"ad:adsterra": "https://www.effectivegatecpm.com/h83jmjq7?key=5a9ef1496ac083c698ab74f41502102e",
		"ad adsterra:adult": "https://www.effectivegatecpm.com/yndh9p11?key=4b2e330f757e5a69f7ef0785a939878e",
		"ad:monetag": "",
		})]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "localhost"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "127.0.0.1"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "192.168.18.13"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "parkly.vcredist.workers.dev"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "bioskop.vcredist.workers.dev"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "bioskop.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "www.bioskop.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "bioskopress.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "www.bioskopress.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [3, "bokep.vcredist.workers.dev"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [3, "bokep.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [3, "www.bokep.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [3, "bioskopress.online"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [3, "www.bioskopress.online"]);
	await db.exec (`insert into table_image (reference, key, value) values (?, ?, ?);`, [2, "logo", image_logo ["play"]]);
	return new Promise (function (resolve, reject) { resolve (true); });
	}

var image_logo = {
	"play": "_7qvt6.png",
	"play:encode": "data:image/png;base64,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",
	}
*/

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */