/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.sleep = 0.123

vue.mount = function (v) {
	if (vue.mount.layout) {
		if (vue.mount.layout.loaded) {}
		else if (vue.mount.layout.loaded = true) vue.mount.layout ()
		}
	}

vue.mount.layout = function () {
	php.body.css (function (type, orientation) {
		if (php.device.computer ()) $ ("#menu").css ("display", "flex");
		if (php.device.phone ()) $ ("#menu").css ("display", "none");
		})
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

$.app = vue.create (`
	<div v-if="vue.ready.value" id="application">
		<theme:layout container/>
	</div>
	<loading:spinner v-else/>
	`)

$.app.mount ("#app")

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */