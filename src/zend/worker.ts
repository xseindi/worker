import php, {express} from "../zend/engine";
var {ln, ln_r, ln_tab, ln_s} = php.constant;
var {zero, one} = php.constant;

php.worker = class {
	app: express;
	config: any = php ["config.json"];
	router: any = php ["router.json"];
	constructor (app: express, context: any) {
		this.app = app;
		if (context) this.start (context);
		}
	start (context: any) {
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
				else return next ();
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
	request.error = [];
	request.header = {}
	request.redirect = {}
	request.io = io.req;
	request.json = async function () {
		try {
			var json = await io.req.json ();
			return new Promise (function (resolve, reject) { resolve (json); });
			}
		catch (e) {
			return new Promise (function (resolve, reject) { resolve ({}); });
			}
		}
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
	request.app = {data: {}}
	request.client = {id: null, site: {}, image: {}}
	return request;
	}

php.worker.io.response = function (io: any, worker: any, request: any) {
	var response: any = function (output: string, code: number = 200) { return io.html (output, code); }
	response.html = function (output: string, code: number = 200) { return io.html (php.render (php.html (output, response.var), response.var), code); }
	response.css = function (css: string, code: number = 200) { return io.text (css, code, {"Content-Type": "text/css"}); }
	response.js = function (js: string, code: number = 200) { return io.text (js, code, {"Content-Type": "text/javascript"}); }
	response.xml = function (xml: string, code: number = 200) { return io.text (xml, code, {"Content-Type": "application/xml"}); }
	response.image = function () {}
	response.json = io.json;
	response.text = io.text;
	response.redirect = io.redirect;
	response.set = function (data: any) { request.library.set (data); }
	response.vue = function (slot: any, code: number = 200) {
		if (typeof slot === "number") if (code = slot) slot = null;
		if (slot) {} else slot = "\t\t\t<!---->";
		var markup = php.vue.html ();
		return response.html (php.render (markup, {slot}, 2), code);
		}
	response.var = {}
	response.app = {data: {}}
	request.render = function (markup: string) { return php.render (markup, response.var); }
	return response;
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
		if (app.config.setup) {
			if (request.url.query ("setup") === "install") {
				await request.db.setup ({drop: true, data: true})
				}
			}
		request.router = function (key: string, value: any = {}) {
			var router = request.base_url + (app.router [key] || key)
			for (var i in value) router = router.split (":" + i).join (value [i])
			return router
			}
		request.db.cache = {
			config: await request.db.select ("config").json ().find ().query (),
			client: await request.db.select ("client").json ().find ().query (),
			theme: await request.db.select ("theme").json ().find ().query (),
			image: await request.db.select ("image").json ().find ().query (),
			plugin: {
				g_auth: await request.db.select ("plugin:google-auth").find ().query (),
				},
			}
		if (app.config.type === "website") {}
		else if (app.config.type === "bioskop") {
			request.db.cache.movie = await request.db.select ("bioskop:movie").json ().find ().query ()
			request.db.cache.tv = await request.db.select ("bioskop:tv").json ().find ().query ()
			request.db.cache.genre = await request.db.select ("bioskop:genre").json ().find ().query ()
			response.app.data.genre = request.db.cache.genre.data.map (function (genre: any) {
				genre.permalink = request.router ("genre", {id: genre.id, genre: genre.slug})
				return genre
				})
			}
		else if (app.config.type === "bokep") {
			request.db.cache.category = await request.db.select ("bokep:category").json ().find ().query ()
			response.app.data.category = request.db.cache.category.data.map (function (category: any) {
				category.permalink = request.router ("category", {id: category.id, category: category.slug})
				return category
				})
			}
		for (var i in request.db.cache.config.data) {
			app.config [request.db.cache.config.data [i].key] = request.db.value (request.db.cache.config.data [i].value)
			}
		var client: any
		if (client = request.db.cache.client.array ().filter ({host: request.url.host.name}).one ()) {
			if (client.redirect) return php.promise (function (resolve: any, reject: any) {
				var split = client.redirect.split (" ")
				var url, code = 302
				if (split.length > 1) { if (code = split [0]) url = split [1] }
				else url = split [0]
				request.redirect.url = url
				request.redirect.code = code
				resolve ()
				})
			php.worker.client (app, request, response, next, client)
			php.worker.image (app, request, response, next)
			return php.promise (async function (resolve: any, reject: any) {
				request.library = new library (app, request, response, next)
				request.library.variable ()
				request.library.set ()
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

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.worker.client = async function (app: any, request: any, response: any, next: any, client: any) {
	request.client.id = client.id
	request.client.reference = client.reference
	request.client.object = request.db.value (client.meta) || {}
	request.client.theme = request.db.cache.theme.array ().filter ({id: client.theme}).one () || {}
	request.client.host = {name: client.host}
	if (client.domain) request.client.host.cookie = "." + client.domain
	else request.client.host.cookie = client.host
	if (client.reference) {
		var reference = request.db.cache.client.array ().filter ({id: client.reference}).one ()
		request.client.object = php.object.assign ((request.db.value (reference.meta) || {}), request.client.object)
		if (("id" in request.client.theme) === false) request.client.theme = request.db.cache.theme.array ().filter ({id: reference.theme}).one () || {}
		}
	if (request.client.theme.reference) {
		var reference = request.db.cache.theme.array ().filter ({id: request.client.theme.reference}).one ()
		request.client.theme.sub = request.client.theme.name
		request.client.theme.name = reference.name
		request.client.theme.slug = reference.slug
		request.client.theme.type = reference.type
		}
	else {
		request.client.theme.version = php.array.last (request.client.theme.version)
		}
	}

php.worker.image = async function (app: any, request: any, response: any, next: any) {
	var image: any = {stock: {}}
	for (var i in request.db.cache.image.data) {
		var dir = "";
		if (request.db.cache.image.data [i].type_of === "brand") dir = "brand/";
		image.stock [request.db.cache.image.data [i].id] = dir + request.db.cache.image.data [i].file;
		if (request.db.cache.image.data [i].slug) image.stock [request.db.cache.image.data [i].slug] = dir + request.db.cache.image.data [i].file;
		}
	response.image.stock = image.stock
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
		this.request.client.site = {
			name: this.request.client.object ["site:name"],
			title: this.request.client.object ["site:title"],
			description: this.request.client.object ["site:description"],
			meta: {
				author: this.request.client.object ["meta:author"],
				generator: this.request.client.object ["meta:generator"],
				description: this.request.client.object ["meta:description"],
				keyword: this.request.client.object ["meta:keyword"],
				rating: this.request.client.object ["meta:rating"],
				},
			image: {
				logo: this.request.client.object.image.logo,
				avatar: this.request.client.object.image.avatar,
				cover: this.request.client.object.image.cover,
				},
			ad: {
				"adsterra": this.request.client.object.ad ["adsterra"],
				"adsterra:adult": this.request.client.object.ad ["adsterra:adult"],
				"adsterra:float": this.request.client.object.ad ["adsterra:float"],
				"monetag": this.request.client.object.ad ["monetag"],
				},
			affiliate: {},
			referral: {
				"vultr": this.request.client.object.referral ["vultr"],
				"vultr:special": this.request.client.object.referral ["vultr:special"],
				},
			}
		this.response.var ["theme:id"] = this.request.client.theme.id
		this.response.var ["theme:slug"] = this.request.client.theme.slug
		this.response.var ["theme:type"] = this.request.client.theme.type
		this.response.var ["theme:version"] = this.request.client.theme.version
		this.response.var ["theme:layout"] = "default"
		this.response.var ["cache"] = this.app.config.cache
		this.response.var ["router"] = "index"
		this.response.var ["base_url"] = this.request.base_url
		this.response.var ["canonical_url"] = this.request.canonical_url
		this.response.var ["site:name"] = this.request.client.site.name, this.response.var ["alternate:site-name"] = this.request.client.site.name
		this.response.var ["site:title"] = this.request.client.site.title
		this.response.var ["site:description"] = this.request.client.site.description
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
		this.response.var ["twitter:image"] = this.request.router ("files", {id: (this.request.client.reference || this.request.client.id), file: this.response.image.stock [this.request.client.site.image.cover]})
		this.response.var ["og:site-name"] = this.request.client.site.name
		this.response.var ["og:title"] = this.request.client.site.title
		this.response.var ["og:description"] = this.request.client.site.description
		this.response.var ["og:url"] = this.request.canonical_url
		this.response.var ["og:image"] = this.request.router ("files", {id: (this.request.client.reference || this.request.client.id), file: this.response.image.stock [this.request.client.site.image.cover]})
		this.response.var ["og:type"] = "website"
		this.response.var ["og:locale"] = "en"
		this.response.var ["ld+json organization:name"] = this.request.client.site.name
		this.response.var ["ld+json organization:url"] = this.request.base_url
		this.response.var ["ld+json organization:logo"] = this.request.router ("image:logo", {logo: this.response.image.stock [this.request.client.site.image.logo]})
		this.response.var ["date:publish"] = new Date ().toUTCString ()
		this.response.var ["article:published_time"] = new Date ().toISOString ()
		this.response.var ["article:modified_time"] = new Date ().toISOString ()
		if (this.response.var ["c:type"] = "index") {
			for (var i in this.app.router) {
				if (i === "$") continue
				else if (typeof this.app.router [i] === "string") {
					this.response.var [["router", i].join (" ")] = this.app.router [i]
					}
				else if (i === "page") {
					for (var x in this.app.router [i]) {
						this.response.var [["router page", x].join (" ")] = this.app.router [i][x]
						}
					}
				else if (i === "p") {
					for (var x in this.app.router [i]) {
						this.response.var [["router p", x].join (" ")] = this.app.router [i][x]
						}
					}
				else {}
				}
			}
		if (this.app.config ["cd:io"]) {
			this.response.var ["cd:base_url"] = this.app.config ["cd:base_url"]
			this.response.var ["theme:base_url"] = [this.app.config ["cd:base_url"], "theme", this.request.client.theme.type, this.request.client.theme.slug, this.request.client.theme.version].join ("/")
			}
		else {
			this.response.var ["cd:base_url"] = this.request.base_url
			this.response.var ["theme:base_url"] = [this.request.base_url, "theme", this.request.client.theme.type, this.request.client.theme.slug, this.request.client.theme.version].join ("/")
			}
		if (this.request.client.object ["manifest:id"]) this.response.var ["manifest.json"] = `/manifest/${this.request.client.object ["manifest:id"]}.json`
		}
	async set (data: any) {
		var title = data.title ? [data.title, this.request.client.site.name].join (" &#8212; ") : this.response.var ["title"]
		var description = data.description || this.response.var ["meta:description"]
		if (data) {
			this.response.var ["title"] = this.response.var ["twitter:title"] = this.response.var ["og:title"] = title
			this.response.var ["meta:description"] = this.response.var ["twitter:description"] = this.response.var ["og:description"] = description
			if (data ["image:cover"]) {
				this.response.var ["twitter:image"] = data ["image:cover"]
				this.response.var ["og:image"] = data ["image:cover"]
				}
			if (data.article) {
				this.response.var ["article"] = true
				this.response.var ["og:type"] = "article"
				}
			if (data.layout) this.response.var ["theme:layout"] = data.layout
			if (data.router) this.response.var ["router"] = data.router
			if (data ["ld+json webpage"]) {
				this.response.var ["ld+json webpage"] = true
				this.response.var ["ld+json webpage:image"] = data ["ld+json webpage"].image || data ["image:cover"] || "#"
				this.response.var ["ld+json webpage:thumbnail"] = data ["ld+json webpage"].image || data ["image:cover"] || "#"
				}
			}
		this.request.client.theme.layout = this.response.var ["theme:layout"]
		this.response.var ["scriptag"] = php.help ["script.js"] (this.app, this.request, this.response).render ()
		}
	plugin () {
		if (this.request.client.object ["tmdb:api"]) {
			var tmdb = {
				api: this.request.client.object ["tmdb:api"],
				token: this.request.client.object ["tmdb:api access:token"],
				}
			this.request.tmdb = new php.plugin.tmdb (tmdb, this)
			this.request.video = {src: new php.plugin.video.src ()}
			}
		}
	}