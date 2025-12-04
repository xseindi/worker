import php from "../zend/engine";

php.help = function () {}

php.help ["script.js"] = function (app: any, request: any, response: any, next: any) {
	var markup = new php.markup ();
	var image: any = {stock: {}}
	for (var i in request.db.cache.image.data) {
		var dir = "";
		if (request.db.cache.image.data [i].type_of === "brand") dir = "brand/";
		image.stock [request.db.cache.image.data [i].id] = dir + request.db.cache.image.data [i].file;
		if (request.db.cache.image.data [i].slug) image.stock [request.db.cache.image.data [i].slug] = dir + request.db.cache.image.data [i].file;
		}
	markup.push (3, `php.app.var = {"site:name": $.meta.get ({property: "og:site_name"}), "site:description": $.meta.get ({property: "og:site_description"})}`);
	markup.push (3, `php.app.theme = ${JSON.stringify (request.client.theme)}`);
	markup.push (3, `php.app.router = "${response.var ['router']}"`);
	markup.push (3, `php.app.image = ${JSON.stringify (request.client.object.image)}`);
	markup.push (3, `php.router.link = ${JSON.stringify (app.router)}`);
	markup.push (3, `php.image.stock = ${JSON.stringify (image.stock)}`);
	markup.push (3, `php.cookie ()`);
	markup.push (3, `php.cookie.set ({domain: "${request.client.host.cookie}"})`);
	markup.push (3, `php.cookie.start ()`);
	markup.push (3, `php.google.auth.start ()`);
	markup.push (3, `window.onload = function () { php.emit ("load") }`);
	return markup;
	}