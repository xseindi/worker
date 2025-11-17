import php from "../zend/engine";

import db_default_config from "../db/default/config.json";
import db_default_page from "../db/default/page.json";
import db_default_post from "../db/default/post.json";
import db_default_test from "../db/default/test.json";

import db_bioskop_config from "../db/bioskop/config.json";
import db_bioskop_page from "../db/bioskop/page.json";
import db_bioskop_post from "../db/bioskop/post.json";
import db_bioskop_video_movie from "../db/bioskop/video/movie.json";
import db_bioskop_video_tv from "../db/bioskop/video/tv.json";
import db_bioskop_video_anime from "../db/bioskop/video/anime.json";
import db_bioskop_test from "../db/bioskop/test.json";

php.db = class {
	table: any = {}
	__: any = {config: {}}
	constructor (db: string) {
		this.table = php.db.table [db];
		// this.extract ();
		}
	extract () {
		for (var i in this.table.config) {
			if ("id" in this.table.config [i]) this.__ ["config"][this.table.config [i].key] = this.table.config [i].value;
			}
		}
	select (table: string) {
		return new php.db.select (this, table);
		}
	}

php.db.select = class {
	db: any;
	table: string;
	constructor (db: any, table: string) {
		this.db = db;
		this.table = table;
		}
	array (where: any) {
		var data: any = [];
		var table = this.db.table [this.table];
		if (where) {
			for (var i in table) {
				for (var x in where) {
					if (table [i][x] === where [x]) data.push (table [i]);
					}
				}
			return data;
			}
		else return table;
		}
	get (key: string) {
		return this.db.__ [this.table][key];
		}
	}

php.db.table = {}
php.db.table ["default"] = {config: db_default_config, page: db_default_page, post: db_default_post, test: db_default_test}
php.db.table ["bioskop"] = {config: db_bioskop_config, page: db_bioskop_page, post: db_bioskop_post, test: db_bioskop_test, video: {movie: db_bioskop_video_movie, tv: db_bioskop_video_tv, anime: db_bioskop_video_anime}}