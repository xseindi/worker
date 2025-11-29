var {createApp, ref, reactive} = Vue;

$.vue = function (data = {}) {
	return {vue: $.vue, app: $.vue.app, ... data}
	}

$.vue.reference = function (value) { return ref (value); }
$.vue.reactive = function (value) { return reactive (value); }
$.vue.layout = function (key, value) { $.vue.global [$.vue.layout.key (key)] = value; }
$.vue.layout.key = function (layout) { return "layout:" + layout; }
$.vue.component = function (key, value) { $.vue.global [key] = value; }
$.vue.element = function (key, value) { $.vue.global [key] = value; }
$.vue.global = {}

$.vue.create = function (context) {
	if (context) {}
	else context = $.vue.setup ();
	var app = createApp (context);
	for (var i in $.vue.global) app = app.component (i, $.vue.global [i]);
	return app;
	}

$.vue.setup = function () {
	return {
		setup () {
			return $.vue ();
			},
		mounted () { setTimeout (function () { this.vue.app.ready = true; }.bind ({vue: this}), 3000) },
		template: `
			<app v-if="app.ready" class="css"/>
			<app:loading v-else/>
			`,
		}
	}

$.vue.app = reactive ({});
$.vue.app.ready = $.vue.reference (false);