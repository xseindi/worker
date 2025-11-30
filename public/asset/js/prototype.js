function JWT_parse (token) {
	var data = JSON.parse (decodeURIComponent (atob (token.split (".") [1].replace (/-/g, "+").replace (/_/g, "/")).split ("").map (function (c) { return "%" + ("00" + c.charCodeAt (0).toString (16)).slice (-2); }).join("")));
	return {name: data.name, email: data.email, picture: data.picture}
	}

var php = function () {}
php.event = {}
php.on = function (key, value) { if (php.event [key]) php.event [key].push (value); else php.event [key] = [value]; }
php.action = function (key, ... value) { for (var i in php.event [key]) php.event [key][i] (... value); }
php.AD__ = function () {}
php.AD__.detect = function (url) { $.ajax ({url: (url || php.AD__.link.default), success: function () {}, error: function () { php.AD__.block = true; if (php.AD__.error) php.AD__.error (php.AD__.block); }}) }
php.AD__.link = {}
php.AD__.link ["adsterra"] = "https://www.effectivegatecpm.com/h83jmjq7?key=5a9ef1496ac083c698ab74f41502102e";
php.AD__.link ["adsterra:adult"] = "https://www.effectivegatecpm.com/yndh9p11?key=4b2e330f757e5a69f7ef0785a939878e";
php.AD__.link ["monetag"] = "";
php.AD__.link.default = php.AD__.link ["adsterra"];

php.google = function () {}
php.google.auth = function () {}
php.google.auth.client = {id: "863870409218-moufehk4or38mut7c9lgqq91a010tq2l.apps.googleusercontent.com"}
php.google.auth.ls = "google_one_tap_credential";
php.google.auth.prompt = function () { google.accounts.id.prompt (); }
php.google.auth.sign = function () { google.accounts.id.prompt (); }
php.google.auth.sign.in = function (response) { localStorage.setItem (php.google.auth.ls, response.credential.toString ()); location.reload (); }
php.google.auth.sign.out = function () { localStorage.removeItem (php.google.auth.ls); google.accounts.id.disableAutoSelect (); location.reload (); }
php.google.auth.set = function (key, value) { if (key === "client:id") php.google.auth.client.id = value; }
if (php.google.auth.credential = localStorage.getItem (php.google.auth.ls)) php.google.auth.profile = JWT_parse (php.google.auth.credential);
php.on ("load", function () {
	google.accounts.id.initialize ({
		client_id: php.google.auth.client.id,
		callback: php.google.auth.sign.in,
		auto_select: false,
		});
	if (php.google.auth.credential) {}
	else if (false) php.google.auth.prompt ();
	else {}
	});