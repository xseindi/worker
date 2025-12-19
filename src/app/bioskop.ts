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

var {ln, ln_r, ln_tab, ln_s} = php.constant
var {zero, one} = php.constant

var POST_DATE = "2025-09-11"
var POST_DATE_STRING = "September 11, 2025"
var POST_CONTENT = "Million's of Movie's, TV Show's and People to discover."

import DB_SITEMAP_MOVIE from "../db/bioskop/sitemap/movie.json"
import DB_SITEMAP_TV from "../db/bioskop/sitemap/tv.json"

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
	await php.worker.start (app, request, response, next)
	if (request.redirect.url) return response.redirect (request.redirect.url, request.redirect.code)
	if (request.error.length) {
		for (var i in request.error) {
			if (request.error [i].type === "host") return response ("Not Found", 404)
			if (request.error [i].type === "agent") return response ("Forbidden", 404)
			}
		}
	start (request, response)
	return next ()
	})

function start (request: any, response: any) {
	response.app.nav = {menu: [], page: []}
	response.app.nav.page = [
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
	response.app.nav.menu = [
		{name: "Movie", permalink: request.router ("movie:index")},
		{name: "Movie (Trending)", permalink: request.router ("movie:trending")},
		{name: "Movie (Top Rated)", permalink: request.router ("movie:top_rated")},
		{name: "Movie (Now Playing)", permalink: request.router ("movie:now_playing")},
		{name: "Movie (Up Coming)", permalink: request.router ("movie:up_coming")},
		{name: "TV Show", permalink: request.router ("movie:index")},
		{name: "TV Show (Trending)", permalink: request.router ("movie:trending")},
		{name: "TV Show (Top Rated)", permalink: request.router ("movie:top_rated")},
		{name: "TV Show (Airing Today)", permalink: request.router ("movie:airing_today")},
		{name: "TV Show (Up Coming)", permalink: request.router ("movie:up_coming")},
		]
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

var HOME = async function (request: any, response: any, next: any) {
	response.set ({
		layout: "index",
		route: "home",
		variable: {},
		// article: {},
		// "ld+json webpage": {},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:content": POST_CONTENT,
		})
	}

app.get (app.router.index, HOME)
app.get ("/001", HOME)
app.get ("/002", HOME)
app.get ("/003", HOME)

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
 * page
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.page ["about"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "About",
		layout: "index",
		route: "home",
		variable: {},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router.page ["contact"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Contact",
		layout: "index",
		route: "home",
		variable: {},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router.page ["help"])

app.get (app.router.page ["privacy"])

app.get (app.router.page ["privacy-policy"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Privacy Policy",
		layout: "index",
		route: "page:privacy-policy",
		variable: {
			title: "Privacy Policy",
			last_update: POST_DATE_STRING,
			name: request.client.site.name,
			email: request.client.site.meta.author.email.address,
			base_url: request.base_url,
			url: request.router ({page: "contact"}),
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": php.render (php.page ["privacy-policy"] (), {
			"var:last_update":POST_DATE_STRING,
			"var:name": request.client.site.name,
			"var:email": request.client.site.meta.author.email.address,
			"var:base_url": request.base_url,
			"var:url": request.router ({page: "contact"}),
			}),
		})
	})

app.get (app.router.page ["privacy-policy:content"])

app.get (app.router.page ["term_of_use"])

app.get (app.router.page ["term_of_service"])

app.get (app.router.page ["cookie"])

app.get (app.router.page ["cookie:preference"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Cookie",
		layout: "index",
		route: "page:cookie-preference",
		variable: {
			title: "Cookie",
			last_update: POST_DATE_STRING,
			name: request.client.site.name,
			email: request.client.site.meta.author.email.address,
			base_url: request.base_url,
			url: request.router ({page: "privacy-policy"}),
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": php.render (php.page ["privacy-policy"] (), {
			"var:last_update": POST_DATE_STRING,
			"var:name": request.client.site.name,
			"var:email": request.client.site.meta.author.email.address,
			"var:base_url": request.base_url,
			"var:url": request.router ({page: "privacy-policy"}),
			}),
		})
	})

