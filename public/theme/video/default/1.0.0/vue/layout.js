/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.layout ("default", {
	template: `
		<div layout="default">Hello World</div>
		`,
	})

vue.layout ("index", {
	template: `
		<div layout="index" class="flex flex:column height:size">
			<header id="header" class="header:size relative index:large">
				<header-simple:float></header-simple:float>
			</header>
			<main class="flex flex:grow index">
				<menu id="menu" class="block relative index:small">
					<div outter>
						<menu-simple></menu-simple>
						<div class="menu:size" computer></div>
					</div>
				</menu>
				<main id="main" class="flex flex:column flex:grow index">
					<route v-bind:src="vue.app.route" class="flex:grow"/>
					<div class="flex align:item justify:item padding:big">
						<!--img:undraw src="construction_worker" class="" width="280"/-->
					</div>
					<footer id="footer" class="flex flex:column padding">
						<footer-simple />
						<footer-simple:info />
					</footer>
				</main>
			</main>
		</div>
		`,
	})

vue.layout ("wide", {
	setup () {
		var variable = vue.app.variable
		return {variable}
		},
	template: `
		<div layout="index" class="flex flex:column height:size">
			<header id="header" class="header:size relative index:large">
				<header-simple:float></header-simple:float>
			</header>
			<main class="flex flex:grow justify:item index">
				<div v-if="vue.device.computer ()" style="width: 1100px;">
					<video-src/>
				</div>
				<div v-else>
					<video-src/>
				</div>
			</main>
			<footer id="footer" class="flex flex:column padding">
				<footer-simple />
				<footer-simple:info />
			</footer>
		</div>
		`,
	})

vue.component ("video-src", {
	setup () {
		var v = vue.reactive ({click: false})
		var variable = vue.app.variable
		return {variable, video: variable.data, v}
		},
	method: {
		click () {
			if (this.v.click) {}
			else if (this.v.click = true) {
				$ ("#player-security").hide ()
				$ ("#player-loading").removeClass ("none").addClass ("flex")
				window.open (lib.AD__.link ["adsterra"])
				if (true) video_src (this.variable.data.id, function (src) {
					$ ("#player-frame").attr ("src", src)
					$ ("#player-loading").removeClass ("flex").addClass ("none")
					})
				else {
					lib.timeout (function () {
						var src = "https://www.youtube.com/embed/-b9o3uUKpO0?si=UTzgNDDpNi17Vgs5"
						$ ("#player-frame").attr ("src", src)
						$ ("#player-loading").removeClass ("flex").addClass ("none")
						}, 3)
					}
				}
			},
		},
	template: `
		<div class="flex gap padding">
			<div class="flex flex:column flex:grow gap">
				<div id="player" class="relative no-overflow border:radius">
					<img:asset src="16x9.svg" class="width:size"/>
					<img:cover v-bind:src="video.poster.url" class="opacity:small transition:opacity"/>
					<div v-on:click="click (this)" id="player-security" class="flex align:item justify:item absolute top left width:height index:large">
						<!--icon src="home" class="font:big"/-->
					</div>
					<div class="absolute top left width:height index">
						<video:frame id="player-frame" src="about:blank"/>
					</div>
					<div id="player-loading" class="none align:item justify:item absolute top left width:height index:small" style="background-color: rgba(var(--black),0.75);">
						<img:spinner class="size:big"/>
					</div>
				</div>
				<div class="flex flex:column">
					<div class="font:medium font-bold:pop">{{ video.title }}</div>
					<div v-if="video.tagline" class="font:small">{{ video.tagline }}</div>
				</div>
				<div class="flex align:item gap">
					<div class="flex align:item gap" computer>
						<img:logo v-bind:src="vue.app.image.logo" class="img:pop"/>
						<div class="flex flex:column">
							<string class="font:bold">Administrator</string>
							<string class="font:small">1M Subscriber's</string>
						</div>
					</div>
					<flex:grow />
					<div class="flex align:item gap">
						<div class="flex align:item gap">
							<icon src="visibility" class="font:medium"/>
							<string>99K</string>
						</div>
						<div class="flex align:item gap">
							<icon src="favorite" class="font:medium"/>
							<string>99K</string>
						</div>
					</div>
					<div></div>
					<button:material icon="cloud_download" class="padding icon:large"></button:material>
					<button:material icon="more_vertical" class="padding icon:large"></button:material>
				</div>
				<div>
					<pre class="none">{{ variable }}</pre>
				</div>
			</div>
			<div class="" computer>
				<div class="background-color:red" style="width: 300px;">
					X
				</div>
			</div>
		</div>
		`,
	})

vue.element ("video:frame", {
	template: `
		<iframe class="player width:height" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;" allowfullscreen></iframe>
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

vue.layout (404, {
	template: `
		<div layout="404">not found</div>
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
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */