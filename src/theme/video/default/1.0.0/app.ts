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
		request.app.theme.package (app, request, response, next)
		response.var ["theme:footer"] = []
		var db_theme_footer = [
			{component: "footer:info", param: {}},
			]
		for (var i in db_theme_footer) {
			response.var ["theme:footer"].push (request.component [db_theme_footer [i].component] (db_theme_footer [i].param, 3))
			}
		response.var ["theme:header"] = request.theme.component ("header:fly").render (3)
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