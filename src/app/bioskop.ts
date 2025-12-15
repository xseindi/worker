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

/**
 * xxx
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
	return next ()
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

var test = async function (request: any, response: any, next: any) {
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

app.get (app.router.index, test)
app.get ("/001", test)
app.get ("/002", test)
app.get ("/003", test)

/**
 * xxx
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
 * xxx
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

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router ["search"])

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router ["movie:index"], async function (request: any, response: any, next: any) {
	var page, variable: any = {
		title: "Movie",
		icon: "movie",
		cache: "movie",
		}
	if (page = request.url.query ("page")) {
		variable.data = (await request.tmdb.movie.popular ({page})).data
		}
	response.set ({
		title: "Movie",
		layout: "index",
		route: "listing",
		variable,
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
		route: "listing",
		variable: {
			title: "Movie (Trending)",
			icon: "movie",
			data: (await request.tmdb.movie.trending ({page: (request.url.query ("page") || one)})).data,
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
		route: "listing",
		variable: {
			title: "Movie (Top Rated)",
			icon: "movie",
			data: (await request.tmdb.movie.top_rated ({page: (request.url.query ("page") || one)})).data,
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
		route: "listing",
		variable: {
			title: "Movie (Now Playing)",
			icon: "movie",
			data: (await request.tmdb.movie.now_playing ({page: (request.url.query ("page") || one)})).data,
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
		route: "listing",
		variable: {
			title: "Movie (Coming Soon)",
			icon: "movie",
			data: (await request.tmdb.movie.discover ({page: (request.url.query ("page") || one), up_coming: true})).data,
			},
		})
	return response.vue ({
		"post:date": POST_DATE,
		"post:date string": POST_DATE_STRING,
		"post:content": POST_CONTENT,
		})
	})

app.get (app.router ["tv:index"], async function (request: any, response: any, next: any) {
	var page, variable: any = {
		title: "TV Show",
		icon: "tv_guide",
		cache: "tv",
		}
	if (page = request.url.query ("page")) {
		variable.data = (await request.tmdb.tv.popular ({page})).data
		}
	response.set ({
		title: "TV Show",
		layout: "index",
		route: "listing",
		variable,
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
		route: "listing",
		variable: {
			title: "TV Show (Trending)",
			icon: "tv_guide",
			data: (await request.tmdb.tv.trending ({page: (request.url.query ("page") || one)})).data,
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
		route: "listing",
		variable: {
			title: "TV Show (Top Rated)",
			icon: "tv_guide",
			data: (await request.tmdb.tv.top_rated ({page: (request.url.query ("page") || one)})).data,
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
		route: "listing",
		variable: {
			title: "TV Show (Airing Today)",
			icon: "tv_guide",
			data: (await request.tmdb.tv.airing_today ({page: (request.url.query ("page") || one)})).data,
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
		route: "listing",
		variable: {
			title: "TV Show (Coming Soon)",
			icon: "tv_guide",
			data: (await request.tmdb.tv.discover ({page: (request.url.query ("page") || one), up_coming_air: true})).data,
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
	return response.text ("")
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
	output.push (`lib.image.stock = ${JSON.stringify (response.image.stock)}`)
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