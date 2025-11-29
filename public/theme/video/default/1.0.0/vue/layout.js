$.vue.layout ("default", {
	setup () {
		return $.vue ()
		},
	template: `
		<div layout="default">layout:default</div>
		`,
	})

$.vue.layout ("index", {
	setup () {
		return $.vue ()
		},
	mounted () {
		$.action.body.css ();
		},
	template: `
		<div layout="index" class="flex flex:column height:size">
			<header id="header" class="header:size relative">
				<header:float />
			</header>
			<main class="flex flex:grow">
				<menu id="menu">
					menu
				</menu>
				<main id="main" class="flex flex:column flex:grow">
					main
					<div><img:undraw src="cloud" class="img:big"/></div>
					<img width="1" height="750">
				</main>
			</main>
			<footer id="footer">
				footer
			</footer>
		</div>
		`,
	})

$.vue.layout (404, {
	setup () {
		return $.vue ()
		},
	template: `
		<div layout="404">not found</div>
		`,
	})

$.vue.layout ("test", {
	setup () {
		return $.vue ()
		},
	template: `
		<div layout="test"><slot name="default"/></div>
		`,
	})