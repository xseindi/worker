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

import DB_SITEMAP_VIDEO_001 from "../db/bokep/sitemap/001.json"
import DB_SITEMAP_VIDEO_002 from "../db/bokep/sitemap/002.json"

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
		{name: "Movie", permalink: request.router ("movie:index")},
		{name: "Movie (Trending)", permalink: request.router ("movie:trending")},
		{name: "Movie (Top Rated)", permalink: request.router ("movie:top_rated")},
		{name: "Movie (Now Playing)", permalink: request.router ("movie:now_playing")},
		{name: "Movie (Up Coming)", permalink: request.router ("movie:up_coming")},
		{name: "TV Show", permalink: request.router ("tv:index")},
		{name: "TV Show (Trending)", permalink: request.router ("tv:trending")},
		{name: "TV Show (Top Rated)", permalink: request.router ("tv:top_rated")},
		{name: "TV Show (Airing Today)", permalink: request.router ("tv:airing_today")},
		{name: "TV Show (Up Coming)", permalink: request.router ("tv:up_coming")},
		]
	for (var i in request.db.cache.movie.data) response.app.link.s.push ({permalink: request.db.cache.movie.data [i].permalink, name: request.db.cache.movie.data [i].title})
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
		})
	return response.write ({
		h1: request.client.site.title,
		h2: request.client.site.description,
		h3: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
		})
	}

app.get (app.router.index, HOME)
app.get ("/001", HOME)
app.get ("/002", HOME)
app.get ("/003", HOME)

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
	return response.write ({
		h1: "About",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
		})
	})

app.get (app.router.page ["contact"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "Contact",
		layout: "index",
		route: "home",
		variable: {},
		})
	return response.write ({
		h1: "Contact",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "Privacy Policy",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		h5: request.client.site.tagline,
		date: POST_DATE,
		description: php.render (php.page ["privacy-policy"] (), {
			"var:last_update": POST_DATE_STRING,
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
	return response.write ({
		h1: "Cookie",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		h5: request.client.site.tagline,
		date: POST_DATE,
		description: php.render (php.page ["privacy-policy"] (), {
			"var:last_update": POST_DATE_STRING,
			"var:name": request.client.site.name,
			"var:email": request.client.site.meta.author.email.address,
			"var:base_url": request.base_url,
			"var:url": request.router ({page: "contact"}),
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
	return response.write ({
		h1: "Disclaimer",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "DMCA",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "Short",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
		})
	})

app.get (app.router.p ["editor-choice"], async function (request: any, response: any, next: any) {
	var movie = {data: request.db.cache.movie.data, "data:total": request.db.cache.movie.data.length, "page:total": 1}
	var tv = {data: request.db.cache.tv.data, "data:total": request.db.cache.tv.data.length, "page:total": 1}
	response.set ({
		title: "Editor Choice",
		layout: "index",
		route: "listing:all",
		variable: {
			sub_title: "Editor Choice",
			icon: "editor_choice",
			data: {movie, tv},
			},
		})
	return response.write ({
		h1: "Editor Choice",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "Live",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "History",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "Playlist",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "Watch Later",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
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
	return response.write ({
		h1: "Search : " + search.query,
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
		date: POST_DATE,
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
		date: POST_DATE,
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
		date: POST_DATE,
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
		date: POST_DATE,
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
		date: POST_DATE,
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
		date: POST_DATE,
		description: request.client.site.tagline,
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
	if (video.id) {
		var date = new php.date (video.release_date)
		var title = php.help.title.year (video.title, video.year)
		var description = video.description.split ('"').join ("'")
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
				title: "Short",
				icon: "subscription",
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

app.get (app.router ["tv:season"], async function (request: any, response: any, next: any) {
	var video = await request.tmdb.tv.single (request.url.param ("id"), {append_to_response: true}), season
	video.episode = (season = await request.tmdb.tv.season (request.url.param ("id"), request.url.param ("season"), {append_to_response: false})).episode
	if (video.id) {
		var date = new php.date (video.release_date)
		var title = php.help.title.year (video.title, video.year)
		var description = (season.description || video.description).split ('"').join ("'")
		video.description = description
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
				season: request.url.param ("season"),
				episode: one,
				title: "",
				icon: "home",
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

app.get (app.router ["tv:season-episode"], async function (request: any, response: any, next: any) {
	var video = await request.tmdb.tv.single (request.url.param ("id"), {append_to_response: true}), season, episode
	video.episode = (season = await request.tmdb.tv.season (request.url.param ("id"), request.url.param ("season"), {append_to_response: false})).episode
	episode = php.array (video.episode).filter ({number: parseInt (request.url.param ("episode"))}).one ()
	if (video.id) {
		var date = new php.date (video.release_date)
		var title = php.help.title.year (video.title, video.year)
		var description = (episode.description || season.description || video.description).split ('"').join ("'")
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
				season: request.url.param ("season"),
				episode: request.url.param ("episode"),
				title: "",
				icon: "home",
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
	return response.write ({
		h1: "TV Show",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "TV Show (Trending)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "TV Show (Top Rated)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "TV Show (Airing Today)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
		})
	})

app.get (app.router ["tv:up_coming"], async function (request: any, response: any, next: any) {
	response.set ({
		title: "TV Show (Up Coming)",
		layout: "index",
		route: "listing:default",
		variable: {
			title: "TV Show",
			sub_title: "Up Coming",
			icon: "tv_guide",
			data: await request.tmdb.tv.discover ({page: (request.url.query ("page") || one), up_coming_air: true}),
			},
		})
	return response.write ({
		h1: "TV Show (Up Coming)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
		description: request.client.site.tagline,
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
	return response.write ({
		h1: "TV Show (Editor Choice)",
		h2: request.client.site.title,
		h3: request.client.site.description,
		h4: request.client.site.meta.description,
		date: POST_DATE,
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
			date: POST_DATE,
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
		date: POST_DATE,
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
	var genre: any = {id: parseInt (request.url.param ("id")), slug: request.url.param ("genre")}
	genre.name = request.db.cache.genre.array ().filter ({id: genre.id}).one ().name
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
		date: POST_DATE,
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
	if (post.ip) if (post.country) var insert = await request.db.insert ("visitor:session").set ({date: request.date.string (), ip: post.ip, country: post.country}).query ()
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