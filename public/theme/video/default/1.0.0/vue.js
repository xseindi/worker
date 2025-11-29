$.vue.setup.context = function () {}

$.vue.app.var = $$$.var
$.vue.app.theme = $$$.theme
$.vue.app.router = $$$.router
$.vue.app.image = $$$.image
$.vue.app.var ["site:name"] = $.vue.meta.get ({property: "og:site_name"})
$.vue.app.var ["site:description"] = $.vue.meta.get ({property: "og:site_description"})

$.vue.mount.search = function () {
	if ($.vue.mount.search.loaded) {}
	else if ($.vue.mount.search.loaded = true) {
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

$.app = $.vue.create ()
$.app.mount ("#app")

//