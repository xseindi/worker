import php from "../../../../zend/engine"

var $ = php ["router.json"]

var app = new php.worker.router ()

app.get ($ ["index"], async function (app: any, request: any, response: any, next: any) {
	return response.html ("Hello World")
	})

export default app.router