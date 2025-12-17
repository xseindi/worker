/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.dummy.movie_count = "1M +"
vue.dummy.movie_trending_count = "10K"
vue.dummy.movie_top_rated_count = "10K +"
vue.dummy.movie_now_playing_count = "5K +"
vue.dummy.movie_up_coming_count = "99 +"
vue.dummy.movie_editor_choice_count = "—"
vue.dummy.tv_count = "200K +"
vue.dummy.tv_trending_count = "10K"
vue.dummy.tv_top_rated_count = "2K +"
vue.dummy.tv_airing_today_count = "99 +"
vue.dummy.tv_up_coming_count = "99 +"
vue.dummy.tv_editor_choice_count = "—"
vue.dummy.star_count = "1K +"
vue.dummy.star_male_count = "99 +"
vue.dummy.star_female_count = "99 +"
vue.dummy.star_editor_choice_count = "—"

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

lib.event.on ("body:css", function (type, orientation) {
	if (lib.device.computer ()) {
		$ ("#menu").css ("display", "block").removeClass ("box-shadow")
		$ ("#menu [aria-modal='menu']").removeClass ("box-shadow")
		vue.device.computer (true)
		vue.device.mobile (false)
		vue.device.tablet (false)
		vue.device.phone (false)
		}
	else {
		$ ("#menu").css ("display", "none")
		$ ("#menu [aria-modal='menu']").addClass ("box-shadow")
		vue.device.computer (false)
		vue.device.mobile (true)
		vue.device.tablet (lib.device.tablet ())
		vue.device.phone (lib.device.phone ())
		}
	})

lib.event.on ("google:auth sign-in", function () { vue.loading.google_auth_sign_in = true })
lib.event.on ("google:auth sign-in:done", function () { vue.loading.google_auth_sign_in_done = true })

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
	lib.body.css ()
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
			search_input.on ("keydown", function (e) {
				if (e.key === "Enter" || e.key === 13) {
					location.href = vue.router ("search", {}, {query: search_input.val ()})
					e.preventDefault ()
					}
				})
			search_button_submit.click (function () {
				location.href = vue.router ("search", {}, {query: search_input.val ()})
				})
			search_input.focus ().blur (function () {
				lib.timeout (function () { $ ("#search-form").css ("display", "none") }, 0.123)
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
	lib.body.css ()
	})

$ (document).click (function (event) {
	var toggle = $ ("[id='menu:toggle']")
	var menu = $ ("#menu")
	var modal = $ ("[aria-modal='menu']")
	if (vue.device.mobile ()) {
		if (modal.is (event.target) || modal.has (event.target).length) {}
		else {
			if (toggle.is (event.target) || toggle.has (event.target).length) {}
			else menu.css ("display", "none")
			}
		}
	})

$ (window).on ("resize", function (event) {
	lib.body.css ()
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

function video_src (id, context) {
	//7451
	// https://vidsrc.icu/embed/movie/7451
	var url = ("https://vidsrcme.vidsrc.icu/embed/movie?tmdb={id}&autoplay=0&ds_lang=en").split ("{id}").join (id)
	lib.ajax.get (url, {
		success: function (response) {
			var skip = "https:" + response.after ('<iframe id="player_iframe" src="').before ('"')
			lib.ajax.get (skip, {
				success: function (response) {
					var c_url = "https://cloudnestra.com" + response.after ("id: 'player_iframe'").after ("src: '").before ("'")
					context (c_url)
					},
				})
			},
		})
	}