import php, {express} from "../zend/engine";

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
		for (var i in this.host) {
			if (this.host [i].alias) {
				if (this.host [i].alias.length) {
					var host = {config: this.host [i].config, theme: this.host [i].theme}
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
				else return next ();
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
	request.var = io.env;
	request.error = [];
	request.header = {}
	request.layout = {}
	request.component = {}
	for (var header of io.req.raw.headers.entries ()) request.header [header [0]] = header [1];
	request.url = php.parse_url (io.req.raw.url);
	request.url.param = function (key: string) { return io.req.param (key); }
	request.app = {host: request.url.host.name}
	request.base_url = request.url.address;
	request.canonical_url = request.url.canonical;
	request.next = function () { return ! request.visitor ["agent:crawler"]; }
	request.visitor = {agent: request.header ["user-agent"], "agent:crawler": false, country: {code: io.req.raw.cf.country, region: {code: io.req.raw.cf.regionCode, name: io.req.raw.cf.region, city: {name: io.req.raw.cf.city, postal: {code: io.req.raw.cf.postalCode}}}}, latitude: io.req.raw.cf.latitude, longitude: io.req.raw.cf.longitude, internet: {organization: io.req.raw.cf.asOrganization}, timezone: io.req.raw.cf.timezone}
	if (php.is_agent_crawler (request.visitor.agent)) request.visitor ["agent:crawler"] = true;
	return request;
	}

php.worker.io.response = function (io: any, worker: any, request: any) {
	var response: any = function (output: any, code: number = 200) { return io.html (output, code); }
	response.html = function (output: string, code: number = 200) { return io.html (php.render (php.html (output), response.var), code); }
	response.text = io.text;
	response.json = io.json;
	response.var = {}
	response.render = function () {}
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
		}
	use () {
		for (var i in this.router.use) this.router.use [i] (this.app, this.request, this.response, this.next);
		}
	get (path: string) {
		if (this.router.get [path]) return this.router.get [path].context (this.app, this.request, this.response, this.next);
		}
	}

php.worker.router = class {
	router: any = {use: [], get: [], post: []}
	constructor () {}
	use (context: any) { this.router.use.push (context); }
	get (path: string, context: any) { this.router.get.push ({path, context}); }
	}

php.worker.start = async function (app: any, request: any, response: any, next: any) {
	if (request.app.host in app.host) {
		if (request.next ()) {
			if (request.app.config = app.host [request.app.host].config)
			if (request.app.theme = app.host [request.app.host].theme)
			if (request.app.theme.version) {} else request.app.theme.version = php.array.last (php.array (app.theme).where ({id: request.app.theme.id, group: request.app.theme.group}).data [0].version);
			if (request.library = new library (app, request, response, next)) return php.promise (async function (resolve: any, reject: any) {
				var then: any = function () {
					then.queue.push (true);
					if (then.queue.length > 1) resolve ();
					}
				then.queue = [];
				var theme = php.theme.template [request.app.theme.group][request.app.theme.id][request.app.theme.version];
				request.app.theme.router = theme.router;
				request.app.theme.layout = theme.layout;
				request.app.theme.component = theme.component;
				request.theme = new php.theme (request.app.theme);
				request.router = new php.worker.io.router (app, request, response, next);
				request.router.set (request.app.theme.router);
				request.library.variable ();
				request.library.seo ();
				resolve ();
				});
			/*
			if (request.library = new library (request, response, next)) return php.promise (function (resolve: any, reject: any) {
				var then: any = function () {
					then.queue.push (true)
					if (then.queue.length > 1) resolve ()
					}
				then.queue = []
				php.timeout (async function () {
					request.config = app.config
					request.db = new php.db (request.app.host)
					request.library.output ()
					request.library.seo ()
					request.theme = new php.theme (request.app.theme, request.output.theme_url)
					await request.theme.fetch ()
					resolve ()
					})
				})
			*/
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
		this.response.var ["c_type"] = "index";
		this.response.var ["base_url"] = this.request.base_url;
		this.response.var ["canonical_url"] = this.request.canonical_url;
		this.response.var ["html:lang"] = "en";
		this.response.var ["html:translate"] = "no";
		this.response.var ["html:css"] = "w3";
		this.response.var ["head:profile"] = "#";
		this.response.var ["http-equiv:x-cross-origin"] = "*";
		this.response.var ["meta:charset"] = "UTF-8";
		this.response.var ["meta:viewport"] = ["width=device-width", "initial-scale=1.0", "maximum-scale=3.0", "user-scalable=1"].join (ln_c);
		this.response.var ["meta:author"] = "";
		this.response.var ["meta:generator"] = "";
		this.response.var ["meta:keyword"] = [].join (ln_c);
		this.response.var ["meta:robot"] = ["index", "follow", "max-snippet:-1", "max-video-preview:-1", "max-image-preview:large"].join (ln_c);
		this.response.var ["meta:description"] = "";
		this.response.var ["meta:rating"] = "general";
		this.response.var ["meta:google"] = "notranslate";
		this.response.var ["meta:google-bot"] = "notranslate";
		this.response.var ["meta:google-bot-article"] = ["index", "follow"].join (ln_c);
		var router = [];
		for (var i in this.app.router) {
			if (i === "$") continue;
			else if (typeof this.app.router [i] === "string") {
				router.push (`"${i}": "${this.app.router [i]}"`);
				this.response.var [["router", i].join (" ")] = this.app.router [i];
				}
			}
		this.response.var ["router"] = router.join (ln_c);
		if (this.app.config ["cd:io"]) {
			this.response.var ["cd:base_url"] = this.app.config ["cd:base_url"];
			this.response.var ["theme:base_url"] = [this.app.config ["cd:base_url"], "theme", this.request.app.theme.group, this.request.app.theme.id, this.request.app.theme.version].join ("/");
			}
		else {
			this.response.var ["cd:base_url"] = this.request.base_url;
			this.response.var ["theme:base_url"] = [this.request.base_url, "theme", this.request.app.theme.group, this.request.app.theme.id, this.request.app.theme.version].join ("/");
			}
		}
	async seo () {
		this.response.var ["twitter:card"] = "summary_image_large";
		this.response.var ["twitter:title"] = "";
		this.response.var ["twitter:description"] = "";
		this.response.var ["twitter:image"] = "";
		this.response.var ["og:site-name"] = "";
		this.response.var ["og:title"] = "";
		this.response.var ["og:description"] = "";
		this.response.var ["og:url"] = this.request.canonical_url;
		this.response.var ["og:image"] = "";
		this.response.var ["og:type"] = "website";
		this.response.var ["og:locale"] = "en";
		}
	}

var ln_c = ", ";