import php from "../zend/engine";

php.html = function (output: string, option: any = {}) {
	var markup = new php.markup (`<!DOCTYPE html>`);
	markup.push (0, `<html lang="{{ html:lang }}" translate="{{ html:translate }}" class="{{ html:css }}" prefix="og: http://ogp.me/ns#">`);
	markup.push (1, `<head profile="{{ head:profile }}">`);
	markup.push (2, `<title>{{ title }}</title>`);
	markup.push (2, `<meta http-equiv="X-UA-Compatible" content="IE=edge">`);
	markup.push (2, `<meta http-equiv="X-Cross-Origin" content="{{ http-equiv:x-cross-origin }}">`);
	markup.push (2, `<meta charset="{{ meta:charset }}">`);
	markup.push (2, `<meta name="title" content="{{ title }}">`);
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
	markup.push (2, `<meta property="og:site_description" content="{{ site:description }}">`);
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
	if (option ["open-search"]) {
		markup.push (2, `<link rel="search" href="{{ base_url }}{{ router open-search }}" type="application/opensearchdescription+xml" title="">`);
		markup.push (2, `<link rel="search" href="{{ base_url }}{{ router open-search:description }}" type="application/opensearchdescription+xml" title="">`);
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
			markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,slnt,wdth,wght,GRAD,ROND@6..144,-10..0,25..151,1..1000,0..100,0..100&display=swap">`);
			if (false) markup.push (2, `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Google+Sans+Text:400,500,700,400i,500i,700i|Google+Sans:400,500,700|Google+Sans+Display:400,500,700|Product+Sans:400&lang=en">`);
			markup.push (2, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css">`);
			markup.push (2, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css">`);
			}
		markup.push (2, `<link rel="stylesheet" href="{{ base_url }}{{ router style.css }}?cache={{ cache }}">`);
		markup.push (2, `<link rel="stylesheet" href="{{ theme:base_url }}{{ router style.css }}?cache={{ cache }}">`);
		if (php ["config.json"]["internet"]) {
			markup.push (2, `<script src="https://accounts.google.com/gsi/client" async></script>`);
			markup.push (2, `<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>`);
			markup.push (2, `<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/lodash@4.17.21/core.min.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/vue@3.5.25/dist/vue.global.prod.js"></script>`);
			markup.push (2, `<script src="https://unpkg.com/vue-router@4.6.3/dist/vue-router.global.prod.js"></script>`);
			}
		markup.push (2, `<script src="{{ cd:base_url }}{{ router asset:prototype.js }}?cache={{ cache }}"></script>`);
		markup.push (2, `<script src="{{ cd:base_url }}{{ router asset:vue.js }}?cache={{ cache }}"></script>`);
		markup.push (2, `<script src="{{ theme:base_url }}{{ router vue:layout }}?cache={{ cache }}"></script>`);
		markup.push (2, `<script src="{{ theme:base_url }}{{ router vue:component }}?cache={{ cache }}"></script>`);
		markup.push (2, `<script src="{{ theme:base_url }}{{ router vue:element }}?cache={{ cache }}"></script>`);
		markup.push (2, `<script src="{{ base_url }}{{ router script.js }}?cache={{ cache }}"></script>`);
		}
	markup.push (2, `<script type="application/ld+json"></script>`);
	markup.push (2, `<script type="application/ld+json"></script>`);
	markup.push (2, `<script>php.app.theme.layout = "{{ theme:layout }}";</script>`);
	markup.push (2, `<script>php.app.router = "{{ router }}";</script>`);
	markup.push (2, `<script>window.onload = function () { php.emit ("load"); }</script>`);
	markup.push (2, `<style>img:is([sizes="auto" i], [sizes^="auto," i]) { contain-intrinsic-size: 3000px 1500px }</style>`);
	markup.push (2, `<style>[hidden] { opacity: 0; }</style>`);
	markup.push (1, `</head>`);
	markup.push (1, `<body>`);
	markup.push (0, output);
	markup.push (2, `<script src="{{ theme:base_url }}{{ router script.js }}?cache={{ cache }}"></script>`);
	markup.push (2, `<script src="{{ theme:base_url }}{{ router vue.js }}?cache={{ cache }}"></script>`);
	markup.push (1, `</body>`);
	markup.push (0, `</html>`);
	return markup.render ();
	}

php.vue = function () {}
php.vue.html = function () {
	var markup = new php.markup ();
	markup.push (0, `<div id="app">`);
		markup.push (1, `<div hidden>`);
			markup.push (2, `<h1>{{ title }}</h1>`);
			markup.push (2, `<h2>{{ site:description }}</h2>`);
			markup.push (2, `<h3>{{ meta:description }}</h3>`);
			markup.push (2, `<article>`);
				markup.push (3, `<h1>{{ title }}</h1>`);
				markup.push (3, `<h2>{{ site:description }}</h2>`);
				markup.push (3, `<date>0000-00-00</date>`);
				markup.push (3, `<p>{{ meta:description }}</p>`);
			markup.push (2, `</article>`);
			markup.push (2, `<menu>`);
				markup.push (3, `<ul><li></li></ul>`);
				markup.push (3, `<ul><li></li></ul>`);
				markup.push (3, `<nav>`);
					markup.push (4, `<ul><li></li></ul>`);
					markup.push (4, `<ul><li></li></ul>`);
				markup.push (3, `</nav>`);
			markup.push (2, `</menu>`);
		markup.push (1, `</div>`);
	markup.push (0, `</div>`);
	return markup.data;
	}