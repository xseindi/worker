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

import db_bioskop_movie from "../db/bioskop/movie.json";
import db_bioskop_tv from "../db/bioskop/tv.json";

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

var TABLE: any = {
	"config": {name: "table_config", sql: `create table if not exists table_config (id integer primary key, key text, value text);`},
	"client": {name: "table_client", sql: `create table if not exists table_client (id integer primary key, reference integer, host text, theme_id text, theme_group text, theme_version text, json text not null default '{}');`},
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

php.db = class {
	adapter: any;
	static: any = {bioskop: {movie: db_bioskop_movie, tv: db_bioskop_tv}}
	constructor (adapter: any) {
		this.adapter = adapter;
		}
	select (table: string) {
		return new php.db.select (this, table);
		}
	value (value: any) {
		if (value === "true") return true;
		else if (value === "false") return false;
		else if (value === "null") return null;
		else if (typeof value === "string") if (value.trim ().startsWith ("[") || value.trim ().startsWith ("{")) return JSON.parse (value); else return value;
		else return value;
		}
	async exec (sql: string, data: any = []) {
		var db = await this.adapter.prepare (sql).bind (... data).run ();
		return new Promise (function (resolve, reject) {
			resolve (db);
			});
		}
	async setup (option: any = {}) {
		var log: any = [];
		for (var i in TABLE) {
			var sql = [];
			if (option.drop === true) sql.push (`drop table if exists ${TABLE [i].name};`);
			sql.push (TABLE [i].sql);
			var db: any = await this.exec (sql.join (" "));
			log.push ({name: TABLE [i].name, success: db.success, meta: db.meta});
			}
		if (option.data) {
			await database (this);
			}
		return new Promise (function (resolve, reject) {
			resolve (log);
			});
		}
	}

php.db.select = class {
	db: any;
	sql: any = [];
	table: string;
	prop: any = {}
	constructor (db: any, table: string) {
		this.db = db;
		this.table = table;
		}
	find (where: any = {}) {
		var table = php.db.table (this.table);
		this.sql.push (`select * from ${table}`);
		this.prop.where = php.db.sql.where (where);
		return this;
		}
		sort () {}
	limit () {}
	syntax () { return this.sql.join (" "); }
	async exec () {
		if (this.prop.where) if (this.prop.where.key) this.sql.push (["where", this.prop.where.key.join (" and ")].join (" "));
		if (this.prop.sort) {}
		if (this.prop.limit) {}
		var sql = this.syntax ();
		var db = await this.db.adapter.prepare (sql).bind (... this.prop.where.value).run ();
		return new Promise (function (resolve, reject) {
			resolve ({success: db.success, meta: db.meta, data: db.results});
			});
		}
	}

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

async function database (db: any) {
	await db.exec (`insert into table_config (key, value) values (?, ?);`, ["cache", "0.0.0"]);
	await db.exec (`insert into table_config (key, value) values (?, ?);`, ["internet", "true"]);
	await db.exec (`insert into table_config (key, value) values (?, ?);`, ["cd:io", "false"]);
	await db.exec (`insert into table_config (key, value) values (?, ?);`, ["cd:base_url", "https://vcredist.github.io"]);
	await db.exec (`insert into table_client (id, host) values (?, ?);`, [1, "127.0.0.1"]);
	await db.exec (`insert into table_client (id, host, theme_id, theme_group, theme_version, json) values (?, ?, ?, ?, ?, ?);`, [2, "bioskop", "default", "video", "1.0.0", JSON.stringify ({
		"site:name": "Bioskop",
		"site:title": "Bioskop &#8212; Movies, TV Shows, Anime in One Place",
		"site:tagline": "Movie. TV Show.",
		"meta:description": "Watch Online and/or Download Movies, TV Shows, Anime in One Place for free on Bioskop, from Netflix, IMDB, TMDB, KissAsian, LK21, DramaCool",
		"meta:author": "Bioskop",
		"meta:generator": "WordPress",
		"meta:keyword": "movies, tv shows, anime, watch online, download, streaming, reviews, actors, actresses, photos, user ratings, synopsis, trailers, teasers, credits, cast",
		"meta:rating": "general",
		"google-site-verification": "",
		"tmdb:api": "d4b47b5286ba1ff0ddf4ddf78f70d6d8",
		"tmdb:api access:token": "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGI0N2I1Mjg2YmExZmYwZGRmNGRkZjc4ZjcwZDZkOCIsIm5iZiI6MTc2MzQzOTc5Ny45MSwic3ViIjoiNjkxYmY0YjU5Y2Y0Mzc3NzMzNjA5YzJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fsGVgPtDUktUWh02_mZZyi-cdqlzbdXd5uzc97_Os1U",
		"ad:adsterra": "https://www.effectivegatecpm.com/h83jmjq7?key=5a9ef1496ac083c698ab74f41502102e",
		"ad adsterra:adult": "https://www.effectivegatecpm.com/yndh9p11?key=4b2e330f757e5a69f7ef0785a939878e",
		"ad:monetag": "",
		})]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "parkly.vcredist.workers.dev"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "bioskop.vcredist.workers.dev"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "bioskopress.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "www.bioskopress.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "bioskop.com"]);
	await db.exec (`insert into table_client (reference, host) values (?, ?);`, [2, "www.bioskop.com"]);
	return new Promise (function (resolve, reject) { resolve (true); });
	}

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */