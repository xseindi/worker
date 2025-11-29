$.element = {}

$.element ["menu:display"] = function (display = "flex") {
	$ ("#menu").css ("display", display);
	}

$.__action = {
	"body:css": [],
	}

$.action = function (action) {
	for (var i in $.__action [action]) $.__action [action][i] ();
	}

$.action.add = function (action, context) {
	$.__action [action].push (context);
	return $.__action [action];
	}

function body_css () {
	var type = "phone";
	var orientation = "portrait";
	var body = $ ("body").innerWidth ();
	if (body > 600) type = "phone";
	if (body > 1000) type = "computer";
	if ($ ("body").width () > $ ("body").height ()) orientation = "landscape";
	$ ("body").removeClass ("computer mobile tablet phone");
	$ ("body").addClass (type).addClass (orientation);
	if (type === "computer") $.element ["menu:display"] ();
	if (type === "phone") $.element ["menu:display"] ("none");
	}

$ (document).ready (function () {
	body_css ();
	if ($ ("body").hasClass ("phone")) {
		}
	});

$ (window).on ("resize", function () {
	body_css ();
	});