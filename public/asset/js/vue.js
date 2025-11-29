var {createApp, ref, reactive} = Vue;
$.vue = function (data = {}) {
	return {vue: $.vue, app: $.vue.app, ... data}
	}

$.vue.create = function (context) {
	if (context) {}
	else context = $.vue.setup ();
	var app = createApp (context);
	for (var i in $.vue.markup) app = app.component (i, $.vue.markup [i]);
	return app;
	}

$.vue.reference = function (value) { return ref (value); }
$.vue.reactive = function (value) { return reactive (value); }
$.vue.component = function (key, value) { $.vue.markup [key] = value; }
$.vue.element = function (key, value) { $.vue.markup [key] = value; }
$.vue.layout = function (key, value) { $.vue.markup [$.vue.layout.key (key)] = value; }
$.vue.layout.key = function (layout) { return "layout:" + layout; }
$.vue.markup = {
	"theme:layout": {
		setup () {
			return $.vue ({src: $.vue.app.theme.layout});
			},
		template: `
			<component v-bind:is="vue.layout.key (src)"></component>
			`,
		},
	}

$.vue.setup = function () {
	return {
		setup () {
			if ($.vue.setup.context) $.vue.setup.context ()
			return $.vue ();
			},
		mounted () {
			setTimeout (function () { this.vue.app.ready = true; }.bind ({vue: this}), 123);
			},
		template: `
			<div v-if="app.ready" id="application">
				<theme:layout container/>
			</div>
			<div:loading v-else/>
			`,
		}
	}

$.vue.js = function (vue) {
	return {
		props: vue.prop || [],
		setup (prop) {
			if (vue.setup) {
				var data;
				if (data = vue.setup (prop)) return $.vue ({prop, ... data});
				}
			return $.vue ({prop});
			},
		mounted () {
			if (vue.mount) vue.mount (this);
			},
		methods: vue.method || {},
		template: vue.template || ``,
		}
	}

$.vue.meta = function () {}
$.vue.meta.get = function (meta) {
	for (var i in meta) {
		var element = document.querySelector ("meta[" + i + "='" + meta [i] + "']");
		if (element) return element.content;
		}
	}

$.vue.app = reactive ({});
$.vue.app.ready = $.vue.reference (false);

$.vue.mount = function () {}
$.vue.router = function () {}
$.vue.router.reload = function () { location.href = ""; }