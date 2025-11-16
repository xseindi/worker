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
import "../zend/theme"
import "../zend/worker"

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
	return next ()
	})

app.get ("/", async function (request: any, response: any, next: any) {
	return response.html ("Hello World")
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