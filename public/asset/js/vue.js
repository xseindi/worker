/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

var {createApp, ref, reactive} = Vue;

function vue (data = {}) {
	return {vue, php, app: php.app, google: php.google, ... data}
	}

vue.create = function (context) {
	var app;
	if (context) if (typeof context === "string") app = createApp (vue.js ({
		mount (v) {
			vue.start ()
			},
		template: context,
		}));
	if (app === undefined) app = createApp (vue.js ({
		mount (v) {
			vue.start ()
			},
		template: `
			<div v-if="vue.ready" id="application">
				<theme:layout container/>
			</div>
			<loading v-else/>
			`,
		}));
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
			if (vue.mount) vue.mount (this);
			if (v.mount) v.mount (this);
			if (v.type === "layout") if (vue.mount.layout) vue.mount.layout (this);
			if (v.type === "component") if (vue.mount.component) vue.mount.component (this);
			if (v.type === "element") if (vue.mount.element) vue.mount.element (this);
			},
		methods: v.method || {},
		template: v.template || ``,
		}
	}

vue.start = function () {
	php.sleep (function () { vue.ready.value = true; }, (vue.sleep || 0.1));
	}

vue.reactive = function (value = {}) { return reactive (value); }
vue.reference = function (value = null) { return ref (value); }
vue.component = function (key, value) { vue.markup [key] = vue.js ({type: "component", ... value}); }
vue.element = function (key, value) { vue.markup [key] = vue.js ({type: "element", ... value}); }
vue.layout = function (key, value) { vue.markup [vue.layout.key (key)] = vue.js ({type: "layout", ... value}); }
vue.layout.key = function (layout) { return "layout:" + layout; }
vue.markup = {
	"theme:layout": vue.js ({
		setup () {
			return {src: php.app.theme.layout}
			},
		template: `
			<component v-bind:is="vue.layout.key (src)"></component>
			`,
		}),
	}

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.var = function (key, value) { if (value === undefined) return vue.variable [key]; else return vue.variable [key] = value; }
vue.variable = vue.reactive ();
vue.loading = vue.reactive ();
vue.ready = vue.reference (false);

vue.var ("is:computer", true)
vue.var ("is:mobile", false)
vue.var ("is:tablet", false)
vue.var ("is:phone", false)

vue.is_computer = vue ["is:computer"] = function (value) { return vue.var ("is:computer", value) }
vue.is_mobile = vue ["is:mobile"] = function (value) { return vue.var ("is:mobile", value) }
vue.is_tablet = vue ["is:tablet"] = function (value) { return vue.var ("is:tablet", value) }
vue.is_phone = vue ["is:phone"] = function (value) { return vue.var ("is:phone", value) }

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */