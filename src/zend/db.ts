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

import db_bokep_config from "../db/bokep/config.json";
import db_bokep_page from "../db/bokep/page.json";
import db_bokep_post from "../db/bokep/post.json";
import db_bokep_video_movie from "../db/bokep/video/movie.json";
import db_bokep_video_tv from "../db/bokep/video/tv.json";
import db_bokep_video_anime from "../db/bokep/video/anime.json";
import db_bokep_test from "../db/bokep/test.json";

php.db = class {
	table: any = {}
	__: any = {config: {}}
	constructor (db: string) {
		this.table = php.db.table [db];
		this.extract ();
		}
	extract () {
		for (var i in this.table.config) {
			if ("id" in this.table.config [i]) this.__ ["config"] [this.table.config [i].key] = this.table.config [i].value;
			}
		}
	config (key: string) {
		return this.__ ["config"][key];
		}
	select (table: string) {
		return new php.db.select (this, table);
		}
	}

php.db.select = class {
	db: any;
	table: string;
	data: any = [];
	constructor (db: any, table: string) {
		this.db = db;
		this.table = table;
		}
	filter (filter: any) {
		this.data = php.array (this.db.table [this.table]).filter (filter).data;
		return this;
		}
	first () { return php.array.first (this.data); }
	last () { return php.array.last (this.data); }
	}

php.db.table = {}
php.db.table ["default"] = {config: db_default_config, page: db_default_page, post: db_default_post, test: db_default_test}
php.db.table ["bioskop"] = {config: db_bioskop_config, page: db_bioskop_page, post: db_bioskop_post, test: db_bioskop_test, video: {movie: db_bioskop_video_movie, tv: db_bioskop_video_tv, anime: db_bioskop_video_anime}}
php.db.table ["bokep"] = {config: db_bokep_config, page: db_bokep_page, post: db_bokep_post, test: db_bokep_test, video: {movie: db_bokep_video_movie, tv: db_bokep_video_tv, anime: db_bokep_video_anime}}