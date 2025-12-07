/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.var ["device:computer"] = true
vue.var ["device:phone"] = false

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.start = function () {
	vue.ready.value = true
	}

vue.mount = function (v) {
	//
	}

php.on ("body:css", function (type, orientation) {
	if (php.device.computer ()) {
		$ ("#menu").css ("display", "block").removeClass ("box-shadow")
		$ ("#menu [aria-modal='menu']").removeClass ("box-shadow")
		vue.var ["device:computer"] = true
		vue.var ["device:phone"] = false
		}
	if (php.device.phone ()) {
		$ ("#menu").css ("display", "none")
		$ ("#menu [aria-modal='menu']").addClass ("box-shadow")
		vue.var ["device:computer"] = false
		vue.var ["device:phone"] = true
		}
	})

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

vue.mount.layout = function () {
	php.body.css ()
	}

vue.mount.main = function () {
	if (vue.mount.main.loaded) {}
	else if (vue.mount.main.loaded = true) {
		//
		}
	}

vue.mount.menu = function () {
	if (vue.mount.menu.loaded) {}
	else if (vue.mount.menu.loaded = true) {
		var toggle = $ ("[id='menu:toggle']")
		var menu = $ ("#menu")
		toggle.click (function () {
			menu.css ("display", "block")
			})
		}
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
	php.body.css ()
	})

$ (window).on ("resize", function (event) {
	php.body.css (null)
	// if (php.body.width === $ ("body").width ()) {}
	// else location.reload ()
	})

$ (document).click (function (event) {
	// if ($ ("body").hasClass ("phone")) {
		// if ($ (event.target).is ("[id='menu:toggle']") || $ (event.target).is ("[id='menu:toggle'] *")) $ ("#menu").css ("display", "flex");
		// else if ($ ('#menu').css ('display') === 'flex') if (!$ (event.target).is ('.phone #menu *')) $ ('#menu').css ('display', 'none');
		// }
	var toggle = $ ("[id='menu:toggle']")
	var menu = $ ("#menu")
	var modal = $ ("[aria-modal='menu']")
	if (vue.var ["device:phone"]) {
		if (modal.is (event.target) || modal.has (event.target).length) {}
		else {
			if (toggle.is (event.target) || toggle.has (event.target).length) {}
			else menu.css ("display", "none")
			}
		}
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