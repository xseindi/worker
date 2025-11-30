/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.setup = vue.js ({
	mount (vue) {
		setTimeout (function () { this.vue.app.ready = true; }.bind ({vue}), 123);
		},
	template: `
		<div v-if="app.ready" id="application">
			<theme:layout container/>
		</div>
		<loading:spinner v-else/>
		`,
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.app.theme = $$$.theme
vue.app.router = $$$.router
vue.app.image = $$$.image
vue.app.var = $$$.var
vue.app.var ["site:name"] = $.meta.get ({property: "og:site_name"})
vue.app.var ["site:description"] = $.meta.get ({property: "og:site_description"})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.mount.layout = function () {
	php.body.css (function (type, orientation) {
		if (type === "computer") $ ("#menu").css ("display", "flex");
		if (type === "phone") $ ("#menu").css ("display", "none");
		})
	}

vue.mount.search = function () {
	if (vue.mount.search.loaded) {}
	else if (vue.mount.search.loaded = true) {
		$ ("#search-button").click (function () {
			var search_form = $ ("#search-form")
			var search_input = $ ("#search-input")
			var search_button_submit = $ ("#search-button-submit")
			search_form.css ("display", "flex")
			search_button_submit.click (function () {
				console.log (123)
				})
			search_input.focus ().blur (function () {
				setTimeout (function () { $ ("#search-form").css ("display", "none") }, 123)
				})
			})
		}
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

$ (document).ready (function () {
	return true
	})

$ (window).on ("resize", function () {
	vue.mount.layout ()
	})

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

$.app = vue.create ()
$.app.mount ("#app")

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */