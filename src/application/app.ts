/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

import php, {express} from "../zend/engine"
import "../zend/constant"
import "../zend/lib"
import "../zend/library"
import "../zend/worker"
import "../zend/db"
import "../zend/theme"

import "../plugin/tmdb"
import "../plugin/video-src"

var {ln, ln_r, ln_tab, ln_s} = php.constant
var {zero, one} = php.constant

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

var app = new php.worker (php.express)
app.start (async function (request: any, response: any, next: any) {
	await start (app, request, response, next)
	if (request.error.length) {
		for (var i in request.error) {
			if (request.error [i].type === "host") return response ("Host Not Found")
			}
		}
	request.router.use ()
	return next ()
	})

app.get (app.router ["style.css"], async function (request: any, response: any, next: any) {
	return response.css ("")
	})

app.get (app.router.index)
app.get (app.router.page ["about"])

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.catch (function (request: any, response: any, next: any) {
	return response ("404 Not Found", 404)
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

async function start (app: any, request: any, response: any, next: any) {
	if (request.app.host in app.host) {
		if (request.next ()) {
			if (request.app.config = app.host [request.app.host].config)
			if (request.app.db = app.host [request.app.host].db)
			if (request.app.theme = app.host [request.app.host].theme)
			if (request.app.theme.version) {} else request.app.theme.version = php.array.last (php.array (app.theme).filter ({id: request.app.theme.id, group: request.app.theme.group}).data [zero].version);
			if (request.library = new library (app, request, response, next)) return php.promise (async function (resolve: any, reject: any) {
				var then: any = function () {
					then.queue.push (true);
					if (then.queue.length > one) resolve ();
					}
				then.queue = [];
				if (true || "db") {
					request.db = new php.db (request.app.db.id);
					}
				if (true || "theme") {
					var theme = php.theme.template [request.app.theme.group][request.app.theme.id][request.app.theme.version];
					request.app.theme.router = theme.app;
					request.app.theme.layout = theme.layout;
					request.app.theme.component = theme.component;
					request.theme = new php.theme (request.app.theme);
					}
				request.router = new php.worker.io.router (app, request, response, next);
				request.router.set (request.app.theme.router);
				request.library.variable ();
				request.library.seo ();
				resolve ();
				});
			}
		else return php.promise (function (resolve: any, reject: any) {
			request.error.push ({type: "agent", status: "forbidden"})
			resolve ()
			})
		}
	else return php.promise (function (resolve: any, reject: any) {
		request.error.push ({type: "host", status: "none"})
		resolve ()
		})
	}

var library: any = class {
	app: any;
	request: any;
	response: any;
	next: any;
	constructor (app: any, request: any, response: any, next: any) {
		this.app = app;
		this.request = request;
		this.response = response;
		this.next = next;
		this.plugin ();
		}
	plugin () {
		if (this.request.app.config ["tmdb:api"]) {
			this.request.tmdb = new php.plugin.tmdb (this.request.app.config ["tmdb:api"], this.request);
			this.request.video = {src: new php.plugin.video.src ()}
			}
		}
	async variable () {
		this.request.app.site = {
			name: this.request.db.config ("site:name"),
			title: this.request.db.config ("site:title"),
			}
		this.request.app.meta = {
			description: this.request.db.config ("meta:description"),
			keyword: this.request.db.config ("meta:keyword"),
			rating: this.request.db.config ("meta:rating"),
			}
		this.response.var ["latest"] = this.app.config.latest;
		this.response.var ["c_type"] = "index";
		this.response.var ["base_url"] = this.request.base_url;
		this.response.var ["canonical_url"] = this.request.canonical_url;
		this.response.var ["title"] = this.request.app.site.title;
		this.response.var ["alternate:site-name"] = this.request.app.site.name;
		this.response.var ["html:lang"] = "en";
		this.response.var ["html:translate"] = "no";
		this.response.var ["html:css"] = "w3";
		this.response.var ["head:profile"] = "#";
		this.response.var ["http-equiv:x-cross-origin"] = "*";
		this.response.var ["meta:charset"] = "UTF-8";
		this.response.var ["meta:viewport"] = ["width=device-width", "initial-scale=1.0", "maximum-scale=3.0", "user-scalable=1"].join (ln_s);
		this.response.var ["meta:author"] = this.request.app.site.name;
		this.response.var ["meta:generator"] = "Google";
		this.response.var ["meta:keyword"] = this.request.app.meta.keyword;
		this.response.var ["meta:robot"] = ["index", "follow", "max-snippet:-1", "max-video-preview:-1", "max-image-preview:large"].join (ln_s);
		this.response.var ["meta:description"] = this.request.app.meta.description;
		this.response.var ["meta:rating"] = this.request.app.meta.rating;
		this.response.var ["meta:google"] = "notranslate";
		this.response.var ["meta:google-bot"] = "notranslate";
		this.response.var ["meta:google-bot-article"] = ["index", "follow"].join (ln_s);
		var router = [];
		for (var i in this.app.router) {
			if (i === "$") continue;
			else if (typeof this.app.router [i] === "string") {
				router.push (`"${i}": "${this.app.router [i]}"`);
				this.response.var [["router", i].join (" ")] = this.app.router [i];
				}
			}
		this.response.var ["router"] = router.join (ln_s);
		if (this.app.config ["cd:io"]) {
			this.response.var ["cd:base_url"] = this.app.config ["cd:base_url"];
			this.response.var ["theme:base_url"] = [this.app.config ["cd:base_url"], "theme", this.request.app.theme.group, this.request.app.theme.id, this.request.app.theme.version].join ("/");
			}
		else {
			this.response.var ["cd:base_url"] = this.request.base_url;
			this.response.var ["theme:base_url"] = [this.request.base_url, "theme", this.request.app.theme.group, this.request.app.theme.id, this.request.app.theme.version].join ("/");
			}
		}
	async seo (seo: any) {
		if (seo) {
			var title = seo.title ? [seo.title, this.request.app.site.name].join (" | ") : this.request.app.site.title;
			var description = seo.description || this.request.app.meta.description;
			this.response.var ["title"] = this.response.var ["twitter:title"] = this.response.var ["og:title"] = title;
			this.response.var ["meta:description"] = this.response.var ["twitter:description"] = this.response.var ["og:description"] = description;
			this.response.var ["twitter:image"] = "";
			this.response.var ["og:image"] = "";
			this.response.var ["og:type"] = "website";
			}
		else {
			this.response.var ["twitter:card"] = "summary_image_large";
			this.response.var ["twitter:title"] = this.request.app.site.title;
			this.response.var ["twitter:description"] = this.request.app.meta.description;
			this.response.var ["twitter:image"] = "";
			this.response.var ["og:site-name"] = this.request.app.site.name;
			this.response.var ["og:title"] = this.request.app.site.title;
			this.response.var ["og:description"] = this.request.app.meta.description;
			this.response.var ["og:url"] = this.request.canonical_url;
			this.response.var ["og:image"] = "";
			this.response.var ["og:type"] = "website";
			this.response.var ["og:locale"] = "en";
			}
		}
	async var (param: any = {}) {
		var title = param.title ? [param.title, this.request.app.site.name].join (" | ") : this.request.app.site.title;
		var description = param.description || this.request.app.meta.description;
		this.response.var ["twitter:card"] = "summary_image_large";
		this.response.var ["twitter:title"] = title;
		this.response.var ["twitter:description"] = description;
		this.response.var ["twitter:image"] = "";
		this.response.var ["og:title"] = title;
		this.response.var ["og:description"] = description;
		this.response.var ["og:image"] = "";
		this.response.var ["og:type"] = "website";
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

export default app.export ()

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */