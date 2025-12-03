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
			php.sleep (function () { vue.ready.value = true; }, 3);
			},
		template: context,
		}));
	if (app === undefined) app = createApp (vue.js ({
		mount (v) {
			php.sleep (function () { vue.ready.value = true; }, 3);
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
			},
		methods: v.method || {},
		template: v.template || ``,
		}
	}

vue.reactive = function (value = {}) { return reactive (value); }
vue.reference = function (value = null) { return ref (value); }
vue.ready = vue.reference (false);
vue.component = function (key, value) { vue.markup [key] = value; }
vue.element = function (key, value) { vue.markup [key] = value; }
vue.layout = function (key, value) { vue.markup [vue.layout.key (key)] = value; }
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

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */