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

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

app.use (async function (app: any, request: any, response: any, next: any) {
	// request.layout ["default"] = request.theme.layout ("default").render (2)
	// request.layout ["index"] = request.theme.layout ("index").render (2)
	response.var ["theme:header"] = `<img src="{{ asset:image }}/logo.png">`
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