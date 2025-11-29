$.vue.component ("app", {
	setup () {
		return $.vue ()
		},
	template: `
		<div id="application">
			<layout slot/>
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

$.vue.component ("layout", {
	setup () {
		return $.vue ({src: "test"})
		},
	template: `
		<component v-bind:is="vue.layout.key (src)"></component>
		`,
	})

$.vue.layout ("test", {
	setup () {
		return $.vue ()
		},
	template: `
		<div layout="test">layout test</div>
		`,
	})