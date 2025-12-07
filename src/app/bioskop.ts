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
			if (request.error [i].type === "host") return response ("Host Not Found", 404)
			}
		}
	return next ()
	})

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

app.get (app.router.index, async function (request: any, response: any, next: any) {
	var test = await request.tmdb.movie.popular ()
	response.app.data.movie = {popular: test.data}
	response.set ({
		layout: "index",
		router: "home",
		// article: {},
		// "ld+json webpage": {},
		})
	return response.vue ()
	})

app.get (app.router.page ["about"], function (request: any, response: any, next: any) {
	response.set ({title: "About"})
	return response.vue ()
	})

app.get (app.router.page ["contact"])

app.get (app.router.page ["help"])

app.get (app.router.page ["privacy"])

app.get (app.router.page ["privacy-policy"])

app.get (app.router.page ["privacy-policy:content"])

app.get (app.router.page ["term_of_use"])

app.get (app.router.page ["term_of_service"])

app.get (app.router.page ["cookie"])

app.get (app.router.page ["cookie:preference"])

app.get (app.router.page ["disclaimer"])

app.get (app.router.page ["FAQ"])

app.get (app.router.page ["DMCA"])

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

app.get (app.router ["archive"])
app.get (app.router ["archive:year"])
app.get (app.router ["archive:month"])
app.get (app.router ["archive:day"])

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router ["author:index"])
app.get (app.router ["author"])

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.get (app.router ["blog:index"])
app.get (app.router ["blog"])

app.get (app.router ["article:index"])
app.get (app.router ["article"])

app.get (app.router ["event:index"])
app.get (app.router ["event"])

app.get (app.router ["promo:index"])
app.get (app.router ["promo"])

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

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

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

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

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

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

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */