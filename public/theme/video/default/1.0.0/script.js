/*
$.element = {}

$.action = function (action) {
	for (var i in $.action.event [action]) $.action.event [action][i] ();
	}

$.action.push = function (action, context) {
	if ($.action.event [action]) {}
	else $.action.event [action] = [];
	$.action.event [action].push (context);
	return $.action.event [action];
	}

$.action.event = {
	"body:css": [],
	}

$.action.body = {}
$.action.body.css = function () {
	var type = "phone";
	var orientation = "portrait";
	var body = $ ("body").innerWidth ();
	if (body > 600) type = "phone";
	if (body > 1000) type = "computer";
	if ($ ("body").width () > $ ("body").height ()) orientation = "landscape";
	$ ("body").removeClass ("computer mobile tablet phone");
	$ ("body").addClass (type).addClass (orientation);
	if (type === "computer") $ ("#menu").css ("display", "flex");
	if (type === "phone") $ ("#menu").css ("display", "none");
	$.action ("body:css");
	}

$ (document).ready (function () {
	$.action.body.css ();
	});

$ (window).on ("resize", function () {
	$.action.body.css ();
	});
*/