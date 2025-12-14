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
var lib = Function.export;

function vue (data = {}) {
	return {vue, lib, ... data}
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
			if (v.type === "router") if (vue.mount.router) vue.mount.router (this);
			},
		methods: v.method || {},
		template: v.template || ``,
		}
	}

vue.start = function () {
	lib.timeout (function () { vue.ready.value = true; }, (vue.sleep || 0.1));
	}

vue.reactive = function (value = {}) { return reactive (value); }
vue.reference = function (value = null) { return ref (value); }
vue.route = function (key, value) { vue.markup ["route:" + key] = vue.js ({type: "route", ... value}); }
vue.router = function (key, value = {}, query = {}) { return lib.router (key, value, query); }
vue.router.link = function (client, router) { return lib.router.link (client, router); }
vue.router.files = function (file) { return lib.router.files (vue.app (), file); }
vue.component = function (key, value) { vue.markup [key] = vue.js ({type: "component", ... value}); }
vue.element = function (key, value) { vue.markup [key] = vue.js ({type: "element", ... value}); }
vue.layout = function (key, value) { vue.markup [vue.layout.key (key)] = vue.js ({type: "layout", ... value}); }
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

vue.var ("device:computer", true)
vue.var ("device:mobile", false)
vue.var ("device:tablet", false)
vue.var ("device:phone", false)

vue.device = function () {}
vue.device.computer = function (value) { return vue.var ("device:computer", value) }
vue.device.mobile = function (value) { return vue.var ("device:mobile", value) }
vue.device.tablet = function (value) { return vue.var ("device:tablet", value) }
vue.device.phone = function (value) { return vue.var ("device:phone", value) }

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.app = function () { return (vue.app.reference || vue.app.id); }
vue.app.var = vue.reactive ();
vue.app.data = vue.reactive ({
	genre: [],
	movie: {trending: [], popular: [], top_rated: [], now_playing: [], up_coming: [], country: {KR: [], JP: [], CN: []}},
	tv: {trending: [], popular: [], top_rated: [], airing_today: [], up_coming: [], country: {KR: [], JP: [], CN: []}},
	asia: {all: [], KR: [], JP: [], CN: []},
	});

lib.event.on ("load", function () {
	if (vue.app.config ["AD__.s"]) lib.AD__.detect ();
	});

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */