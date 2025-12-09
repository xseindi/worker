/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

function Define (descriptor, key, value) {
	Object.defineProperty (descriptor, key, {value, writable: true, enumerable: true, configurable: true});
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

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Define (Array.prototype, "clone", function () { return JSON.parse (JSON.stringify (this)); });
Define (Array.prototype, "first", function () { for (var i in this) return this [i]; return undefined; }); Define (Array.prototype, "one", function () { return this.first (); });
Define (Array.prototype, "last", function () { var value; for (var i in this) value = this [i]; return value; });
Define (Array.prototype, "shuffle", function () { var array = this.clone (); var current = array.length, random; while (current !== 0) { random = Math.floor (Math.random () * current); current --; [array [current], array [random]] = [array [random], array [current]]; } return array; });

Define (Array.prototype, "select", function (filter) {
	return this.filter (function (array, index) {
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
	});

Define (String.prototype, "small", function () { return this.toLocaleLowerCase (); });
Define (String.prototype, "big", function () { return this.toUpperCase (); });

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

$.meta = function () {}
$.meta.get = function (meta) {
	for (var i in meta) {
		var element = document.querySelector ("meta[" + i + "='" + meta [i] + "']");
		if (element) return element.content;
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

JSON.token = function () {}
JSON.token.parse = function (token) {
	try {
		if ((token = token.split (".")).length !== 3) throw new Error ("Invalid JWT Structure");
		return JSON.parse (decodeURIComponent (atob (token [1].replace (/-/g, "+").replace (/_/g, "/")).split ("").map (function (c) { return "%" + ("00" + c.charCodeAt (0).toString (16)).slice (-2); }).join ("")));
		}
	catch (e) {
		return {}
		}
	}

function JWT_parse (token) {
	var data = JSON.parse (decodeURIComponent (atob (token.split (".") [1].replace (/-/g, "+").replace (/_/g, "/")).split ("").map (function (c) { return "%" + ("00" + c.charCodeAt (0).toString (16)).slice (-2); }).join("")));
	return {name: data.name, email: data.email, picture: data.picture}
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

var php = function () {}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.app = function () {}
php.app.data = {
	genre: [],
	movie: {trending: [], popular: [], top_rated: [], up_coming: [], country: {}},
	tv: {trending: [], popular: [], top_rated: [], airing_today: [], country: {}},
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

php.router = function (key, value = {}, query = {}) {
	var router, param = [];
	if (typeof key === "string") router = php.router.link [key] || "";
	else for (var i in key) if (php.router.link [i]) router = php.router.link [i][key [i]] || "";
	for (var i in value) router = router.split (":" + i).join (value [i]);
	for (var i in query) param.push (`${i}=${query [i]}`);
	if (param.length) router = router + "?" + param.join ("&");
	return router;
	}

php.router.reload = function () { location.reload (); }
php.router.link = {}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.event = {}
php.on = function (key, value) { if (php.event [key]) php.event [key].push (value); else php.event [key] = [value]; }
php.emit = function (key, ... value) { for (var i in php.event [key]) php.event [key][i] (... value); }

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.ajax = function () {}

php.ajax.get = function (url, data, context) {
	return $.ajax ({
		url,
		... context,
		});
	}

php.ajax.post = function (url, data, context) {
	return $.ajax ({
		url,
		data: JSON.stringify (data),
		type: "POST",
		dataType: "json",
		... context,
		});
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

php.AD__ = function () {}
php.AD__.link = function () {}
php.AD__.link ["adsterra"] = "https://www.effectivegatecpm.com/h83jmjq7?key=5a9ef1496ac083c698ab74f41502102e";
php.AD__.link ["adsterra:adult"] = "https://www.effectivegatecpm.com/yndh9p11?key=4b2e330f757e5a69f7ef0785a939878e";
php.AD__.link ["monetag"] = "";
php.AD__.link.default = php.AD__.link ["adsterra"];
php.AD__.block = function () { return php.AD__.block.forbidden; }
php.AD__.detect = function (url) { if (false) $.ajax ({url: (url || php.AD__.link.default), success: function () {}, error: function () { php.AD__.block.forbidden = true; if (php.AD__.error) php.AD__.error (php.AD__.block.forbidden); }}); }
php.AD__.detect ();

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.device = function () {}
php.device.computer = function () { return php.device.type === "computer"; }
php.device.mobile = function () { return php.device.type_of === "mobile"; }
php.device.tablet = function () { return php.device.type === "tablet"; }
php.device.phone = function () { return php.device.type === "phone"; }
php.html = function () {}
php.body = function () {}
php.body.width = $ ("body").width ();
php.body.css = function (context) {
	var type = "phone";
	var type_of = "mobile";
	var orientation = "portrait";
	var body = $ ("body").innerWidth ();
	if (body > 600) { type = "tablet"; type_of = "mobile"; }
	if (body > 1000) { type = "computer"; type_of = ""; }
	if ($ ("body").width () > $ ("body").height ()) orientation = "landscape";
	if (php.device.type || php.device.orientation) {
		if (php.device.type === type && php.device.orientation === orientation) {}
		else php.body.css.reset (type, orientation);
		}
	else php.body.css.reset (type, type_of, orientation);
	}
php.body.css.reset = function (type, type_of, orientation) {
	$ ("body").removeClass ("computer mobile tablet phone");
	$ ("body").addClass (php.device.type = type).addClass (php.device.orientation = orientation);
	if (type_of) $ ("body").addClass (php.device.type_of = type_of);
	php.emit ("body:css", type, type_of, orientation);
	}

php.sleep = function (context, second = 0) { return setTimeout (context, (second * 1000)); }

php.str_after = function str_after (search, string) { var pos = string.indexOf (search); if (pos !== undefined) return string.substr (pos + search.length); else return ""; }
php.str_before = function str_before (search, string) { return string.split (search) [0]; }

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.image = function () {}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.cookie = function (key, value) {
	var cookie = document.cookie.split (";").map (function (data) { return data.trim ().split ("="); });
	for (var i in cookie) {
		var key = cookie [i][0], value;
		if (key) {
			value = cookie [i][1].trim ();
			php.cookie.data [key.trim ()] = value;
			}
		}
	}

php.cookie.get = function (key) {
	if (key) return php.cookie.data [key];
	else return php.cookie.get ("session");
	}

php.cookie.delete = function (key) {
	php.cookie.set (key)
	}

php.cookie.set = function (key, value = "", expire = 0, domain = null, path = "/") {
	if (typeof key === "string") {
		expire = expire || php.cookie._expire;
		domain = domain || php.cookie._domain;
		document.cookie = `${key}=${value};expires=${expire};domain=${domain};path=/;samesite=lax`;
		php.cookie.data [key] = value;
		}
	else {
		if ("domain" in key) php.cookie._domain = key.domain;
		if ("expire:day" in key) {
			var date_expire = new Date ();
			date_expire.setTime (date_expire.getTime () + (key ["expire:day"] * 24 * 60 * 60 * 1000));
			php.cookie._expire = date_expire.toUTCString ();
			}
		}
	}

php.cookie.start = function () {
	if (php.cookie.get ("session")) {}
	else php.cookie.set ("session", php.randomize ());
	php.emit ("cookie:start");
	}

php.cookie.data = {}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.randomize = function () {
	return ("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace (/[xy]/g, function (c) {
		const r = (Math.random () * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString (16);
		});
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

php.google = function () {}
php.google.auth = function () {}
php.google.auth.client = {credential: "g_auth", id: "863870409218-moufehk4or38mut7c9lgqq91a010tq2l.apps.googleusercontent.com"}

php.google.auth.empty = function () {
	return ! php.google.auth.credential;
	}

php.google.auth.parse = function (token) {
	var data = JSON.token.parse (token);
	return {p_id: data.sub, name: data.name, email: data.email, picture: data.picture}
	}

php.google.auth.prompt = function () {
	google.accounts.id.prompt ();
	php.emit ("google:auth prompt");
	}

php.google.auth.sign = function () {
	if (php.google.auth.credential) php.google.auth.sign.out ();
	else php.google.auth.prompt ();
	}

php.google.auth.sign.in = function (response) {
	var credential = {string: response.credential.toString ()}
	credential.object = php.google.auth.parse (credential.string);
	php.cookie.set (php.google.auth.client.credential, credential.string);
	php.emit ("google:auth sign-in", credential.string, credential.object);
	php.ajax.post ("/g_auth", {g_auth: credential.object}, {
		success: function (response) {
			php.emit ("google:auth sign-in:done", response);
			location.reload ();
			},
		error: function (error) {
			php.emit ("google:auth sign-in:done", {error});
			location.reload ();
			},
		})
	}

php.google.auth.sign.out = function () {
	php.cookie.delete (php.google.auth.client.credential);
	google.accounts.id.disableAutoSelect ();
	location.reload ();
	}

php.google.auth.set = function (key, value) {
	if (key === "client:id") php.google.auth.client.id = value;
	}

php.google.auth.start = function () {
	if (php.google.auth.credential = php.cookie.get (php.google.auth.client.credential)) php.google.auth.profile = php.google.auth.parse (php.google.auth.credential);
	}

php.on ("load", function () {
	google.accounts.id.initialize ({
		client_id: php.google.auth.client.id,
		callback: php.google.auth.sign.in,
		auto_select: false,
		});
	if (php.google.auth.credential) {}
	else if (false) php.google.auth.prompt ();
	else {}
	});

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

php.owl = function () {}
php.owl.carousel = function (element, reference, option) {
	option = option || {}
	var padding = option.padding || 0;
	var setting = {
		onTranslated: option ["on:translate"] || function () {},
		gap: (option.gap || 0),
		loop: (option.loop || false),
		center: (option.center || false),
		nav: (option.nav || false), dots: (option ["nav:dot"] || false),
		autoplay: (option.play === "auto" || option.play || false),
		margin: (option.margin || 10),
		autoWidth: (option.width === "auto" || false),
		stagePadding: (option ["stage:padding"] || 0),
		autoplayTimeout: (option.timeout || 10000),
		autoplayHoverPause: true,
		responsive: option.responsive || php.owl.carousel ["item:default"],
		}
	php.owl.carousel.event.push ({element, reference, setting});
	setTimeout (function () {
		var oc = $ (element).removeClass ("none");
		if (oc) {
			if (reference) oc.width ($ (reference).width () - setting.gap - padding);
			oc.owlCarousel (setting);
			}
		}, 1500);
	}

php.owl.carousel.event = [];

php.owl.carousel.emit = function () {
	for (var i in php.owl.carousel.event) {
		var oc = $ (php.owl.carousel.event [i].element);
		if (oc) {
			oc.css ("display", "none");
			setTimeout (function () {
				oc.css ("display", "flex");
				if (php.owl.carousel.event [i].reference) oc.width ($ (php.owl.carousel.event [i].reference).width ()), console.log ($ (php.owl.carousel.event [i].reference).width ());
				oc.owlCarousel (php.owl.carousel.event [i].setting);
				}, 1000);
			}
		}
	}

php.owl.carousel ["item:default"] = {
	0: {items: 1},
	600: {items: 3},
	1000: {items: 5},
	}

php.owl.carousel ["item:pop"] = {
	0: {items: 2},
	600: {items: 4},
	1000: {items: 6},
	}

php.owl.carousel ["item:best"] = {
	0: {items: 1},
	600: {items: 2},
	1000: {items: 3},
	}

php.owl.carousel ["item:sky"] = {
	0: {items: 1},
	600: {items: 3},
	1000: {items: 4},
	}

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */