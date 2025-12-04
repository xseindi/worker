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
php.AD__.detect = function (url) { $.ajax ({url: (url || php.AD__.link.default), success: function () {}, error: function () { php.AD__.block.forbidden = true; if (php.AD__.error) php.AD__.error (php.AD__.block.forbidden); }}) }
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
php.device.phone = function () { return php.device.type === "phone"; }
php.html = function () {}
php.body = function () {}
php.body.css = function (context) {
	var type = "phone";
	var orientation = "portrait";
	var body = $ ("body").innerWidth ();
	if (body > 600) type = "phone";
	if (body > 1000) type = "computer";
	if ($ ("body").width () > $ ("body").height ()) orientation = "landscape";
	$ ("body").removeClass ("computer mobile tablet phone");
	$ ("body").addClass (type).addClass (orientation);
	php.device.type = type;
	php.device.orientation = orientation;
	php.emit ("body:css", type, orientation);
	if (context) context (type, orientation);
	}

php.sleep = function (context, second = 0) { return setTimeout (context, (second * 1000)); }

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
		var key = cookie [i][0].trim (), value;
		if (key) {
			value = cookie [i][1].trim ();
			php.cookie.data [key] = value;
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
		domain = domain || php.cookie._domain;
		document.cookie = `${key}=${value};expires=0;domain=${domain};path=/;samesite=lax`;
		php.cookie.data [key] = value;
		}
	else {
		if ("domain" in key) php.cookie._domain = key.domain;
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
			// location.reload ();
			},
		error: function (error) {
			php.emit ("google:auth sign-in:done", {error});
			//  location.reload ();
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
		color_scheme: "light",
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

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */