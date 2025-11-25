import php, {express} from "../zend/engine";
var {ln, ln_r, ln_tab, ln_s} = php.constant;
var {zero, one} = php.constant;

php.worker = class {
	app: express;
	config: any = php ["config.json"];
	theme: any = php ["theme.json"];
	host: any = php ["host.json"];
	router: any = php ["router.json"];
	constructor (app: express, context: any) {
		this.app = app;
		if (context) this.start (context);
		}
	start (context: any) {
		for (var i in this.host) if (typeof this.host [i] === "string") this.host [i] = this.host [this.host [i]];
		for (var i in this.host) {
			if (this.host [i].alias) {
				if (this.host [i].alias.length) {
					var host = {
						public: this.host [i].public,
						config: this.host [i].config,
						db: this.host [i].db,
						theme: this.host [i].theme,
						ad: this.host [i].ad,
						affiliate: this.host [i].affiliate,
						}
					for (var x in this.host [i].alias) {
						this.host [[this.host [i].alias [x], i].join (".")] = host;
						}
					}
				}
			}
		var _ = function (worker: any) {
			return function (io: any, next: any) {
				var {request, response} = php.worker.io (io, worker);
				worker.request = request;
				worker.response = response;
				if (context) return context (worker.request, worker.response, next);
				else return next ();
				}
			}
		this.app.use ("*", _ (this));
		}
	use (path: string, context: any) {
		var _ = function (worker: any) {
			return function (io: any, next: any) {
				if (context) return context (worker.request, worker.response, next);
				else return worker.request.router.use ();
				}
			}
		this.app.use (path, _ (this));
		}
	get (path: string, context: any) {
		var _ = function (worker: any) {
			return function (io: any, next: any) {
				if (context) return context (worker.request, worker.response, next);
				else return worker.request.router.get (path) || next ();
				}
			}
		this.app.get (path, _ (this));
		}
	post (path: string, context: any) {
		var _ = function (worker: any) {
			return function (io: any, next: any) {
				if (context) return context (worker.request, worker.response, next);
				else return next ();
				}
			}
		this.app.post (path, _ (this));
		}
	catch (context: any) {
		this.use ("*", context);
		}
	export () {
		return this.app;
		}
	}

php.worker.io = function (io: any, worker: any) {
	var request = php.worker.io.request (io, worker);
	return {request, response: php.worker.io.response (io, worker, request)}
	}

php.worker.io.request = function (io: any, worker: any) {
	var request: any = function () {}
	request.database = io.env.db;
	request.error = [];
	request.header = {}
	for (var header of io.req.raw.headers.entries ()) request.header [header [0]] = header [1];
	request.url = php.parse_url (io.req.raw.url);
	request.url.param = function (key: string) { return io.req.param (key); }
	request.app = {host: request.url.host.name}
	request.base_url = request.url.address;
	request.canonical_url = request.url.canonical;
	request.next = function () { return ! request.visitor ["agent:crawler"]; }
	request.visitor = {agent: request.header ["user-agent"], "agent:phone": false, "agent:crawler": false, country: {code: io.req.raw.cf.country, region: {code: io.req.raw.cf.regionCode, name: io.req.raw.cf.region, city: {name: io.req.raw.cf.city, postal: {code: io.req.raw.cf.postalCode}}}}, latitude: io.req.raw.cf.latitude, longitude: io.req.raw.cf.longitude, internet: {organization: io.req.raw.cf.asOrganization}, timezone: io.req.raw.cf.timezone}
	request.visitor ["agent:phone"] = php.is_agent_phone (request.visitor.agent);
	if (php.is_agent_crawler (request.visitor.agent)) request.visitor ["agent:crawler"] = true;
	return request;
	}

php.worker.io.response = function (io: any, worker: any, request: any) {
	var response: any = function (output: any, code: number = 200) { return io.html (output, code); }
	response.html = function (output: string, code: number = 200) { return io.html (php.render (php.html (output), response.var), code); }
	response.css = function (css: string, code: number = 200) { return io.text (css, code, {"Content-Type": "text/css"}); }
	response.js = function (js: string, code: number = 200) { return io.text (js, code, {"Content-Type": "text/javascript"}); }
	response.xml = function (xml: string, code: number = 200) { return io.text (xml, code, {"Content-Type": "application/xml"}); }
	response.json = io.json;
	response.text = io.text;
	response.get = function (variable: string) { return response.var [variable]; }
	response.var = {}
	// response.component = function (id: string, component: string = "", variable: any = {}, tab: number = 0) { if (component) return response.component.data [id] = request.theme.component (component).render (variable, tab); else return response.component.data [id]; }
	// response.component.data = {}
	response.seo = function (seo: any) { request.library.seo (seo); }
	response.render = function (layout: string, variable: any = {}, tab: number = 0) { return response.html (request.theme.layout (layout).render (php.object.assign (variable, response.var), tab)); }
	request.render = function (markup: string) { return php.render (markup, response.var); }
	request.component = function (component: string, tab: number = 0) { if (component) return request.app.theme.component [component].map (function (value: any) { if (tab) return ("\t").repeat (tab) + value; else return value; }).join ("\n"); else for (var i in request.app.theme.component) response.var ["component " + i] = request.component (i, tab); }
	return response;
	}

php.worker.io.router = class {
	app: any;
	request: any;
	response: any;
	next: any;
	router: any = {use: [], get: {}, post: {}}
	constructor (app: any, request: any, response: any, next: any) {
		this.app = app;
		this.request = request;
		this.response = response;
		this.next = next;
		}
	set (router: any) {
		this.router.use = router.use;
		for (var i in router.get) this.router.get [router.get [i].path] = router.get [i];
		for (var i in router.post) this.router.post [router.post [i].path] = router.post [i];
		}
	use () { return this.router.use (this.app, this.request, this.response, this.next); }
	get (path: string) { if (this.router.get [path]) return this.router.get [path].context (this.app, this.request, this.response, this.next); }
	post (path: string) { if (this.router.post [path]) return this.router.post [path].context (this.app, this.request, this.response, this.next); }
	permalink (router: string, param: any = {}) {
		var permalink = this.request.base_url + this.app.router [router];
		for (var i in param) permalink = permalink.split (":" + i).join (param [i]);
		return permalink;
		}
	}

php.worker.router = class {
	router: any = {use: null, get: [], post: []}
	constructor () {}
	use (context: any) { this.router.use = context; }
	get (path: string, context: any) { this.router.get.push ({path, context}); }
	post (path: string, context: any) { this.router.post.push ({path, context}); }
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

php.worker.start = async function (app: any, request: any, response: any, next: any) {
	if (request.app.host in app.host) {
		if (request.next ()) {
			if (request.app.config = app.host [request.app.host].config)
			if (request.app.db = app.host [request.app.host].db)
			if (request.app.theme = app.host [request.app.host].theme)
			if (request.app.theme.version) {} else request.app.theme.version = php.array.last (php.array (app.theme).filter ({id: request.app.theme.id, group: request.app.theme.group}).data [zero].version);
			if (request.library = new library (app, request, response, next)) return php.promise (async function (resolve: any, reject: any) {
				request.app.public = app.host [request.app.host].public
				request.app.ad = app.host [request.app.host].ad
				request.app.affiliate = app.host [request.app.host].affiliate
				var then: any = function () {
					then.queue.push (true);
					if (then.queue.length > one) resolve ()
					}
				then.queue = [];
				if (true || "db") {
					request.db = new php.db (request.app.db.id)
					}
				if (true || "theme") {
					var theme = php.theme.template [request.app.theme.group][request.app.theme.id][request.app.theme.version]
					request.app.theme.package = theme.package
					request.app.theme.router = theme.app
					request.app.theme.layout = theme.layout
					request.app.theme.component = theme.component
					request.theme = new php.theme (request.app.theme)
					request.component ()
					}
				request.router = new php.worker.io.router (app, request, response, next)
				request.router.set (request.app.theme.router)
				request.library.variable ()
				request.library.seo ()
				resolve ()
				})
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
	app: any
	request: any
	response: any
	next: any
	constructor (app: any, request: any, response: any, next: any) {
		this.app = app
		this.request = request
		this.response = response
		this.next = next
		this.plugin ()
		}
	async variable () {
		this.request.app.site = {
			name: this.request.db.config ("site:name"),
			title: this.request.db.config ("site:title"),
			tagline: this.request.db.config ("site:tagline"),
			author: {
				name: this.request.db.config ("author:name"),
				email: this.request.db.config ("author:email"),
				},
			"domain:name": this.request.db.config ("domain:name"),
			}
		this.request.app.meta = {
			description: this.request.db.config ("meta:description"),
			generator: this.request.db.config ("meta:generator"),
			keyword: this.request.db.config ("meta:keyword"),
			rating: this.request.db.config ("meta:rating"),
			}
		this.response.var ["latest"] = this.app.config.latest
		this.response.var ["base_url"] = this.request.base_url
		this.response.var ["canonical_url"] = this.request.canonical_url
		this.response.var ["author:name"] = this.request.app.site.author.name
		this.response.var ["author:email"] = this.request.app.site.author.email
		this.response.var ["domain:name"] = this.request.app.site ["domain:name"]
		this.response.var ["site:name"] = this.request.app.site.name
		this.response.var ["site:tagline"] = this.request.app.site.tagline
		this.response.var ["title"] = this.request.app.site.title
		this.response.var ["alternate:site-name"] = this.request.app.site.name
		this.response.var ["html:lang"] = "en"
		this.response.var ["html:translate"] = "no"
		this.response.var ["html:css"] = "w3"
		this.response.var ["head:profile"] = "#"
		this.response.var ["http-equiv:x-cross-origin"] = "*"
		this.response.var ["meta:charset"] = "UTF-8"
		this.response.var ["meta:viewport"] = ["width=device-width", "initial-scale=1.0", "maximum-scale=3.0", "user-scalable=1"].join (ln_s)
		this.response.var ["meta:author"] = this.request.app.site.author.name
		this.response.var ["meta:generator"] = this.request.app.meta.generator
		this.response.var ["meta:keyword"] = this.request.app.meta.keyword
		this.response.var ["meta:robot"] = ["index", "follow", "max-snippet:-1", "max-video-preview:-1", "max-image-preview:large"].join (ln_s)
		this.response.var ["meta:description"] = this.request.app.meta.description
		this.response.var ["meta:rating"] = this.request.app.meta.rating
		this.response.var ["meta:google"] = "notranslate"
		this.response.var ["meta:google-bot"] = "notranslate"
		this.response.var ["meta:google-bot-article"] = ["index", "follow"].join (ln_s)
		if (this.response.var ["c:type"] = "index") {
			var router = []
			for (var i in this.app.router) {
				if (i === "$") continue
				else if (typeof this.app.router [i] === "string") {
					router.push (`"${i}": "${this.app.router [i]}"`)
					this.response.var [["router", i].join (" ")] = this.app.router [i]
					}
				else if (i === "page") {
					for (var x in this.app.router [i]) this.response.var [["router page", x].join (" ")] = this.app.router [i][x]
					}
				else if (i === "p") {
					for (var x in this.app.router [i]) this.response.var [["router p", x].join (" ")] = this.app.router [i][x]
					}
				else {}
				}
			this.response.var ["router"] = router.join (ln_s)
			}
		if (this.app.config ["cd:io"]) {
			this.response.var ["cd:base_url"] = this.app.config ["cd:base_url"]
			this.response.var ["theme:base_url"] = [this.app.config ["cd:base_url"], "theme", this.request.app.theme.group, this.request.app.theme.id, this.request.app.theme.version].join ("/")
			}
		else {
			this.response.var ["cd:base_url"] = this.request.base_url
			this.response.var ["theme:base_url"] = [this.request.base_url, "theme", this.request.app.theme.group, this.request.app.theme.id, this.request.app.theme.version].join ("/")
			}
		this.response.var ["public:base_url"] = [this.request.base_url, "static", this.request.app.public].join ("/")
		this.response.var ["public:file"] = [this.response.var ["public:base_url"], "file"].join ("/")
		this.response.var ["public:asset"] = [this.response.var ["public:base_url"], "asset"].join ("/")
		this.response.var ["asset:image"] = [this.response.var ["public:asset"], "image"].join ("/")
		}
	async seo (seo: any) {
		if (seo) {
			var title = seo.title ? [seo.title, this.request.app.site.name].join (" | ") : this.request.app.site.title
			var description = seo.description || this.request.app.meta.description
			this.response.var ["title"] = this.response.var ["twitter:title"] = this.response.var ["og:title"] = title
			this.response.var ["meta:description"] = this.response.var ["twitter:description"] = this.response.var ["og:description"] = description
			this.response.var ["twitter:image"] = ""
			this.response.var ["og:image"] = ""
			this.response.var ["og:type"] = "website"
			}
		else {
			this.response.var ["twitter:card"] = "summary_large_image"
			this.response.var ["twitter:title"] = this.request.app.site.title
			this.response.var ["twitter:description"] = this.request.app.meta.description
			this.response.var ["twitter:image"] = ""
			this.response.var ["og:site-name"] = this.request.app.site.name
			this.response.var ["og:title"] = this.request.app.site.title
			this.response.var ["og:description"] = this.request.app.meta.description
			this.response.var ["og:url"] = this.request.canonical_url
			this.response.var ["og:image"] = ""
			this.response.var ["og:type"] = "website"
			this.response.var ["og:locale"] = "en"
			}
		}
	plugin () {
		if (this.request.app.config ["tmdb:api"]) {
			var tmdb = {
				api: this.request.app.config ["tmdb:api"],
				token: this.request.app.config ["tmdb:api access:token"],
				}
			this.request.tmdb = new php.plugin.tmdb (tmdb, this)
			this.request.video = {src: new php.plugin.video.src ()}
			}
		if (this.request.app.ad) {
			if (this.request.app.ad ["adsterra"]) {
				this.response.var ["ad:adsterra"] = this.request.app.ad ["adsterra"]
				this.response.var ["ad adsterra:adult"] = this.request.app.ad ["adsterra:adult"]
				}
			if (this.request.app.ad ["monetag"]) {}
			}
		}
	}