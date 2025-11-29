import php, {express} from "../zend/engine";
var {ln, ln_r, ln_tab, ln_s} = php.constant;
var {zero, one} = php.constant;

php.worker = class {
	app: express;
	// config: any = php ["config.json"];
	// theme: any = php ["theme.json"];
	// host: any = php ["host.json"];
	config: any = {}
	router: any = php ["router.json"];
	constructor (app: express, context: any) {
		this.app = app;
		if (context) this.start (context);
		}
	start (context: any) {
		/*
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
		*/
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
				else return worker.request.router.post (path) || next ();
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
	request.error = [];
	request.header = {}
	for (var header of io.req.raw.headers.entries ()) request.header [header [0]] = header [1];
	request.url = php.parse_url (io.req.raw.url);
	request.url.param = function (key: string) { return io.req.param (key); }
	request.url.query = function (key: string) { return io.req.query (key); }
	request.url.queries = function (key: string) { return io.req.queries (key); }
	request.base_url = request.url.address;
	request.canonical_url = request.url.canonical;
	request.visitor = {agent: request.header ["user-agent"], "agent:phone": false, "agent:crawler": false, country: {code: io.req.raw.cf.country, region: {code: io.req.raw.cf.regionCode, name: io.req.raw.cf.region, city: {name: io.req.raw.cf.city, postal: {code: io.req.raw.cf.postalCode}}}}, latitude: io.req.raw.cf.latitude, longitude: io.req.raw.cf.longitude, internet: {organization: io.req.raw.cf.asOrganization}, timezone: io.req.raw.cf.timezone}
	request.visitor ["agent:phone"] = php.is_agent_phone (request.visitor.agent);
	if (php.is_agent_crawler (request.visitor.agent)) request.visitor ["agent:crawler"] = true;
	request.agent = function () {}
	request.agent.crawler = function () { return request.visitor ["agent:crawler"]; }
	request.db = new php.db (io.env.db);
	request.client = {id: null}
	return request;
	}

php.worker.io.response = function (io: any, worker: any, request: any) {
	var response: any = function (output: string, code: number = 200) { return io.html (output, code); }
	response.html = function (output: string, code: number = 200) { return io.html (php.render (php.html (output), response.var), code); }
	response.css = function (css: string, code: number = 200) { return io.text (css, code, {"Content-Type": "text/css"}); }
	response.js = function (js: string, code: number = 200) { return io.text (js, code, {"Content-Type": "text/javascript"}); }
	response.xml = function (xml: string, code: number = 200) { return io.text (xml, code, {"Content-Type": "application/xml"}); }
	response.json = io.json;
	response.text = io.text;
	response.vue = function (slot: string = "<!---->", code: number = 200) {
		var markup = [`<div id="app"></div>`, `<div id="app:container" style="display: none">`, `{{ slot }}`, `</div>`];
		return response.html (php.render (markup, {slot: (ln_tab.repeat (3)) + slot}, 2), code);
		}
	response.var = {}
	return response;
	/*
	response.get = function (variable: string) { return response.var [variable]; }
	response.var = {}
	// response.component = function (id: string, component: string = "", variable: any = {}, tab: number = 0) { if (component) return response.component.data [id] = request.theme.component (component).render (variable, tab); else return response.component.data [id]; }
	// response.component.data = {}
	response.seo = function (seo: any) { request.library.seo (seo); }
	response.render = function (layout: string, variable: any = {}, tab: number = 0) { return response.html (request.theme.layout (layout).render (php.object.assign (variable, response.var), tab)); }
	request.render = function (markup: string) { return php.render (markup, response.var); }
	request.component = function (component: string, tab: number = 0) { if (component) return request.app.theme.component [component].map (function (value: any) { if (tab) return ("\t").repeat (tab) + value; else return value; }).join ("\n"); else for (var i in request.app.theme.component) response.var ["component " + i] = request.component (i, tab); }
	*/
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
	if (request.agent.crawler () === false) {
		if (request.url.query ("setup") === "db") {
			var setup = await request.db.setup ({drop: true, data: true})
			setup.map (function (db: any) { console.log (db.name, db.success) })
			}
		var db: any = {
			config: await request.db.select ("config").find ().exec (),
			client: await request.db.select ("client").find ({host: request.url.host.name}).exec (),
			}
		for (var i in db.config.data) {
			app.config [db.config.data [i].key] = request.db.value (db.config.data [i].value)
			}
		if (db.client.data.length) {
			var client = db.client.data [0]
			request.client.id = client.id
			request.client.reference = client.reference
			request.client.theme = {id: client.theme_id, group: client.theme_group, version: client.theme_version}
			request.client.object = request.db.value (client.json) || {}
			if (client.reference) {
				var reference = await request.db.select ("client").find ({id: client.reference}).exec ()
				if (reference.data.length) if (reference = reference.data [0]) {
					if (request.client.theme.id) {}
					else {
						request.client.theme.id = reference.theme_id
						request.client.theme.group = reference.theme_group
						request.client.theme.version = reference.theme_version
						}
					request.client.object = php.object.assign ((request.db.value (reference.json) || {}), request.client.object)
					}
				}
			return php.promise (async function (resolve: any, reject: any) {
				request.library = new library (app, request, response, next)
				request.library.variable ()
				request.library.seo ()
				resolve ()
				})
			}
		else return php.promise (function (resolve: any, reject: any) {
			request.error.push ({type: "host", status: "error"})
			resolve ()
			})
		}
	else return php.promise (function (resolve: any, reject: any) {
		request.error.push ({type: "agent", status: "forbidden"})
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
		// this.plugin ()
		}
	async variable () {
		this.request.client.site = {
			name: this.request.client.object ["site:name"],
			title: this.request.client.object ["site:title"],
			tagline: this.request.client.object ["site:tagline"],
			meta: {
				author: this.request.client.object ["meta:author"],
				generator: this.request.client.object ["meta:generator"],
				description: this.request.client.object ["meta:description"],
				keyword: this.request.client.object ["meta:keyword"],
				rating: this.request.client.object ["meta:rating"],
				},
			}
		this.response.var ["cache"] = this.app.config.cache
		this.response.var ["base_url"] = this.request.base_url
		this.response.var ["canonical_url"] = this.request.canonical_url
		this.response.var ["site:name"] = this.request.client.site.name, this.response.var ["alternate:site-name"] = this.request.client.site.name
		this.response.var ["site:title"] = this.request.client.site.title
		this.response.var ["site:tagline"] = this.request.client.site.tagline
		this.response.var ["html:lang"] = "en"
		this.response.var ["html:translate"] = "no"
		this.response.var ["html:css"] = "w3"
		this.response.var ["head:profile"] = "#"
		this.response.var ["title"] = this.request.client.site.title
		this.response.var ["http-equiv:x-cross-origin"] = "*"
		this.response.var ["meta:charset"] = "UTF-8"
		this.response.var ["meta:viewport"] = ["width=device-width", "initial-scale=1.0", "maximum-scale=3.0", "user-scalable=1"].join (ln_s)
		this.response.var ["meta:author"] = this.request.client.site.meta.author
		this.response.var ["meta:generator"] = this.request.client.site.meta.generator
		this.response.var ["meta:keyword"] = this.request.client.site.meta.keyword
		this.response.var ["meta:robot"] = ["index", "follow", "max-snippet:-1", "max-video-preview:-1", "max-image-preview:large"].join (ln_s)
		this.response.var ["meta:description"] = this.request.client.site.meta.description
		this.response.var ["meta:rating"] = this.request.client.site.meta.rating
		this.response.var ["meta:google"] = "notranslate"
		this.response.var ["meta:google-bot"] = "notranslate"
		this.response.var ["meta:google-bot-article"] = ["index", "follow"].join (ln_s)
		this.response.var ["twitter:card"] = "summary_large_image"
		this.response.var ["twitter:title"] = this.request.client.site.title
		this.response.var ["twitter:description"] = this.request.client.site.description
		this.response.var ["twitter:image"] = ""
		this.response.var ["og:site-name"] = this.request.client.site.name
		this.response.var ["og:title"] = this.request.client.site.title
		this.response.var ["og:description"] = this.request.client.site.description
		this.response.var ["og:url"] = this.request.canonical_url
		this.response.var ["og:image"] = ""
		this.response.var ["og:type"] = "website"
		this.response.var ["og:locale"] = "en"
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
			this.response.var ["theme:base_url"] = [this.app.config ["cd:base_url"], "theme", this.request.client.theme.group, this.request.client.theme.id, this.request.client.theme.version].join ("/")
			}
		else {
			this.response.var ["cd:base_url"] = this.request.base_url
			this.response.var ["theme:base_url"] = [this.request.base_url, "theme", this.request.client.theme.group, this.request.client.theme.id, this.request.client.theme.version].join ("/")
			}
		/*
		this.response.var ["public:base_url"] = [this.request.base_url, "static", this.request.app.public].join ("/")
		this.response.var ["public:file"] = [this.response.var ["public:base_url"], "file"].join ("/")
		this.response.var ["public:asset"] = [this.response.var ["public:base_url"], "asset"].join ("/")
		this.response.var ["asset:image"] = [this.response.var ["public:asset"], "image"].join ("/")
		*/
		}
	async seo (seo: any) {
		var title = seo.title ? [seo.title, this.request.client.site.name].join (" &#8212; ") : this.response.var ["title"]
		var description = seo.description || this.response.var ["meta:description"]
		if (seo) {
			this.response.var ["title"] = this.response.var ["twitter:title"] = this.response.var ["og:title"] = title
			this.response.var ["meta:description"] = this.response.var ["twitter:description"] = this.response.var ["og:description"] = description
			this.response.var ["twitter:image"] = ""
			this.response.var ["og:image"] = ""
			this.response.var ["og:type"] = "website"
			}
		}
	plugin () {
		if (this.request.client.data ["tmdb:api"]) {
			var tmdb = {
				api: this.request.client.data ["tmdb:api"],
				token: this.request.client.data ["tmdb:api access:token"],
				}
			this.request.tmdb = new php.plugin.tmdb (tmdb, this)
			this.request.video = {src: new php.plugin.video.src ()}
			}
		}
	}

/*
php.worker.__start = async function (app: any, request: any, response: any, next: any) {
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
*/