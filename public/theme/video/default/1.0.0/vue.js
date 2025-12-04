/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.sleep = 0.1

/*
vue.start = function () {
	if (localStorage.getItem (php.google.auth.client.credential)) {
		vue.ready.value = true
		}
	else {
		var data = {g_auth: php.google.auth.profile}
		php.ajax.post ("/test", data, {
			success: function (response) {
				if (response.success) localStorage.setItem (php.google.auth.client.credential, php.google.auth.credential)
				vue.ready.value = true
				console.log ("post:response", response)
				},
			error: function (error) {
				vue.ready.value = true
				console.error ("error", error)
				},
			})
		}
	}
*/

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

php.on ("google:auth sign-in", function () {
	vue.loading.google_auth_sign_in = true
	})

php.on ("google:auth sign-in:done", function () {
	vue.loading.google_auth_sign_in_done = true
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