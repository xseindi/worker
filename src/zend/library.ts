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
		query: url.searchParams,
		parse: url,
		}
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

php.html = function (output: string, option: any = {}) {
	var markup = new php.markup (`<!DOCTYPE html>`);
	markup.push (0, `<html lang="{{ html:lang }}" translate="{{ html:translate }}" class="{{ html:css }}" prefix="og: http://ogp.me/ns#">`);
	markup.push (1, `<head profile="{{ head:profile }}">`);
	markup.push (2, `<title>{{ title }}</title>`);
	markup.push (2, `<meta http-equiv="X-UA-Compatible" content="IE=edge">`);
	markup.push (2, `<meta http-equiv="X-Cross-Origin" content="{{ http-equiv:x-cross-origin }}">`);
	markup.push (2, `<meta charset="{{ meta:charset }}">`);
	markup.push (2, `<meta name="viewport" content="{{ meta:viewport }}">`);
	markup.push (2, `<meta name="author" content="{{ meta:author }}">`);
	markup.push (2, `<meta name="generator" content="{{ meta:generator }}">`);
	markup.push (2, `<meta name="keywords" content="{{ meta:keyword }}">`);
	markup.push (2, `<meta name="robots" content="{{ meta:robot }}">`);
	markup.push (2, `<meta name="description" content="{{ meta:description }}">`);
	markup.push (2, `<meta name="rating" content="{{ meta:rating }}">`);
	markup.push (2, `<meta name="google" content="{{ meta:google }}">`);
	markup.push (2, `<meta name="googlebot" content="{{ meta:google-bot }}">`);
	markup.push (2, `<meta name="googlebot-news" content="{{ meta:google-bot-article }}">`);
	if (option ["google"]) markup.push (2, `<meta name="google-site-verification" content="{{ meta:google-site-verification }}">`);
	markup.push (2, `<meta name="twitter:card" content="{{ twitter:card }}">`);
	markup.push (2, `<meta name="twitter:title" content="{{ twitter:title }}">`);
	markup.push (2, `<meta name="twitter:description" content="{{ twitter:description }}">`);
	markup.push (2, `<meta name="twitter:image" content="{{ twitter:image }}">`);
	markup.push (2, `<meta property="og:site_name" content="{{ og:site-name }}">`);
	markup.push (2, `<meta property="og:title" content="{{ og:title }}">`);
	markup.push (2, `<meta property="og:description" content="{{ og:description }}">`);
	markup.push (2, `<meta property="og:url" content="{{ og:url }}">`);
	markup.push (2, `<meta property="og:image" content="{{ og:image }}">`);
	markup.push (2, `<meta property="og:type" content="{{ og:type }}">`);
	markup.push (2, `<meta property="og:locale" content="{{ og:locale }}">`);
	if (option ["article"]) {
		markup.push (2, `<meta property="article:published_time" content="{{ article:published_time }}">`);
		markup.push (2, `<meta property="article:modified_time" content="{{ article:modified_time }}">`);
		}
	markup.push (2, `<link rel="profile" href="https://gmpg.org/xfn/11">`);
	markup.push (2, `<link rel="icon" href="{{ base_url }}{{ router favorite.ico }}">`);
	markup.push (2, `<link rel="canonical" href="{{ canonical_url }}">`);
	markup.push (2, `<link rel="manifest" href="{{ base_url }}{{ router manifest.json }}">`);
	markup.push (2, `<link rel="alternate" href="{{ base_url }}{{ router feed }}" type="application/rss+xml" title="{{ alternate:site-name }} &raquo; Feed">`);
	markup.push (2, `<link rel="alternate" href="{{ base_url }}{{ router feed:atom }}" type="application/atom+xml" title="{{ alternate:site-name }} &raquo; Feed (Atom)">`);
	if (option ["search"]) {
		markup.push (2, `<link rel="search" href="{{ base_url }}{{ router opensearch }}" type="application/opensearchdescription+xml" title="">`);
		markup.push (2, `<link rel="search" href="{{ base_url }}{{ router opensearch:description }}" type="application/opensearchdescription+xml" title="">`);
		}
	markup.push (2, `<link rel="dns-prefetch" href="https://1.bp.blogspot.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://2.bp.blogspot.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://3.bp.blogspot.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://4.bp.blogspot.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://www.google-analytics.com">`);
	markup.push (2, `<link rel="dns-prefetch" href="https://www.googletagmanager.com">`);
	markup.push (2, `<link rel="preconnect" href="https://www.blogger.com" crossorigin="anonymous">`);
	markup.push (2, `<link rel="preconnect" href="https://blogger.googleusercontent.com" crossorigin>`);
	markup.push (2, `<link rel="preconnect" href="https://resources.blogblog.com" crossorigin>`);
	markup.push (2, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`);
	markup.push (2, `<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>`);
	if (true) {
		if (php ["config.json"]["internet"]) {
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap">`);
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Google+Sans+Text:400,500,700,400i,500i,700i|Google+Sans:400,500,700|Google+Sans+Display:400,500,700|Product+Sans:400&lang=en">`);
			markup.push (2, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">`);
			markup.push (2, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">`);
			}
		markup.push (2, `<link rel="stylesheet" href="{{ base_url }}{{ router style.css }}?latest={{ latest }}">`);
		markup.push (2, `<link rel="stylesheet" href="{{ theme:base_url }}{{ router style.css }}?latest={{ latest }}">`);
		markup.push (2, `<link rel="stylesheet" href="{{ theme:base_url }}{{ router style:sheet }}?latest={{ latest }}">`);
		if (php ["config.json"]["internet"]) {
			markup.push (2, `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>`);
			markup.push (2, `<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/lodash@4.17.21/core.min.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/vue@3.5.22/dist/vue.global.prod.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/vue-router@4.5.1/dist/vue-router.global.prod.js"></script>`);
			}
		markup.push (2, `<script src="{{ cd:base_url }}{{ router prototype.js }}?latest={{ latest }}"></script>`);
		markup.push (2, `<script src="{{ theme:base_url }}{{ router script.js }}?latest={{ latest }}"></script>`);
		}
	markup.push (2, `<script type="application/ld+json"></script>`);
	markup.push (2, `<script type="application/ld+json"></script>`);
	markup.push (2, `<script type="text/javascript">var $__ = {"c:type": "{{ c:type }}", "router": {{{ router }}}}</script>`);
	markup.push (2, `<style>img:is([sizes="auto" i], [sizes^="auto," i]) { contain-intrinsic-size: 3000px 1500px }</style>`);
	markup.push (1, `</head>`);
	markup.push (1, `<body>`);
	markup.push (0, output);
	markup.push (2, `<script src="{{ theme:base_url }}{{ router eof.js }}?latest={{ latest }}"></script>`);
	markup.push (1, `</body>`);
	markup.push (0, `</html>`);
	return markup.render ();
	}

php.render = function (markup: any, variable: any = {}, tab: number = 0) {
	if (Array.isArray (markup)) {
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

php.array = function (array: any = []) { return new php.array.io (array); }
php.array.first = function (array: any = []) { for (var i in array) return array [i]; return undefined; }
php.array.last = function (array: any = []) { var value; for (var i in array) value = array [i]; return value; }

php.array.io = class {
	array: any = [];
	data: any = [];
	constructor (array: any = []) {
		this.array = array;
		}
	filter (filter: any) {
		if (filter) this.data = this.array.filter (function (array: any, index: number) {
			var error = 0;
			for (var i in filter) if (filter [i] === array [i]) continue; else error ++;
			if (error) return false;
			else return true;
			});
		else this.data = this.array;
		return this;
		}
	}

//