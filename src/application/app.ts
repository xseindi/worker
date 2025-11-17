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
import "../zend/lib"
import "../zend/library"
import "../zend/worker"
import "../zend/db"
import "../zend/theme"

import "../plugin/tmdb"
import "../plugin/video-src"

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
	if (request.error.length) {
		for (var i in request.error) {
			if (request.error [i].type === "host") return response ("Host Not Found")
			}
		}
	request.router.use ()
	return next ()
	})

app.get (app.router ["style.css"], async function (request: any, response: any, next: any) {
	return response.css ("")
	})

app.get (app.router.index)
app.get (app.router.page ["about"])

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

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