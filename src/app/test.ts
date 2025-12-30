/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

import php, {express} from "../zend/engine"
import "../zend/constant"
import "../zend/lib"
import "../zend/library"
import "../zend/help"
import "../zend/html"
import "../zend/worker"
import "../zend/db"
import "../zend/theme"

import "../plugin/tmdb"
import "../plugin/video-src"

import DB_SITEMAP_VIDEO_001 from "../db/test/sitemap/001.json"
import DB_SITEMAP_VIDEO_002 from "../db/test/sitemap/002.json"

var {ln, ln_r, ln_tab, ln_s} = php.constant
var {zero, one} = php.constant

var the = {
	date: {
		index: "2025-09-11",
		format: "September 11, 2025",
		},
	sitemap: {
		page: [],
		categories: [],
		tag: [],
		genre: [],
		article: [],
		people: [],
		video: [],
		movie: [],
		tv: [],
		},
	}

/**
 * setup
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

var app = new php.worker (php.express)
app.start (async function (request: any, response: any, next: any) {
	await php.worker.start.up (app, request, response, next)
	if (request.redirect.url) return response.redirect (request.redirect.url, request.redirect.code)
	if (request.error.length) {
		for (var i in request.error) {
			if (request.error [i].type === "host") return response ("Not Found", 404)
			if (request.error [i].type === "agent") return response ("Forbidden", 403)
			}
		}
	start (request, response)
	return next ()
	})

function start (request: any, response: any) {
	response.app.link = {page: [], menu: [], s: []}
	response.app.link.page = [
		{name: "Home", permalink: "/"},
		{name: "About", permalink: request.router ({page: "about"})},
		{name: "Contact", permalink: request.router ({page: "contact"})},
		{name: "Help", permalink: request.router ({page: "help"})},
		{name: "Privacy Policy", permalink: request.router ({page: "privacy-policy"})},
		{name: "Term's of Use", permalink: request.router ({page: "term_of_use"})},
		{name: "Cookie Preference", permalink: request.router ({page: "cookie:preference"})},
		{name: "Disclaimer", permalink: request.router ({page: "disclaimer"})},
		{name: "DMCA", permalink: request.router ({page: "DMCA"})},
		]
	response.app.link.menu = [
		{name: "Video", permalink: request.router ("video:index")},
		{name: "People", permalink: request.router ("people:index")},
		]
	// for (var i in request.db.cache.movie.data) response.app.link.s.push ({permalink: request.db.cache.movie.data [i].permalink, name: request.db.cache.movie.data [i].title})
	}

/**
 * index
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.index, async function (request: any, response: any, next: any) {
	response.set ({
		layout: "test",
		route: "home",
		socket: {},
		})
	return response.send ({
		heading: [
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

/**
 * page
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.page ["help"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Help",
		layout: "index",
		route: "home",
		socket: {},
		})
	return response.send ({
		heading: [
			"Help",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

/**
 * channel
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.channel, async function (request: any, response: any, next: any) {
	response.set ({
		title: "Channel : " + "Test",
		layout: "test",
		route: "home",
		socket: {},
		})
	return response.send ({
		heading: [
			"Channel : " + "Test",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["channel:video"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Channel : " + "Test",
		layout: "test",
		route: "home",
		socket: {},
		})
	return response.send ({
		heading: [
			"Channel : " + "Test",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["channel:video page"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Channel : " + "Test",
		layout: "test",
		route: "home",
		socket: {},
		})
	return response.send ({
		heading: [
			"Channel : " + "Test",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

/**
 * search
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.search, async function (request: any, response: any, next: any) {
	var search = {query: request.url.query ("query")}
	response.set ({
		title: "Search : " + search.query,
		layout: "index",
		route: "listing:all",
		socket: {
			search,
			sub_title: search.query,
			icon: "search",
			data: [],
			},
		})
	return response.send ({
		heading: [
			"Search : " + search.query,
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			request.client.site.tagline,
			],
		date: request.date.index (),
		description: "",
		})
	})

/**
 * video
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.video, async function (request: any, response: any, next: any) {
	var video = response.db.video ()
	response.set ({
		title: video.title,
		layout: "index",
		route: "listing:all",
		socket: {
			icon: "movie",
			data: [],
			},
		})
	return response.send ({
		heading: [
			video.title,
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			request.client.site.tagline,
			],
		date: request.date.index (),
		description: video.description,
		})
	})

app.get (app.router.movie, async function (request: any, response: any, next: any) {
	var video = await request.tmdb.movie.single (request.url.param ("id"), {append_to_response: true})
	if (video.id) {
		var date = new php.date (video.release_date)
		var title = php.help.title.year (video.title, video.year)
		var description = video.description.split ('"').join ("'")
		response.post = {}
		response.set ({
			title,
			description,
			article: {date: {publish: video.release_date}},
			"image:cover": video.poster.url,
			"image:cover original": video.poster ["url:original"],
			"ld+json webpage": {},
			layout: "wrap",
			route: "video-src",
			variable: {
				data: video,
				},
			})
		return response.write ({
			h1: title,
			h2: request.client.site.title,
			h3: request.client.site.description,
			h4: request.client.site.meta.description,
			h5: request.client.site.tagline,
			date: date.string (),
			description,
			})
		}
	else return next ()
	})

app.get (app.router ["movie:index"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Movie",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "Movie",
			sub_title: "Popular",
			icon: "movie",
			data: await request.tmdb.movie.popular ({page: (request.url.query ("page") || one)}),
			},
		})
	return response.write ({
		h1: "Movie",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["movie:trending"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Movie (Trending)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "Movie",
			sub_title: "Trending",
			icon: "movie",
			data: await request.tmdb.movie.trending ({page: (request.url.query ("page") || one)}),
			},
		})
	return response.write ({
		h1: "Movie (Trending)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["movie:top_rated"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Movie (Top Rated)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "Movie",
			sub_title: "Top Rated",
			icon: "movie",
			data: await request.tmdb.movie.top_rated ({page: (request.url.query ("page") || one)}),
			},
		})
	return response.write ({
		h1: "Movie (Top Rated)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["movie:now_playing"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Movie (Now Playing)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "Movie",
			sub_title: "Now Playing",
			icon: "movie",
			data: await request.tmdb.movie.now_playing ({page: (request.url.query ("page") || one)}),
			},
		})
	return response.write ({
		h1: "Movie (Now Playing)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["movie:up_coming"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Movie (Up Coming)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "Movie",
			sub_title: "Up Coming",
			icon: "movie",
			data: await request.tmdb.movie.discover ({page: (request.url.query ("page") || one), up_coming: true}),
			},
		})
	return response.write ({
		h1: "Movie (Up Coming)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["movie:editor-choice"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Movie (Editor Choice)",
		layout: "index",
		route: "under-construction",
		variable: {
			title: "Movie",
			sub_title: "Editor Choice",
			icon: "editor_choice",
			},
		})
	return response.write ({
		h1: "Movie (Editor Choice)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

/**
 * people
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.people, async function (request: any, response: any, next: any) {
	var people = await request.tmdb.people.single (request.url.param ("id"), {append_to_response: false})
	var cc = await request.tmdb.people.cc (request.url.param ("id"))
	people.profile.cast = cc.data
	if (people.id) {
		var date = new php.date (people.profile.birth.date.format)
		var description = people.profile.biography.split (ln).join (" ")
		response.set ({
			title: people.profile.name,
			description,
			article: {date: {publish: people.profile.birth.date.format}},
			"image:cover": people.profile.poster.url,
			"ld+json webpage": {},
			layout: "wrap",
			route: "people:single",
			variable: {
				data: people,
				},
			})
		return response.write ({
			h1: people.profile.name,
			h2: request.client.site.title,
			h3: request.client.site.description,
			h4: request.client.site.meta.description,
			h5: request.client.site.tagline,
			date: the.date.index,
			description,
			})
		}
	else return next ()
	})

app.get (app.router ["people:index"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "People",
		layout: "index",
		route: "under-construction",
		variable: {
			title: "People",
			icon: "person",
			},
		})
	return response.write ({
		h1: "People",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

/**
 * genre
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.genre, async function (request: any, response: any, next: any) {
	var genre: any = {id: php.to_integer (request.url.param ("id")), slug: request.url.param ("slug")}
	genre.name = response.db.genre.array ().filter ({id: genre.id}).one ().name
	var movie = await request.tmdb.movie.discover ({page: (request.url.query ("page") || one), genre: genre.id})
	var tv = await request.tmdb.tv.discover ({page: (request.url.query ("page") || one), genre: genre.id})
	response.set ({
		title: genre.name,
		layout: "index",
		route: "listing:all",
		variable: {
			genre,
			sub_title: genre.name,
			data: {movie, tv},
			},
		})
	return response.write ({
		h1: genre.name,
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

/**
 * miscellaneous
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.p ["short"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Short",
		layout: "index",
		route: "home",
		socket: {
			title: "Short",
			icon: "subscription",
			},
		})
	return response.send ({
		heading: [
			"Short",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router.p ["live"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Live",
		layout: "index",
		route: "under-construction",
		socket: {
			title: "Live",
			icon: "live_tv",
			},
		})
	return response.send ({
		heading: [
			"Live",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router.history, async function (request: any, response: any, next: any) {
	response.set ({
		title: "History",
		layout: "index",
		route: "under-construction",
		socket: {
			title: "History",
			icon: "search_activity",
			},
		})
	return response.send ({
		heading: [
			"History",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["playlist:index"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Playlist",
		layout: "index",
		route: "under-construction",
		socket: {
			title: "Playlist",
			icon: "playlist_play",
			},
		})
	return response.send ({
		heading: [
			"Playlist",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["playlist:default"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Watch Later",
		layout: "index",
		route: "under-construction",
		socket: {
			title: "Watch Later",
			icon: "timer_play",
			},
		})
	return response.send ({
		heading: [
			"Watch Later",
			request.client.site.title,
			request.client.site.description,
			request.client.site.meta.description,
			],
		date: the.date.index,
		description: request.client.site.tagline,
		})
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router ["cgi-bin:api trending:today"], async function (request: any, response: any, next: any) {
	return response.json (await request.tmdb.trending ("today"))
	})

app.get (app.router ["cgi-bin:api trending:week"], async function (request: any, response: any, next: any) {
	return response.json (await request.tmdb.trending ("week"))
	})

app.post (app.router ["cgi-bin:api visitor:session"], async function (request: any, response: any, next: any) {
	var post = await request.json ()
	if (post.ip) if (post.country) if (post.url) if (post.agent) var insert = await request.db.insert ("visitor:session").set ({date: request.date.string (), ip: post.ip, country: post.country, url: post.url, agent: post.agent}).query ()
	console.log ("registering cookie", request.date.string (), post.ip, post.country)
	return response.json ({})
	})

app.post (app.router ["cgi-bin:api file:transfer-queue"], async function (request: any, response: any, next: any) {
	var post = await request.json ()
	var select = await request.db.select ("file:transfer-queue").find ({tmdb: post.id.tmdb}).query ()
	if (select.data.length) {}
	else { var insert = await request.db.insert ("file:transfer-queue").set ({tmdb: post.id.tmdb, imdb: post.id.imdb}).query () }
	return response.json ({})
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router ["robot:text"], async function (request: any, response: any, next: any) {
	var robot = ["User-agent: *"]
	robot.push ("Disallow: /cgi-bin/")
	robot.push ("Disallow: /cpanel/")
	robot.push ("Allow: /")
	robot.push ("")
	robot.push ("Sitemap: " + request.router ("sitemap.xml", {cache: app.config ["sitemap:cache"]}))
	robot.push ("Sitemap: " + request.router ("sitemap:movie.xml", {cache: app.config ["sitemap:cache"]}))
	robot.push ("Sitemap: " + request.router ("sitemap:tv.xml", {cache: app.config ["sitemap:cache"]}))
	robot.push ("Sitemap: " + request.router ("sitemap:people.xml", {cache: app.config ["sitemap:cache"]}))
	robot.push ("Sitemap: " + request.router ("sitemap:genre.xml", {cache: app.config ["sitemap:cache"]}))
	return response.text (robot.join (ln))
	})

app.get (app.router ["ad:text"], async function (request: any, response: any, next: any) {
	return response.text ("")
	})

app.get (app.router ["style.css"], async function (request: any, response: any, next: any) {
	return response.css ("")
	})

app.get (app.router ["script.js"], async function (request: any, response: any, next: any) {
	return response.js ("")
	})

app.get (app.router ["feed"], async function (request: any, response: any, next: any) {
	return response.xml (`<?xml version="1.0" encoding="UTF-8"?><xml></xml>`)
	})

app.get (app.router ["feed:atom"], async function (request: any, response: any, next: any) {
	return response.xml (`<?xml version="1.0" encoding="UTF-8"?><xml></xml>`)
	})

app.get (app.router ["manifest.json"], async function (request: any, response: any, next: any) {
	return response.json ({
		"name": "Minimal Manifest",
		"short_name": "Minimal Manifest",
		"display": "minimal-ui",
		"start_url": "/?manifest",
		"scope": "/",
		"background_color": "#FFFFFF",
		"theme_color": "#4285f4",
		"icons": [
			{"src": "/asset/image/manifest/144.png", "sizes": "144x144", "type": "image/png"},
			],
		})
	})

app.get (app.router ["sitemap.xml"], async function (request: any, response: any, next: any) {
	if (request.url.param ("cache") === app.config ["sitemap:cache"]) {
		var xml = new php.markup ()
		xml.push (0, `<?xml version="1.0" encoding="UTF-8"?>`)
		xml.push (0, `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
		xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "page.xml", cache: app.config ["sitemap:cache"]})}</loc></sitemap>`)
		if (false) xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "people.xml", cache: app.config ["sitemap:cache"]})}</loc></sitemap>`)
		xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "movie.xml", cache: app.config ["sitemap:cache"]})}</loc></sitemap>`)
		xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "tv.xml", cache: app.config ["sitemap:cache"]})}</loc></sitemap>`)
		xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "genre.xml", cache: app.config ["sitemap:cache"]})}</loc></sitemap>`)
		xml.push (0, `</sitemapindex>`)
		return response.xml (xml.render ())
		}
	else return next ()
	})

app.get (app.router ["sitemap:page.xml"], async function (request: any, response: any, next: any) {
	if (request.url.param ("cache") === app.config ["sitemap:cache"]) {
		var date = (new php.date (app.config ["sitemap:cache"])).iso ()
		var sitemap = [
			{location: request.router ({page: "about"}), date},
			{location: request.router ({page: "contact"}), date},
			{location: request.router ({page: "privacy-policy"}), date},
			{location: request.router ({page: "term_of_use"}), date},
			{location: request.router ({page: "cookie:preference"}), date},
			{location: request.router ({page: "disclaimer"}), date},
			{location: request.router ({page: "DMCA"}), date},
			]
		var xml = new php.markup ()
		xml.push (0, `<?xml version="1.0" encoding="UTF-8"?>`)
		xml.push (0, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
		for (var i in sitemap) {
			xml.push (1, `<url>`)
			xml.push (2, `<loc>${sitemap [i].location}</loc>`)
			xml.push (2, `<lastmod>${sitemap [i].date}</lastmod>`)
			xml.push (1, `</url>`)
			}
		xml.push (0, `</urlset>`)
		return response.xml (xml.render ())
		}
	else return next ()
	})

app.get (app.router ["sitemap:post.xml"], async function (request: any, response: any, next: any) {
	if (request.url.param ("cache") === app.config ["sitemap:cache"]) {
		var date = (new php.date (app.config ["sitemap:cache"])).iso ()
		var xml = new php.markup ()
		xml.push (0, `<?xml version="1.0" encoding="UTF-8"?>`)
		xml.push (0, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
		if (false) {
			for (var i in response.app.data.genre) {
				xml.push (1, `<url>`)
				xml.push (2, `<loc>${response.app.data.genre [i].permalink}</loc>`)
				xml.push (2, `<lastmod>${date}</lastmod>`)
				xml.push (2, `<changefreq>weekly</changefreq>`)
				xml.push (2, `<priority>0.8</priority>`)
				xml.push (1, `</url>`)
				}
			}
		xml.push (0, `</urlset>`)
		return response.xml (xml.render ())
		}
	else return next ()
	})

app.get (app.router ["sitemap:people.xml"], async function (request: any, response: any, next: any) {
	if (request.url.param ("cache") === app.config ["sitemap:cache"]) {
		var date = (new php.date (app.config ["sitemap:cache"])).iso ()
		var xml = new php.markup ()
		xml.push (0, `<?xml version="1.0" encoding="UTF-8"?>`)
		xml.push (0, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
		xml.push (0, `</urlset>`)
		return response.xml (xml.render ())
		}
	else return next ()
	})

app.get (app.router ["sitemap:movie.xml"], async function (request: any, response: any, next: any) {
	if (request.url.param ("cache") === app.config ["sitemap:cache"]) {
		var date = (new php.date (app.config ["sitemap:cache"])).iso ()
		var sitemap = [
			{location: request.router ("movie:index"), date},
			{location: request.router ("movie:trending"), date},
			{location: request.router ("movie:top_rated"), date},
			{location: request.router ("movie:now_playing"), date},
			{location: request.router ("movie:up_coming"), date},
			]
		var xml = new php.markup ()
		xml.push (0, `<?xml version="1.0" encoding="UTF-8"?>`)
		xml.push (0, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
		for (var i in sitemap) {
			xml.push (1, `<url>`)
			xml.push (2, `<loc>${sitemap [i].location}</loc>`)
			xml.push (2, `<lastmod>${sitemap [i].date}</lastmod>`)
			xml.push (2, `<changefreq>weekly</changefreq>`)
			xml.push (2, `<priority>0.8</priority>`)
			xml.push (1, `</url>`)
			}
		for (var i in DB_SITEMAP_VIDEO_001) {
			if (DB_SITEMAP_VIDEO_001 [i]) {
				xml.push (1, `<url>`)
				xml.push (2, `<loc>${request.url.rebase (DB_SITEMAP_VIDEO_001 [i])}</loc>`)
				xml.push (2, `<lastmod>${date}</lastmod>`)
				xml.push (1, `</url>`)
				}
			}
		xml.push (0, `</urlset>`)
		return response.xml (xml.render ())
		}
	else return next ()
	})

app.get (app.router ["sitemap:genre.xml"], async function (request: any, response: any, next: any) {
	if (request.url.param ("cache") === app.config ["sitemap:cache"]) {
		var date = (new php.date (app.config ["sitemap:cache"])).iso ()
		var xml = new php.markup ()
		xml.push (0, `<?xml version="1.0" encoding="UTF-8"?>`)
		xml.push (0, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
		for (var i in response.app.data.genre) {
			xml.push (1, `<url>`)
			xml.push (2, `<loc>${response.app.data.genre [i].permalink}</loc>`)
			xml.push (2, `<lastmod>${date}</lastmod>`)
			xml.push (1, `</url>`)
			}
		xml.push (0, `</urlset>`)
		return response.xml (xml.render ())
		}
	else return next ()
	})

if (php ["config.json"]["cache:generator"]) app.get ("/cgi-bin/cache/generate.js", async function (request: any, response: any, next: any) {
	response.app.data.movie = {
		popular: (await request.tmdb.movie.popular ()).data,
		top_rated: (await request.tmdb.movie.top_rated ()).data,
		now_playing: (await request.tmdb.movie.now_playing ()).data,
		up_coming: (await request.tmdb.movie.discover ({up_coming: true})).data,
		country: {
			KR: (await request.tmdb.movie.discover ({country: "KR"})).data,
			JP: (await request.tmdb.movie.discover ({country: "JP"})).data,
			CN: (await request.tmdb.movie.discover ({country: "CN"})).data,
			},
		}
	response.app.data.tv = {
		popular: (await request.tmdb.tv.popular ()).data,
		top_rated: (await request.tmdb.tv.top_rated ()).data,
		airing_today: (await request.tmdb.tv.airing_today ()).data,
		up_coming: (await request.tmdb.tv.discover ({up_coming: true})).data,
		country: {
			KR: (await request.tmdb.tv.discover ({country: "KR"})).data,
			JP: (await request.tmdb.tv.discover ({country: "JP"})).data,
			CN: (await request.tmdb.tv.discover ({country: "CN"})).data,
			},
		}
	response.app.data.trending = {
		today: (await request.tmdb.trending ("today")).data,
		week: (await request.tmdb.trending ("week")).data,
		}
	response.app.data ["editor-choice"] = [... request.db.cache.movie.data, ... request.db.cache.tv.data]
	var output: any = []
	output.push (`vue.app.config = ${JSON.stringify (response.app.config)}`)
	output.push (`vue.app.data.movie = ${JSON.stringify (response.app.data.movie)}`)
	output.push (`vue.app.data.tv = ${JSON.stringify (response.app.data.tv)}`)
	output.push (`vue.app.data.trending = ${JSON.stringify (response.app.data.trending)}`)
	output.push (`vue.app.data ["editor-choice"] = ${JSON.stringify (response.app.data ["editor-choice"])}`)
	output.push (`vue.app.data.genre = ${JSON.stringify (response.app.data.genre)}`)
	output.push (`vue.app.data.asia = {KR: [... vue.app.data.movie.country.KR, ... vue.app.data.tv.country.KR], JP: [... vue.app.data.movie.country.JP, ... vue.app.data.tv.country.JP], CN: [... vue.app.data.movie.country.CN, ... vue.app.data.tv.country.CN]}`)
	output.push (`vue.app.data.asia.all = [... vue.app.data.movie.country.KR, ... vue.app.data.movie.country.JP, ... vue.app.data.movie.country.CN, ... vue.app.data.tv.country.KR, ... vue.app.data.tv.country.JP, ... vue.app.data.tv.country.CN]`)
	output.push (`vue.router.link (${JSON.stringify (app.router)})`)
	output.push (`Function.video.src.external (1252428, "byse", "https://bysefujedu.com/e/q03yj9hmy0dp")`)
	output.push (`Function.image.stock (${JSON.stringify (response.image.stock)})`)
	return response.js (output.join (ln))
	})

app.get ("/testing", async function (request: any, response: any, next: any) {
	var id: any = []
	var data = []
	for (var x in id) {
		var json = await request.tmdb.movie.single (id [x])
		data.push (JSON.stringify (json) + ",")
		}
	return response.text (data.join (ln))
	})

app.get ("/test/:id", async function (request: any, response: any, next: any) {
	var movie_id = request.url.param ("id")
	var data = await request.tmdb.movie.single (movie_id)
	return response.json (data)
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.catch (function (request: any, response: any, next: any) {
	response.set ({layout: 404})
	return response.vue (404)
	return response ("404 Not Found", 404)
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

export default app.export ()

console.log ("let's go")

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */