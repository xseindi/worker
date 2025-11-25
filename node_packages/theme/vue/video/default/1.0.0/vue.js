$.vue.component ("app", {
	setup () {
		return $.vue ()
		},
	template: `
		<div id="application">
			{{ theme }} {{ app }}
		</div>
		`,
	})

$.vue.component ("app:loading", {
	setup () {
		return $.vue ()
		},
	template: `
		<div id="loading">loading ...</div>
		`,
	})

$.app = $.vue.create ();

$.app.mount ("#app");

//