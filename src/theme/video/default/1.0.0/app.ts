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
	request.layout ["website"] = request.theme.layout ("website").render ({slot: "Hello World"}, 2)
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
	return response.html (request.layout ["website"])
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

export default app.router

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */