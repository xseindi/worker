import php from "../zend/engine";

php.parse_url = function (input: string) {
	var url = new URL (input);
	return {
		address: url.origin,
		canonical: url.href,
		host: {name: url.hostname, address: url.host},
		domain: {},
		protocol: url.protocol.substr (0, (url.protocol.length - 1)),
		path: url.pathname,
		q: url.searchParams,
		parse: url,
		}
	}

php.is_agent_phone = function (agent: string) {
	var browser = agent.toLowerCase ();
	if (browser.indexOf ("iphone") !== undefined) return true;
	else if (browser.indexOf ("android") !== undefined) return true;
	else return false;
	}

php.is_agent_crawler = function (agent: string) {
	var pattern = [
		/Googlebot/i,
		/Bingbot/i,
		/Slurp/i,
		/DuckDuckBot/i,
		/Baiduspider/i,
		/YandexBot/i,
		/Facebot/i,
		/Twitterbot/i,
		/WhatsApp/i,
		/rogerbot/i,
		/DotBot/i,
		/SemrushBot/i,
		/Scrapy/i,
		];
	for (var crawler of pattern) {
		if (crawler.test (agent)) {
			return true;
			}
		}
	return false;
	}

php.markup = class {
	data: any = [];
	constructor (... data: any) {
		if (data.length) this.data = [... data];
		}
	push (tab: number, data: any) {
		if (tab) this.data.push (("\t").repeat (tab) + data);
		else this.data.push (data);
		return this;
		}
	render () {
		return this.data.join ("\n");
		}
	}

php.render = function (markup: any, variable: any = {}, tab: number = 0) {
	if (Array.isArray (markup)) {
		if (typeof variable === "number") tab = variable;
		if (tab) markup = markup.map (function (markup) {
			if (markup.startsWith (php.render.tag.open)) return markup;
			else return ("\t").repeat (tab) + markup;
			});
		markup = markup.join ("\n");
		}
	for (var key in variable) {
		var value = variable [key];
		if (Array.isArray (value)) value = value.join ("\n");
		markup = markup.split (php.render.tag (key)).join (value);
		}
	return markup;
	}

php.render.tag = function (id: string) { return [php.render.tag.open, id, php.render.tag.close].join (" "); }
php.render.tag.open = "{{";
php.render.tag.close = "}}";

php.date = function (... date: any) { return new Date (... date as []); }
php.date.month = {name: {1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"}}
php.date.day = {name: {1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday", 7: "Sunday"}}

php.str_after = function str_after (search: string, string: string) { var pos = string.indexOf (search); if (pos !== undefined) return string.substr (pos + search.length); else return ""; }
php.str_before = function str_before (search: string, string: string) { return string.split (search) [0]; }

php.timeout = function (context: any, time: number = php.timeout.dummy) { return setTimeout (context, time); }
php.timeout.clear = function (timeout: any) { return clearTimeout (timeout); }
php.timeout.dummy = 88;

php.error = class {}
php.error.HOST_NOT_FOUND = "Host not Found";
php.error.VISITOR_AGENT = "";
php.error.forbidden = 403;
php.error.found = 404;

php.promise = function (context: any) { return new Promise (function (resolve, reject) { context (function (value: any = true) { resolve (value); }, function (value: any = false) { reject (value); }); }); }

php.object = function () {}
php.object.clone = function (object: any = {}) { return JSON.parse (JSON.stringify (object)); }
php.object.assign = function (object: any, data: any, extra: any = {}) {
	var output: any = {}
	for (var i in (object = php.object.clone (object))) output [i] = object [i];
	for (var i in (data = php.object.clone (data))) output [i] = data [i];
	for (var i in (extra = php.object.clone (extra))) output [i] = extra [i];
	return output;
	}

php.array = function (array: any = []) { return new php.array.io (array); }
php.array.first = function (array: any = []) { for (var i in array) return array [i]; return undefined; }
php.array.last = function (array: any = []) { var value; for (var i in array) value = array [i]; return value; }

php.array.io = class {
	array: any = [];
	data: any;
	constructor (array: any = []) {
		this.array = array;
		}
	one () { return php.array.first (this.data || this.array); }
	filter (filter: any) {
		if (filter) this.data = this.array.filter (function (array: any, index: number) {
			var error = 0;
			for (var i in filter) {
				if (typeof filter [i] === "object") {
					if (filter [i].equal === false) {
						if (filter [i].value !== array [i]) continue;
						else error ++;
						}
					}
				else if (filter [i] === array [i]) continue;
				else error ++;
				}
			if (error) return false;
			else return true;
			});
		else this.data = this.array;
		return this;
		}
	}

//