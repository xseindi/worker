var table: any = {
	"config": {name: "table_config", sql: `create table if not exists (id integer primary key, reference integer, key text, value text, description text);`},
	"client": {name: "table_client", sql: `create table if not exists (id integer primary key, reference integer, host text, theme integer, meta text not null default '{}', description text);`},
	"theme": {name: "table_theme", sql: `create table if not exists (id integer primary key, reference integer, name text, slug text, type text, version text not null default '[]', description text);`},
	"blob": {name: "table_blob", sql: `create table if not exists (id integer primary key, reference integer, key text, value blob, description text);`},
	"image": {name: "table_image", sql: `create table if not exists (id integer primary key, reference integer, name text, type text, type_of text, file text, description text);`},
	// "taxonomy": {name: "table_taxonomy", sql: `create table if not exists table_taxonomy (id integer primary key, reference integer, key text, value text);`},
	// "category": {name: "table_category", sql: `create table if not exists table_category (id integer primary key, reference integer, key text, value text);`},
	// "genre": {name: "table_genre", sql: `create table if not exists table_genre (id integer primary key, reference integer, key text, value text);`},
	// "data:blog": {name: "data_blog", sql: `create table if not exists data_blog (id integer primary key, reference integer, key text, value text);`},
	// "data:bioskop": {name: "data_bioskop", sql: `create table if not exists data_bioskop (id integer primary key, reference integer, key text, value text);`},
	// "data:bokep": {name: "data_bokep", sql: `create table if not exists data_bokep (id integer primary key, reference integer, key text, value text);`},
	}

for (var i in table) if (table [i].sql) table [i].sql = table [i].sql.split ("if not exists").join (`if not exists ${table [i].name}`).split (" integer").join (" integer not null default '0'");

export default table;