app.get (app.router.page ["disclaimer"], async function (request: any, response: any, next: any) {
	var variable = response.set ({
		title: "Disclaimer",
		layout: "index",
		route: "page:disclaimer",
		variable: {
			title: "Disclaimer",
			last_update: POST_DATE_STRING,
			name: request.client.site.name,
			email: request.client.site.meta.author.email.address,
			base_url: request.base_url,
			url: {contact: request.router ({page: "contact"})},
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router.page ["FAQ"])

app.get (app.router.page ["DMCA"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "DMCA",
		layout: "index",
		route: "page:DMCA",
		variable: {
			title: "DMCA",
			last_update: POST_DATE_STRING,
			name: request.client.site.name,
			email: request.client.site.meta.author.email.address,
			base_url: request.base_url,
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router.page ["EULA"])

app.get (app.router.page ["service"])

app.get (app.router.page ["partner"])

/**
 * page
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
		route: "under-construction",
		variable: {
			title: "Short",
			icon: "subscription",
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router.p ["live"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Live",
		layout: "index",
		route: "under-construction",
		variable: {
			title: "Live",
			icon: "live_tv",
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router.p ["history"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "History",
		layout: "index",
		route: "under-construction",
		variable: {
			title: "History",
			icon: "search_activity",
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["playlist:index"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Playlist",
		layout: "index",
		route: "under-construction",
		variable: {
			title: "Playlist",
			icon: "playlist_play",
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["playlist:default"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Watch Later",
		layout: "index",
		route: "under-construction",
		variable: {
			title: "Watch Later",
			icon: "timer_play",
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
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
	var movie = await request.tmdb.movie.search ({page: (request.url.query ("page") || one), query: search.query})
	var tv = await request.tmdb.tv.search ({page: (request.url.query ("page") || one), query: search.query})
	response.set ({
		title: "Search : " + search.query,
		layout: "index",
		route: "listing:all",
		variable: {
			search,
			sub_title: search.query,
			data: {movie, tv},
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

/**
 * movie
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.movie, async function (request: any, response: any, next: any) {
	var movie = await request.tmdb.movie.single (request.url.param ("id"), {append_to_response: true})
	// var movie = {id: 7451, title: "Movie", description: "description", poster: {url: "/file/100/cover.png"}, release_date: Date.now ()}
	if (movie.id) {
		var date = new php.date (movie.release_date)
		response.post = {}
		response.set ({
			title: movie.title,
			description: movie.description.split ('"').join ("'"),
			article: {date: {publish: movie.release_date}},
			"image:cover": movie.poster.url,
			"ld+json webpage": {},
			layout: "wide",
			route: "under-construction",
			variable: {
				title: "Short",
				icon: "subscription",
				data: movie,
				},
			})
		return response.vue ({
			"post:date": date.string (),
			"post:date string": POST_DATE_STRING,
			"post:content": movie.description,
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
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
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
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
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
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
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
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["movie:up_coming"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Movie (Coming Soon)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "Movie",
			sub_title: "Coming Soon",
			icon: "movie",
			data: await request.tmdb.movie.discover ({page: (request.url.query ("page") || one), up_coming: true}),
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
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
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

/**
 * tv
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router.tv, async function (request: any, response: any, next: any) {
	var video = await request.tmdb.tv.single (request.url.param ("id"), {append_to_response: true})
	// var video = {id: 7451, title: "Movie", description: "description", poster: {url: "/file/100/cover.png"}, release_date: Date.now ()}
	if (video.id) {
		var date = new php.date (video.release_date)
		response.post = {}
		response.set ({
			title: video.title,
			description: video.description.split ('"').join ("'"),
			article: {date: {publish: video.release_date}},
			"image:cover": video.poster.url,
			"ld+json webpage": {},
			layout: "wide",
			route: "under-construction",
			variable: {
				title: "Short",
				icon: "subscription",
				data: video,
				},
			})
		return response.vue ({
			"post:date": date.string (),
			"post:date string": POST_DATE_STRING,
			"post:content": video.description,
			})
		}
	else return next ()
	})

app.get (app.router ["tv:season"], async function (request: any, response: any, next: any) {
	var video = await request.tmdb.tv.single (request.url.param ("id"), {append_to_response: true})
	video.episode = (await request.tmdb.tv.season (request.url.param ("id"), request.url.param ("season"), {append_to_response: false})).episode
	if (video.id) {
		var date = new php.date (video.release_date)
		response.post = {}
		response.set ({
			title: video.title,
			description: video.description.split ('"').join ("'"),
			article: {date: {publish: video.release_date}},
			"image:cover": video.poster.url,
			"ld+json webpage": {},
			layout: "wide",
			route: "under-construction",
			variable: {
				season: request.url.param ("season"),
				title: "",
				icon: "home",
				data: video,
				},
			})
		return response.vue ({
			"post:date": date.string (),
			"post:date string": POST_DATE_STRING,
			"post:content": video.description,
			})
		}
	else return next ()
	})

app.get (app.router ["tv:season-episode"], async function (request: any, response: any, next: any) {
	var video = await request.tmdb.tv.single (request.url.param ("id"), {append_to_response: true})
	video.episode = (await request.tmdb.tv.season (request.url.param ("id"), request.url.param ("season"), {append_to_response: false})).episode
	if (video.id) {
		var date = new php.date (video.release_date)
		response.post = {}
		response.set ({
			title: video.title,
			description: video.description.split ('"').join ("'"),
			article: {date: {publish: video.release_date}},
			"image:cover": video.poster.url,
			"ld+json webpage": {},
			layout: "wide",
			route: "under-construction",
			variable: {
				season: request.url.param ("season"),
				episode: request.url.param ("episode"),
				title: "",
				icon: "home",
				data: video,
				},
			})
		return response.vue ({
			"post:date": date.string (),
			"post:date string": POST_DATE_STRING,
			"post:content": video.description,
			})
		}
	else return next ()
	})

app.get (app.router ["tv:index"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "TV Show",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "TV Show",
			sub_title: "Popular",
			icon: "tv_guide",
			data: await request.tmdb.tv.popular ({page: (request.url.query ("page") || one)}),
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["tv:trending"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "TV Show (Trending)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "TV Show",
			sub_title: "Trending",
			icon: "tv_guide",
			data: await request.tmdb.tv.trending ({page: (request.url.query ("page") || one)}),
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["tv:top_rated"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "TV Show (Top Rated)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "TV Show",
			sub_title: "Top Rated",
			icon: "tv_guide",
			data: await request.tmdb.tv.top_rated ({page: (request.url.query ("page") || one)}),
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["tv:airing_today"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "TV Show (Airing Today)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "TV Show",
			sub_title: "Airing Today",
			icon: "tv_guide",
			data: await request.tmdb.tv.airing_today ({page: (request.url.query ("page") || one)}),
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["tv:up_coming"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "TV Show (Coming Soon)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "TV Show",
			sub_title: "Coming Soon",
			icon: "tv_guide",
			data: await request.tmdb.tv.discover ({page: (request.url.query ("page") || one), up_coming_air: true}),
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["tv:editor-choice"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "TV Show (Editor Choice)",
		layout: "index",
		route: "under-construction",
		variable: {
			title: "TV Show",
			sub_title: "Editor Choice",
			icon: "editor_choice",
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
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
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
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
	var genre: any = {id: parseInt (request.url.param ("id")), slug: request.url.param ("genre")}
	genre.name = request.db.cache.genre.array ().filter ({id: genre.id}).one ().name
	var movie = await request.tmdb.movie.discover ({page: (request.url.query ("page") || one), genre: genre.id})
	var tv = await request.tmdb.tv.discover ({page: (request.url.query ("page") || one), genre: genre.id})
	response.set ({
		title: "Genre : " + genre.name,
		layout: "index",
		route: "listing:all",
		variable: {
			genre,
			sub_title: genre.name,
			data: {movie, tv},
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
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
	robot.push ("Disallow:")
	robot.push ("Sitemap: " + request.router ("sitemap.xml"))
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
	var xml = new php.markup ()
	xml.push (0, `<?xml version="1.0" encoding="UTF-8"?>`)
	xml.push (0, `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
	xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "page.xml"}, {cache: app.config.cache})}</loc></sitemap>`)
	if (false) xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "people.xml"}, {cache: app.config.cache})}</loc></sitemap>`)
	xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "movie.xml"}, {cache: app.config.cache})}</loc></sitemap>`)
	xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "tv.xml"}, {cache: app.config.cache})}</loc></sitemap>`)
	xml.push (1, `<sitemap><loc>${request.router ("sitemap", {sitemap: "genre.xml"}, {cache: app.config.cache})}</loc></sitemap>`)
	xml.push (0, `</sitemapindex>`)
	return response.xml (xml.render ())
	})

app.get (app.router ["sitemap:page.xml"], async function (request: any, response: any, next: any) {
	var date = (new php.date ()).iso ()
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
	})
app.get (app.router ["sitemap:post.xml"], async function (request: any, response: any, next: any) {
	var date = (new php.date ()).iso ()
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
	})

app.get (app.router ["sitemap:people.xml"], async function (request: any, response: any, next: any) {
	var date = (new php.date ()).iso ()
	var xml = new php.markup ()
	xml.push (0, `<?xml version="1.0" encoding="UTF-8"?>`)
	xml.push (0, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
	xml.push (0, `</urlset>`)
	return response.xml (xml.render ())
	})

app.get (app.router ["sitemap:movie.xml"], async function (request: any, response: any, next: any) {
	var date = (new php.date ()).iso ()
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
	for (var i in DB_SITEMAP_MOVIE) {
		if (DB_SITEMAP_MOVIE [i]) {
			xml.push (1, `<url>`)
			xml.push (2, `<loc>${request.url.rebase (DB_SITEMAP_MOVIE [i])}</loc>`)
			xml.push (2, `<lastmod>${date}</lastmod>`)
			xml.push (1, `</url>`)
			}
		}
	xml.push (0, `</urlset>`)
	return response.xml (xml.render ())
	})

app.get (app.router ["sitemap:tv.xml"], async function (request: any, response: any, next: any) {
	var date = (new php.date ()).iso ()
	var sitemap = [
		{location: request.router ("tv:index"), date},
		{location: request.router ("tv:trending"), date},
		{location: request.router ("tv:top_rated"), date},
		{location: request.router ("tv:airing_today"), date},
		{location: request.router ("tv:up_coming"), date},
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
	for (var i in DB_SITEMAP_TV) {
		if (DB_SITEMAP_TV [i]) {
			xml.push (1, `<url>`)
			xml.push (2, `<loc>${request.url.rebase (DB_SITEMAP_TV [i])}</loc>`)
			xml.push (2, `<lastmod>${date}</lastmod>`)
			xml.push (1, `</url>`)
			}
		}
	xml.push (0, `</urlset>`)
	return response.xml (xml.render ())
	})

app.get (app.router ["sitemap:genre.xml"], async function (request: any, response: any, next: any) {
	var date = (new php.date ()).iso ()
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
	var output: any = []
	output.push (`vue.app.config = ${JSON.stringify (response.app.config)}`)
	output.push (`vue.app.data.movie = ${JSON.stringify (response.app.data.movie)}`)
	output.push (`vue.app.data.tv = ${JSON.stringify (response.app.data.tv)}`)
	output.push (`vue.app.data.trending = ${JSON.stringify (response.app.data.trending)}`)
	output.push (`vue.app.data.genre = ${JSON.stringify (response.app.data.genre)}`)
	output.push (`vue.app.data.asia = {KR: [... vue.app.data.movie.country.KR, ... vue.app.data.tv.country.KR], JP: [... vue.app.data.movie.country.JP, ... vue.app.data.tv.country.JP], CN: [... vue.app.data.movie.country.CN, ... vue.app.data.tv.country.CN]}`)
	output.push (`vue.app.data.asia.all = [... vue.app.data.movie.country.KR, ... vue.app.data.movie.country.JP, ... vue.app.data.movie.country.CN, ... vue.app.data.tv.country.KR, ... vue.app.data.tv.country.JP, ... vue.app.data.tv.country.CN]`)
	output.push (`vue.router.link (${JSON.stringify (app.router)})`)
	output.push (`Function.image.stock (${JSON.stringify (response.image.stock)})`)
	return response.js (output.join (ln))
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

/*
app.get (app.router ["archive"])
app.get (app.router ["archive:year"])
app.get (app.router ["archive:month"])
app.get (app.router ["archive:day"])

app.get (app.router ["author:index"])
app.get (app.router ["author"])

app.get (app.router ["blog:index"])
app.get (app.router ["blog"])

app.get (app.router ["article:index"])
app.get (app.router ["article"])

app.get (app.router ["event:index"])
app.get (app.router ["event"])

app.get (app.router ["promo:index"])
app.get (app.router ["promo"])

app.get (app.router ["playlist:index"])
app.get (app.router ["playlist"])

app.get (app.router ["category:index"])
app.get (app.router ["category"])

app.get (app.router ["tag:index"])
app.get (app.router ["tag"])

app.get (app.router ["label:index"])
app.get (app.router ["label"])

app.get (app.router ["genre:index"])
app.get (app.router ["genre"])

app.get (app.router ["country:index"])
app.get (app.router ["country"])

app.get (app.router ["image:index"])
app.get (app.router ["image"])

app.get (app.router ["picture:index"])
app.get (app.router ["picture"])

app.get (app.router ["photo:index"])
app.get (app.router ["photo"])

app.get (app.router ["audio:index"])
app.get (app.router ["audio"])

app.get (app.router ["music:index"])
app.get (app.router ["music"])

app.get (app.router ["video:index"])
app.get (app.router ["video"])

app.get (app.router ["movie:index"])
app.get (app.router ["movie"])
app.get (app.router ["movie:keyword"])
app.get (app.router ["movie genre:index"])
app.get (app.router ["movie:genre"])
app.get (app.router ["movie trending:today"])
app.get (app.router ["movie trending:week"])
app.get (app.router ["movie:discover"])
app.get (app.router ["movie:popular"])
app.get (app.router ["movie:top_rated"])
app.get (app.router ["movie:up_coming"])
app.get (app.router ["movie:now_playing"])
app.get (app.router ["movie:top_global"])
app.get (app.router ["movie:editor-choice"])

app.get (app.router ["tv:index"])
app.get (app.router ["tv:season-episode"])
app.get (app.router ["tv:season"])
app.get (app.router ["tv"])
app.get (app.router ["tv:keyword"])
app.get (app.router ["tv genre:index"])
app.get (app.router ["tv:genre"])
app.get (app.router ["tv trending:today"])
app.get (app.router ["tv trending:week"])
app.get (app.router ["tv:discover"])
app.get (app.router ["tv:popular"])
app.get (app.router ["tv:top_rated"])
app.get (app.router ["tv:airing_today"])
app.get (app.router ["tv:on_air"])
app.get (app.router ["tv:top_global"])
app.get (app.router ["tv:editor-choice"])

app.get (app.router ["anime:index"])
app.get (app.router ["anime:season-episode"])
app.get (app.router ["anime:season"])
app.get (app.router ["anime"])
app.get (app.router ["anime:keyword"])
app.get (app.router ["anime genre:index"])
app.get (app.router ["anime:genre"])
app.get (app.router ["anime trending:today"])
app.get (app.router ["anime trending:week"])
app.get (app.router ["anime:discover"])

app.get (app.router ["people:index"])
app.get (app.router ["people"])
app.get (app.router ["people:top_global"])
app.get (app.router ["people:editor-choice"])

app.post ("/g_auth", async function (request: any, response: any, next: any) {
	var post = await request.json ()
	var g_auth = post.g_auth || {}
	if ("email" in g_auth) {
		if (request.db.cache.plugin.g_auth.array ().filter ({email: g_auth.email}).one ()) {}
		else {
			var insert = await request.db.cache.plugin.g_auth.insert ({
				p_id: g_auth.p_id,
				name: g_auth.name,
				email: g_auth.email,
				picture: g_auth.picture,
				})
			}
		return response.json ({success: true})
		}
	return response.json ({})
	})
*/