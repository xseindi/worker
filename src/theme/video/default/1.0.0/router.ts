import php from "../../../../zend/engine"

var $ = php ["router.json"]

var app = new php.worker.router

app.use (async function (app: any, request: any, response: any, next: any) {
	request.layout ["website"] = request.theme.layout ("website").render ({slot: "Hello World"}, 2)
	})

app.get ($ ["index"], async function (app: any, request: any, response: any, next: any) {
	return response.html (request.layout ["website"])
	})

app.get ($.page ["about"], async function (app: any, request: any, response: any, next: any) {
	return response.html ("Hello World")
	})

export default app.router