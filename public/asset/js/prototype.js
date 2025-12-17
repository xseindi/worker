/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

function Define (descriptor, key, value) { Object.defineProperty (descriptor, key, {value, writable: true, enumerable: false, configurable: true}); }
function DefineGETTER (descriptor, key, value) { Object.defineProperty (descriptor, key, {get: value, writable: true, enumerable: false, configurable: true}); }

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

Define (Array, "proto", function (key, value) { Define (Array.prototype, key, value); });
Array.proto ("clone", function () { return JSON.parse (JSON.stringify (this)); });
Array.proto ("first", function () { for (var i in this) return this [i]; return undefined; }); Array.proto ("one", function () { return this.first (); });
Array.proto ("last", function () { var value; for (var i in this) value = this [i]; return value; });
Array.proto ("shuffle", function () { var array = this.clone (); var current = array.length, random; while (current !== 0) { random = Math.floor (Math.random () * current); current --; [array [current], array [random]] = [array [random], array [current]]; } return array; });
Array.proto ("limit", function (limit) { return this.clone ().slice (0, limit); });
Array.proto ("json", function () { return JSON.stringify (this); });

Array.proto ("select", function (filter) {
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

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Define (String, "proto", function (key, value) { Define (String.prototype, key, value); });
String.proto ("number", function () { return new Number (this); });
String.proto ("integer", function () { return parseInt (this); });
String.proto ("exist", function (search) { return this.includes (search); });
String.proto ("after", function (search) { var pos = this.indexOf (search); if (pos !== undefined) return this.substr (pos + search.length); else return ""; });
String.proto ("before", function (search) { return string.split (search) [0] || ""; });
String.proto ("small", function () { return this.toLocaleLowerCase (); });
String.proto ("big", function () { return this.toUpperCase (); });
String.proto ("json", function () { return JSON.parse (this); });
String.proto ("__html", function () { return this + ".html"; });
String.proto ("to_email", function () { if (this.exist ("@")) return this; else return [this, URL.document.host.name].join ("@"); });

/**
 * number
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Define (Number, "proto", function (key, value) { Define (Number.prototype, key, value); });
Number.proto ("number", function () { return this; });
Number.proto ("integer", function () { return parseInt (this); });
Number.proto ("string", function () { return this.toString (); });
Number.proto ("shuffle", function (number) { return Math.floor (Math.random () * (number - this + 1)) + this; });

Number.format = function (input, separator = ",") {
	var number = input.toString ().split (""), n = [], x = 0;
	number.reverse ();
	for (var i in number) {
		if (x > 2) if ((x = 0) === 0) n.push (separator);
		x ++
		n.push (number [i]);
		}
	n.reverse ();
	return n.join ("");
	}

/**
 * event
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Event.data = {}
Event.on = function (key, value) { if (Event.data [key]) Event.data [key].push (value); else Event.data [key] = [value]; }
Event.emit = function (key, ... value) { for (var i in Event.data [key]) Event.data [key][i] (... value); }

/**
 * promise
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Promise.io = function (context) {
	return new Promise (function (resolve, reject) {
		context (function (data = true) { resolve (data); }, function (error) { reject (error); });
		});
	}

/**
 * date
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Date.io = class {
	constructor (date) {
		if (date instanceof Date) this.date = date;
		else if (date) this.date = new Date (date);
		else this.date = new Date ();
		}
	string () { return this.format ("Y-M-D"); }
	format (format = "default") {
		var date = {
			"Y": this.year (),
			"M": this.month (), "m": Date.month.name [this.month ()],
			"D": this.day (), "d": Date.month.name [this.week ()], "W": this.week (),
			"H": this.hour (), "h": this.hour ("meredian"),
			"I": this.minute (),
			"S": this.second (),
			"A": this.meredian (),
			}
		format = Date.format [format] || format;
		for (var i in date) format = format.split (i).join (date [i]);
		return format;
		}
	year () { return this.date.getFullYear (); }
	month () { return (this.date.getMonth () + 1).toString ().padStart (2, "0"); }
	day () { return this.date.getDate ().toString ().padStart (2, "0"); }
	week () { return this.date.getDay ().toString ().padStart (2, "0"); }
	hour (meredian) { if (meredian) { var hour = this.date.getHours (); if (this.meredian () === "PM") if (hour === 12) return hour.toString (); else return (hour - 12).toString ().padStart (2, "0"); else return hour.toString ().padStart (2, "0"); } else return this.date.getHours ().toString ().padStart (2, "0"); }
	minute () { return this.date.getMinutes ().toString ().padStart (2, "0"); }
	second () { return this.date.getSeconds ().toString ().padStart (2, "0"); }
	mili () { return this.date.getMilliseconds ().toString ().padStart (3, "0"); }
	meredian () { if (this.date.getHours () > 11) return "PM"; else return "AM"; }
	}

Date.format = function (format, date) { return new Date.io (date).format (format); }
Date.format ["string"] = "Y-M-D";
Date.format ["number"] = "YMD";
Date.format ["default"] = "m D, Y";
Date.format ["full"] = "d, m D, Y - h:I:S A";

Date.month = {
	name: {
		1: "January", "01": "January",
		2: "February", "02": "February",
		3: "March", "03": "March",
		4: "April", "04": "April",
		5: "May", "05": "May",
		6: "June", "06": "June",
		7: "July", "07": "July",
		8: "August", "08": "August",
		9: "September", "09": "September",
		10: "October",
		11: "November",
		12: "December",
		},
	}
Date.day = {
	name: {
		1: "Monday", "01": "Monday",
		2: "Tuesday", "02": "Tuesday",
		3: "Wednesday", "03": "Wednesday",
		4: "Thursday", "04": "Thursday",
		5: "Friday", "05": "Friday",
		6: "Saturday", "06": "Saturday",
		7: "Sunday", "07": "Sunday",
		},
	}

Date.time = function () { return Date.now (); }
Date.time.interval = function (context, second = 1) { return setInterval (context, (second * 1000)); }
Date.time.interval.clear = function (context) { clearInterval (context); }
Date.timeout = function (context, second = 1) { return setTimeout (context, (second * 1000)); }
Date.timeout.clear = function (context) { clearTimeout (context); }

/**
 * url
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

URL.parse = function (input) {
	var url = new URL (input);
	return {
		address: url.origin,
		canonical: url.href,
		host: {name: url.hostname, address: url.host},
		domain: {},
		protocol: url.protocol.substring (0, (url.protocol.length - 1)),
		path: url.pathname,
		query: url.searchParams,
		q: URL.query.parse (url.search),
		// parse: url,
		}
	}

URL.query = function () {}
URL.query.parse = function (query) {
	var parse = {}, q;
	if (query.startsWith ("?")) q = query.substr (1);
	else q = query;
	var split = q.split ("&");
	for (var i in split) {
		if (typeof split [i] === "string") {
			var explode = split [i].split ("=");
			var key = explode [0];
			var value = explode [1];
			if (key && value) parse [key] = value;
			}
		}
	return parse;
	}

URL.reload = function () { location.reload (); }
URL.document = URL.parse (window.location.href.toString ());
URL.document.build = function (query) {
	var path = URL.document.path;
	var q = URL.document.q;
	var param = [];
	for (var i in query) q [i] = query [i];
	for (var i in q) param.push (i + "=" + q [i]);
	return path + "?" + param.join ("&");
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

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.cookie = function (key, value) {
	var cookie = document.cookie.split (";").map (function (data) { return data.trim ().split ("="); });
	for (var i in cookie) {
		var key = cookie [i][0], value;
		if (key) {
			value = cookie [i][1].trim ();
			Function.cookie.data [key.trim ()] = value;
			}
		}
	}

Function.cookie.get = function (key) {
	if (key) return Function.cookie.data [key];
	else return Function.cookie.get (Function.cookie.id);
	}

Function.cookie.delete = function (key) {
	Function.cookie.set (key)
	}

Function.cookie.set = function (key, value = "", expire = 0, domain = null, path = "/") {
	if (typeof key === "string") {
		expire = expire || Function.cookie._expire;
		domain = domain || Function.cookie._domain;
		document.cookie = `${key}=${value};expires=${expire};domain=${domain};path=/;samesite=lax`;
		Function.cookie.data [key] = value;
		}
	else {
		if ("domain" in key) Function.cookie._domain = key.domain;
		if ("expire:day" in key) {
			var expire = new Date ();
			expire.setTime (expire.getTime () + (key ["expire:day"] * 24 * 60 * 60 * 1000));
			Function.cookie._expire = expire.toUTCString ();
			}
		}
	}

Function.cookie.start = function () {
	if (Function.cookie.get (Function.cookie.id)) {}
	else Function.cookie.set (Function.cookie.id, Function.unique.id ());
	Event.emit ("cookie:start");
	}

Function.cookie.id = "session";
Function.cookie.data = {}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.path = function (... path) { return path.join ("/"); }

Function.file = function () {}

Function.dir = function () {}

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

Function.router = function (key, value = {}, query = {}) {
	var router, param = [];
	if (typeof key === "string") router = Function.router.link.data [key] || "";
	else for (var i in key) if (Function.router.link.data [i]) router = Function.router.link.data [i][key [i]] || "";
	for (var i in value) router = router.split (":" + i).join (value [i]);
	for (var i in query) param.push (`${i}=${query [i]}`);
	if (param.length) router = router + "?" + param.join ("&");
	return router;
	}

Function.router.link = function (client, router) {
	if (client) Function.router.client = client;
	return Function.router.link.data = router;
	}

Function.router.files = function (id, file) {
	return Function.router ("files", {id, file});
	}

Function.ajax = function () {}

Function.ajax.get = function (url, context) {
	return $.ajax ({
		url,
		... context,
		});
	}

Function.ajax.post = function (url, data, context) {
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

Function.AD__ = function () {}
Function.AD__.link = function () {}
Function.AD__.link ["adsterra"] = "https://www.effectivegatecpm.com/h83jmjq7?key=5a9ef1496ac083c698ab74f41502102e";
Function.AD__.link ["adsterra:adult"] = "https://www.effectivegatecpm.com/yndh9p11?key=4b2e330f757e5a69f7ef0785a939878e";
Function.AD__.link ["monetag"] = "";
Function.AD__.link.default = Function.AD__.link ["adsterra"];
Function.AD__.block = function () { return Function.AD__.block.forbidden; }
Function.AD__.detect = function (url) { $.ajax ({url: (url || Function.AD__.link.default), success: function () {}, error: function () { Function.AD__.block.forbidden = true; if (Function.AD__.error) Function.AD__.error (Function.AD__.block.forbidden); }}); }

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

Function.owl = function () {}
Function.owl.carousel = function (element, reference, option) {
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
		responsive: option.responsive || Function.owl.carousel ["item:default"],
		}
	var el = $ (element).removeClass ("none");
	if (el) {
		if (reference) el.width ($ (reference).width () - setting.gap - padding);
		el.owlCarousel (setting);
		}
	}

Function.owl.carousel ["item:default"] = {
	0: {items: 1},
	600: {items: 3},
	1000: {items: 5},
	}

Function.owl.carousel ["item:pop"] = {
	0: {items: 2},
	600: {items: 4},
	1000: {items: 6},
	}

Function.owl.carousel ["item:best"] = {
	0: {items: 1},
	600: {items: 2},
	1000: {items: 3},
	}

Function.owl.carousel ["item:sky"] = {
	0: {items: 1},
	600: {items: 3},
	1000: {items: 4},
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

Function.google = function () {}
Function.google.auth = function () {}
Function.google.auth.client = {credential: "g_auth", id: "863870409218-moufehk4or38mut7c9lgqq91a010tq2l.apps.googleusercontent.com"}

Function.google.auth.empty = function () {
	return ! Function.google.auth.credential;
	}

Function.google.auth.parse = function (token) {
	var data = JSON.token.parse (token);
	return {p_id: data.sub, name: data.name, email: data.email, picture: data.picture}
	}

Function.google.auth.prompt = function () {
	if (false) {
		google.accounts.id.prompt ();
		Function.emit ("google:auth prompt");
		}
	}

Function.google.auth.sign = function () {
	if (Function.google.auth.credential) Function.google.auth.sign.out ();
	else Function.google.auth.prompt ();
	}

Function.google.auth.sign.in = function (response) {
	var credential = {string: response.credential.toString ()}
	credential.object = Function.google.auth.parse (credential.string);
	Function.cookie.set (Function.google.auth.client.credential, credential.string);
	Function.emit ("google:auth sign-in", credential.string, credential.object);
	Function.ajax.post ("/g_auth", {g_auth: credential.object}, {
		success: function (response) {
			Function.emit ("google:auth sign-in:done", response);
			location.reload ();
			},
		error: function (error) {
			Function.emit ("google:auth sign-in:done", {error});
			location.reload ();
			},
		})
	}

Function.google.auth.sign.out = function () {
	Function.cookie.delete (Function.google.auth.client.credential);
	google.accounts.id.disableAutoSelect ();
	location.reload ();
	}

Function.google.auth.set = function (key, value) {
	if (key === "client:id") Function.google.auth.client.id = value;
	}

Function.google.auth.start = function () {
	if (Function.google.auth.credential = Function.cookie.get (Function.google.auth.client.credential)) Function.google.auth.profile = Function.google.auth.parse (Function.google.auth.credential);
	}

Function.google.icon = function (icon) { if (Function.google.icon.src [icon]) return "&#x" + Function.google.icon.src [icon] + ";"; else return "XXXXXXXXXXXX"; }
Function.google.icon.src = {
	home: "e88a",
	home_app_logo: "e295",
	home_storage: "f86c",
	home_lot_device: "e283",
	archive: "e149",
	article: "ef42",
	file_video: "eb87",
	folder: "e2c7",
	folder_off: "eb83",
	bookmark: "e866",
	bookmark_star: "f454",
	notification: "e7f4",
	notification_unread: "f4fe",
	notification_audio: "eec1",
	notification_setting: "f367",
	chat: "e0b7",
	chat_unread: "f189",
	chat_error: "f7ac",
	check: "e5ca",
	check_circle: "e86c",
	close: "e5cd",
	cookie: "eaac",
	flash_on: "e3e7",
	mobile_vibrate: "f2cb",
	admin_panel_setting: "ef3d",
	cloud_lock: "f386",
	comedy_mask: "f4d6",
	encrypted: "e593",
	fingerprint: "e90d",
	health_safety: "e1d5",
	security: "e32a",
	lock: "e897",
	lock_clock: "ef57",
	thumb_up: "e8dc", thumb_up_double: "eefc",
	thumb_down: "e8db",
	recpmend: "e9d2",
	keep: "e6aa",
	visibility: "e8f4",
	visibility_off: "e8f5",
	visibility_lock: "f653",
	favorite: "e87d",
	heart_broken: "eac2",
	password: "f042",
	person_shield: "e384",
	shield: "e9e0",
	shield_lock: "f686",
	shield_locked: "f592",
	shield_toggle: "f2ad",
	shield_watch: "f30f",
	verified_user: "e8e8",
	supervisor_account: "e8d3",
	visibility: "e8f4",
	id_card: "e8f4",
	passkey: "f87f",
	globe: "e64c",
	globe_asia: "f799",
	circle: "ef4a",
	dns: "e875",
	eco: "ea35",
	explore: "e87a",
	share_location: "f05f",
	arrow_circle_down: "f181",
	arrow_drop_down: "e5c5",
	search: "e8b6",
	movie: "e02c",
	local_activity: "e53f",
	play_circle: "e1c4",
	slide_show: "e41b",
	tv: "e333",
	tv_guide: "e1dc",
	live_tv: "e639",
	menu: "e5d2",
	more: "e619",
	more_vertical: "e5d4",
	more_horizontal: "e5d3",
	sms: "e625",
	local_fire_department: "ef55",
	image: "e3f4",
	animated_image: "f49a",
	photo: "e410",
	photo_camera: "e412",
	subscription: "e064",
	editor_choice: "f528",
	search_activity: "f3e5",
	timer_play: "f4ba",
	playlist_play: "e05f",
	hotel_class: "e743",
	description: "e873",
	contact: "e0ba",
	link: "e157",
	health_and_safety: "e1d5",
	setting_accessibility: "f05d",
	safety_check: "ebef",
	admin_panel_setting: "ef3d",
	rss_feed: "e0e5",
	star: "e838", star_s: "f31c",
	male: "e58e",
	female: "e590",
	transgender: "e58d",
	setting: "e8b8",
	delete: "e872",
	delete_auto: "ea4c",
	delete_forever: "e92b",
	recycling: "e760",
	arrow_left_alt: "ef7d",
	arrow_right_alt: "e941",
	key: "e73c",
	chart_show: "e6e1",
	trending_up: "e8e5",
	auto_read_play: "f216",
	smart_display: "f06a",
	crown: "ecb3",
	trophy: "e71a",
	review: "f054",
	workspace_premium: "e7af",
	card_star: "f375",
	acute: "e4cb",
	person: "e7fd",
	}

Event.on ("load", function () {
	if (false) {
		google.accounts.id.initialize ({
			client_id: Function.google.auth.client.id,
			callback: Function.google.auth.sign.in,
			auto_select: false,
			});
		if (Function.google.auth.credential) {}
		else if (false) Function.google.auth.prompt ();
		else {}
		}
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

Function.tmdb = class {}

Function.tmdb.api = {
	"trending:today": "https://api.themoviedb.org/3/trending/all/day?language=en",
	"trending:week": "https://api.themoviedb.org/3/trending/all/week?language=en",
	"movie": "https://api.themoviedb.org/3/movie/{id}?language=en",
	"movie trending:today": "https://api.themoviedb.org/3/trending/movie/day?language=en",
	"movie trending:week": "https://api.themoviedb.org/3/trending/movie/week?language=en",
	"movie:discover": "https://api.themoviedb.org/3/discover/movie?language=en",
	"movie:popular": "https://api.themoviedb.org/3/movie/popular?language=en",
	"movie:top_rated": "https://api.themoviedb.org/3/movie/top_rated?language=en",
	"movie:now_playing": "https://api.themoviedb.org/3/movie/now_playing?language=en",
	"movie:up_coming": "https://api.themoviedb.org/3/movie/upcoming?language=en",
	"tv": "https://api.themoviedb.org/3/tv/{id}?language=en",
	"tv trending:today": "https://api.themoviedb.org/3/trending/tv/day?language=en",
	"tv trending:week": "https://api.themoviedb.org/3/trending/tv/week?language=en",
	"tv:discover": "https://api.themoviedb.org/3/discover/tv?language=en",
	"tv:popular": "https://api.themoviedb.org/3/tv/popular?language=en",
	"tv:top_rated": "https://api.themoviedb.org/3/tv/top_rated?language=en",
	"tv:on_air": "https://api.themoviedb.org/3/tv/on_the_air?language=en",
	"tv:airing_today": "https://api.themoviedb.org/3/tv/airing_today?language=en",
	"people trending:today": "https://api.themoviedb.org/3/trending/person/day?language=en",
	"people trending:week": "https://api.themoviedb.org/3/trending/person/week?language=en",
	"image:default": "https://image.tmdb.org/t/p/w500",
	"image:original": "https://image.tmdb.org/t/p/original",
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

Function.image = function () {}

Function.language = function () {}

Function.language.to_country = function (language) {
	return Function.language.to_country [language = language.toLocaleLowerCase ()] || language;
	}

Function.language.to_country ["kn"] = "in";
Function.language.to_country ["hi"] = "in";
Function.language.to_country ["ml"] = "in";
Function.language.to_country ["ta"] = "in";
Function.language.to_country ["te"] = "in";
Function.language.to_country ["tl"] = "ph";
Function.language.to_country ["zh"] = "cn";
Function.language.to_country ["en"] = "us";
Function.language.to_country ["ja"] = "jp";
Function.language.to_country ["da"] = "de";
Function.language.to_country ["cs"] = "cz";
Function.language.to_country ["ko"] = "kr";

Function.email = function () {}

Function.unique = function () {}

Function.unique.id = function () {
	return ("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx").replace (/[xy]/g, function (c) {
		const r = (Math.random () * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString (16);
		});
	}

Function.p = function (current) {
	current = parseInt (current);
	var page = [];
	var stage = 2;
	var left = current - stage;
	var right = current + stage;
	for (var i = left; i <= right; i ++) page.push (i);
	return page;
	}

Function.p.style = function (current, page) {
	if (current === page) return "font-weight: bold; text-decoration: underline;";
	else return "";
	}

Function.p.render = function (page, total) {
	if (page === 0) return total;
	else if (page === - 1) return total - 1;
	else if (page === (total + 1)) return 1;
	else if (page === (total + 2)) return 2;
	else return page;
	}

Function.p.url = function (page, total) {
	var p = 1;
	if (page === 0) p = total;
	else if (page === - 1) p = total - 1;
	else if (page === (total + 1)) p = 1;
	else if (page === (total + 2)) p = 2;
	else p = page;
	return URL.document.build ({page: p});
	}

Function.p.url.back = function (page, total) {
	page = page - 1;
	if (page === 0) page = total;
	if (page === - 1) page = total - 1;
	return URL.document.build ({page});
	}

Function.p.url.next = function (page, total) {
	page = page + 1;
	if (page === (total + 1)) page = 1;
	if (page === (total + 2)) page = 2;
	return URL.document.build ({page});
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

Function.device = function () {}
Function.device.computer = function () { return Function.device.type === "computer"; }
Function.device.mobile = function () { return Function.device.type_of === "mobile"; }
Function.device.tablet = function () { return Function.device.type === "tablet"; }
Function.device.phone = function () { return Function.device.type === "phone"; }
Function.html = function () {}
Function.body = function () {}
Function.body.width = $ ("body").width ();
Function.body.css = function (context) {
	var type = "phone";
	var type_of = "mobile";
	var orientation = "portrait";
	var body = $ ("body").innerWidth ();
	if (body > 600) { type = "tablet"; type_of = "mobile"; }
	if (body > 1000) { type = "computer"; type_of = ""; }
	if ($ ("body").width () > $ ("body").height ()) orientation = "landscape";
	if (Function.device.type || Function.device.orientation) {
		if (Function.device.type === type && Function.device.orientation === orientation) {}
		else Function.body.css.reset (type, type_of, orientation);
		}
	else Function.body.css.reset (type, type_of, orientation);
	}
Function.body.css.reset = function (type, type_of, orientation) {
	$ ("body").removeClass ("computer mobile tablet phone");
	$ ("body").addClass (Function.device.type = type).addClass (Function.device.orientation = orientation);
	if (type_of) $ ("body").addClass (Function.device.type_of = type_of);
	Event.emit ("body:css", type, type_of, orientation);
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

Function.export = {
	object: Object,
	array: Array,
	string: String,
	number: Number,
	function: Function,
	event: Event,
	promise: Promise,
	date: Date, time: Date.time, timeout: Date.timeout,
	url: URL,
	json: JSON,
	cookie: Function.cookie,
	path: Function.path, file: Function.file, dir: Function.dir,
	image: Function.image,
	router: Function.router,
	ajax: Function.ajax,
	owl: Function.owl,
	google: Function.google,
	AD__: Function.AD__,
	device: Function.device, body: Function.body,
	language: Function.language,
	email: Function.email,
	p: Function.p,
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

$.meta = function () {}
$.meta.get = function (meta) {
	for (var i in meta) {
		var element = document.querySelector ("meta[" + i + "='" + meta [i] + "']");
		if (element) return element.content;
		}
	}

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */