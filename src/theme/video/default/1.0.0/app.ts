/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

import php from "../../../../zend/engine"
var $ = php ["router.json"]
var app = new php.worker.router
const {ln, zero, one} = php.constant

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.use (function (app: any, request: any, response: any, next: any) {
	return php.promise (async function (resolve: any, reject: any) {
		var the: any = {}
		the.movie = {"quantity:index": "99 +", "quantity:popular": "&#x2197;", "quantity:top_rated": "&#x27A1;", "quantity:up_coming": "&#x2198;", "quantity:top_global": 0, "quantity:editor-choice": 0, genre: request.tmdb.movie.genre (), "genre:split": request.tmdb.movie.genre ("split")}
		the.movie.element = {
			header: [
				{type: "anchor", anchor: [{title: "All", permalink: request.router.permalink ("movie:index"), quantity: the.movie ["quantity:index"], icon: "more_horiz"}]},
				{type: "separator"},
				{type: "anchor", anchor: [{title: "Popular", permalink: request.router.permalink ("movie:popular"), quantity: the.movie ["quantity:popular"], icon: "hotel_class"}, {title: "Top Rated", permalink: request.router.permalink ("movie:top_rated"), quantity: the.movie ["quantity:top_rated"], icon: "local_fire_department"}, {title: "Up Coming", permalink: request.router.permalink ("movie:up_coming"), quantity: the.movie ["quantity:up_coming"], icon: "timer_play"}]},
				{type: "separator"},
				{type: "anchor", anchor: [{title: "Top Global", permalink: request.router.permalink ("movie:top_global"), quantity: the.movie ["quantity:top_global"], icon: "bolt"}, {title: "Editor Choice", permalink: request.router.permalink ("movie:editor-choice"), quantity: the.movie ["quantity:editor-choice"], icon: "editor_choice"}]},
				{type: "separator"},
				{type: "link", left: the.movie ["genre:split"].left.map (function (genre: any) { return {title: genre.title, permalink: genre.permalink} }), right: the.movie ["genre:split"].right.map (function (genre: any) { return {title: genre.title, permalink: genre.permalink} })},
				],
			}
		the.tv = {"quantity:index": "99 +", "quantity:popular": "&#x2197;", "quantity:top_rated": "&#x27A1;", "quantity:airing_today": "&#x2198;", "quantity:top_global": 0, "quantity:editor-choice": 0, genre: request.tmdb.tv.genre (), "genre:split": request.tmdb.tv.genre ("split")}
		the.tv.element = {
			header: [
				{type: "anchor", anchor: [{title: "All", permalink: request.router.permalink ("tv:index"), quantity: the.tv ["quantity:index"], icon: "more_horiz"}]},
				{type: "separator"},
				{type: "anchor", anchor: [{title: "Popular", permalink: request.router.permalink ("tv:popular"), quantity: the.tv ["quantity:popular"], icon: "hotel_class"}, {title: "Top Rated", permalink: request.router.permalink ("tv:top_rated"), quantity: the.tv ["quantity:top_rated"], icon: "local_fire_department"}, {title: "Airing Today", permalink: request.router.permalink ("tv:airing_today"), quantity: the.tv ["quantity:airing_today"], icon: "timer_play"}]},
				{type: "separator"},
				{type: "anchor", anchor: [{title: "Top Global", permalink: request.router.permalink ("tv:top_global"), quantity: the.tv ["quantity:top_global"], icon: "bolt"}, {title: "Editor Choice", permalink: request.router.permalink ("tv:editor-choice"), quantity: the.tv ["quantity:editor-choice"], icon: "editor_choice"}]},
				{type: "separator"},
				{type: "link", left: the.tv ["genre:split"].left.map (function (genre: any) { return {title: genre.title, permalink: genre.permalink} }), right: the.tv ["genre:split"].right.map (function (genre: any) { return {title: genre.title, permalink: genre.permalink} })},
				],
			}
		the.people = {"quantity:index": "99 +", "quantity:male": "&#x27A1;", "quantity:female": "&#x27A1;", "quantity:top_global": 0, "quantity:editor-choice": 0, genre: request.tmdb.movie.genre (), "genre:split": request.tmdb.movie.genre ("split")}
		the.people.element = {
			header: [
				{type: "anchor", anchor: [{title: "All", permalink: request.router.permalink ("movie:index"), quantity: the.movie ["quantity:index"], icon: "more_horiz"}]},
				{type: "separator"},
				{type: "anchor", anchor: [{title: "Male", permalink: "/", quantity: the.people ["quantity:male"], icon: "male"}, {title: "Female", permalink: "/", quantity: the.people ["quantity:female"], icon: "female"}]},
				{type: "separator"},
				{type: "anchor", anchor: [{title: "Top Global", permalink: request.router.permalink ("movie:top_global"), quantity: the.movie ["quantity:top_global"], icon: "bolt"}, {title: "Editor Choice", permalink: request.router.permalink ("movie:editor-choice"), quantity: the.movie ["quantity:editor-choice"], icon: "editor_choice"}]},
				{type: "separator"},
				{type: "link", left: the.movie ["genre:split"].left.map (function (genre: any) { return {title: genre.title, permalink: genre.permalink} }), right: the.movie ["genre:split"].right.map (function (genre: any) { return {title: genre.title, permalink: genre.permalink} })},
				],
			}
		request.app.theme.package (app, request, response, next)
		response.var ["theme:footer"] = []
		var db_theme_footer = [
			{component: "footer:info", param: {}},
			]
		for (var i in db_theme_footer) {
			response.var ["theme:footer"].push (request.component [db_theme_footer [i].component] (db_theme_footer [i].param, 3))
			}
		response.var ["theme:header"] = request.theme.component ("header:fly").render (3)
		response.var ["theme:component header:logo"] = request.theme.component ("logo:sample").render (4)
		response.var ["theme:component header button:movie"] = request.component ["button:inline"] ({title: "Movie", data: the.movie.element ["header"]}, 4)
		response.var ["theme:component header button:tv"] = request.component ["button:inline"] ({title: "TV Show", data: the.tv.element ["header"]}, 4)
		response.var ["theme:component header button:people"] = request.component ["button:inline"] ({title: "People", data: the.people.element ["header"]}, 4)
		resolve ()
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

app.get ($ ["index"], async function (app: any, request: any, response: any, next: any) {
	return response.render ("index", {slot: "Hello World"}, 2)
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

app.get ($.page ["about"], async function (app: any, request: any, response: any, next: any) {
	var tmdb_response: any = await request.tmdb.movie.popular ()
	response.seo ({title: "About"})
	return response.render ("index", {slot: `<pre>${JSON.stringify(tmdb_response, null, '\t')}</pre>`}, 2)
	})

app.get ("/test", async function (app: any, request: any, response: any, next: any) {
	// return response.html (`<iframe width="560" height="315" src="https://www.youtube.com/embed/Kt2E8nblvXU"></iframe>`)
	return test_single (app, request, response, next)
	})
//1062722
async function test_single (app: any, request: any, response: any, next: any) {
	var data = await request.tmdb.movie.single (1062722)
	return response.text (JSON.stringify (data))
	}

async function test (app: any, request: any, response: any, next: any) {
	var data = await request.tmdb.movie.popular ()
	return response.text (JSON.stringify (data, null, "\t"))
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

export default app.router

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */