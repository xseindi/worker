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
	response.css = function (css: string, code: number = 200) { return io.text (css, code, {"Content-Type": "text/css"}); }
	response.js = function (js: string, code: number = 200) { return io.text (js, code, {"Content-Type": "text/javascript"}); }
	response.xml = function (xml: string, code: number = 200) { return io.text (xml, code, {"Content-Type": "application/xml"}); }
	response.json = io.json;
	response.text = io.text;
	response.var = {}
	response.component = {}
	response.seo = function (seo: any) { request.library.seo (seo); }
	response.render = function (layout: string, variable: any = {}, tab: number = 0) { return response.html (response.theme.layout (layout).render (variable, tab)); }
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
	use () { for (var i in this.router.use) this.router.use [i] (this.app, this.request, this.response, this.next); }
	get (path: string) { if (this.router.get [path]) return this.router.get [path].context (this.app, this.request, this.response, this.next); }
	post (path: string) { if (this.router.post [path]) return this.router.post [path].context (this.app, this.request, this.response, this.next); }
	}

php.worker.router = class {
	router: any = {use: [], get: [], post: []}
	constructor () {}
	use (context: any) { this.router.use.push (context); }
	get (path: string, context: any) { this.router.get.push ({path, context}); }
	post (path: string, context: any) { this.router.post.push ({path, context}); }
	}