var {createApp, ref, reactive} = Vue;
function vue (data = {}) {
	return {vue, app: vue.app, php, google: php.google, ... data}
	}

vue.create = function (context) {
	var app = createApp (context || vue.setup);
	for (var i in vue.markup) app = app.component (i, vue.markup [i]);
	return app;
	}

vue.js = function (v) {
	return {
		props: (v.prop ? [... v.prop, "param"] : ["param"]) || ["param"],
		setup (prop) {
			if (prop.param) {
				for (var i in prop.param) prop [i] = prop.param [i];
				delete prop.param;
				}
			if (v.setup) {
				var data;
				if (data = v.setup (prop)) return vue ({prop, ... data});
				}
			return vue ({prop});
			},
		mounted () {
			if (v.mount) v.mount (this);
			},
		methods: v.method || {},
		template: v.template || ``,
		}
	}

vue.reference = function (value) { return ref (value); }
vue.reactive = function (value) { return reactive (value); }
vue.router = function () {}
vue.router.reload = function () { location.reload (); }
vue.router.link = function (key, value = {}, query = {}) {
	var router, param = [];
	if (typeof key === "string") router = vue.app.router [key];
	else for (var i in key) router = vue.app.router [i][key [i]];
	for (var i in value) router = router.split (":" + i).join (value [i]);
	for (var i in query) param.push (`${i}=${query [i]}`);
	if (param.length) router = router + "?" + param.join ("&");
	return router;
	}

vue.component = function (key, value) { vue.markup [key] = value; }
vue.element = function (key, value) { vue.markup [key] = value; }
vue.layout = function (key, value) { vue.markup [vue.layout.key (key)] = value; }
vue.layout.key = function (layout) { return "layout:" + layout; }
vue.markup = {
	"theme:layout": vue.js ({
		setup () {
			return {src: vue.app.theme.layout}
			},
		template: `
			<component v-bind:is="vue.layout.key (src)"></component>
			`,
		}),
	}

vue.setup = vue.js ({
	mount (vue) {
		setTimeout (function () { this.vue.app.ready = true; }.bind ({vue}), 3000);
		},
	template: `
		<div v-if="app.ready" id="application">
			<theme:layout container/>
		</div>
		<loading v-else/>
		`,
	})

vue.mount = function () {}

vue.app = reactive ({});
vue.app.ready = vue.reference (false);