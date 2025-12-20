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

vue.layout ("wrap", {
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
				<menu id="menu" class="nav-menu block relative index:small">
					<div outter>
						<menu-simple></menu-simple>
					</div>
				</menu>
				<main id="main" class="flex flex:column flexible:port wrap:container index">
					<route v-bind:src="vue.app.route" class="flex:grow"/>
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
				<menu id="menu" class="nav-menu block relative index:small">
					<div outter>
						<menu-simple></menu-simple>
					</div>
				</menu>
				<div class="flex flex:column flexible:port main:size">
					<main class="flex flex:grow gap padding">
						<video-src class="background-color:mono"/>
						<video-src:more computer/>
						<div class=" background-color:mono" computer>
							<div class="side:size">-</div>
						</div>
					</main>
					<!--main class="flex:grow">
						<video-src/>
					</main-->
					<footer id="footer" class="flex flex:column padding">
						<footer-simple />
						<footer-simple:info />
					</footer>
				</div>
			</main>
		</div>
		`,
	})

vue.layout ("people:single", {
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
				<menu id="menu" class="nav-menu block relative index:small">
					<div outter>
						<menu-simple></menu-simple>
					</div>
				</menu>
				<div class="flex flex:column main:size">
					<main class="flex flex:grow gap padding">
						<div class="flex flex:grow gap no-overflow">
							<div class="flexible background-color:mono">left</div>
							<div class="flex:grow" computer>right</div>
						</div>
						<div class="" computer>
							right
						</div>
					</main>
					<footer id="footer" class="flex flex:column padding">
						<footer-simple />
						<footer-simple:info />
					</footer>
				</div>
			</main>
		</div>
		`,
	})

vue.component ("video-src", {
	setup () {
		var v = vue.reactive ({click: false})
		var variable = vue.app.variable
		var video = variable.data
		if (video.type === "tv") {
			if (variable.season) video.season = video.season.select ({number: variable.season.integer ()})
			}
		return {variable, video, v}
		},
	method: {
		click () {
			if (this.v.click) {}
			else if (this.v.click = true) {
				$ ("#player-security").hide ()
				lib.element.show ("#player-loading")
				if (vue.app.config ["AD__.s"]) window.open (lib.AD__.link ["adsterra"])
				if (this.video.type === "tv") {
					if (this.variable.episode) {
						lib.video.src.tv (this.variable.data.identity, this.variable.season, this.variable.episode, {
							success (src) {
								$ ("#player-frame").attr ("src", src)
								lib.timeout (function () { lib.element.hide ("#player-loading") }, 5)
								},
							error () {
								// $ ("#player-frame").attr ("src", "about:blank")
								lib.timeout (function () { lib.element.hide ("#player-loading") }, 5)
								},
							})
						}
					else {
						var src = this.video.credit.video.trailer.one () ["embed:url"]
						$ ("#player-frame").attr ("src", src)
						lib.timeout (function () { lib.element.hide ("#player-loading") }, 5)
						}
					}
				else if (true) lib.video.src (this.variable.data.identity, {
					success (src) {
						$ ("#player-frame").attr ("src", src)
						lib.timeout (function () { lib.element.hide ("#player-loading") }, 5)
						},
					error () {
						// $ ("#player-frame").attr ("src", "about:blank")
						lib.timeout (function () { lib.element.hide ("#player-loading") }, 5)
						},
					})
				else {
					lib.timeout (function () {
						// var src = "about:blank"
						// $ ("#player-frame").attr ("src", src)
						lib.timeout (function () { lib.element.hide ("#player-loading") }, 5)
						}, 3)
					}
				}
			},
		},
	template: `
		<!--div class="flex gap padding"-->
			<div class="flex flex:column flex:grow gap no-overflow">
				<div id="player" class="relative no-overflow border:radius">
					<img:asset src="16x9.svg" class="width:size"/>
					<img:cover v-bind:src="video.poster.url" class="opacity:small transition:opacity"/>
					<div v-on:click="click (this)" id="player-security" class="flex align:item justify:item absolute top left width:height index:large">
						<div class="padding:big border-radius:circle">
							<icon src="play_circle" class="font:big" style="font-size: 64px; color: white;"/>
						</div>
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
					<div v-if="video.tagline" class="font:small font-color:mono">{{ video.tagline }}</div>
				</div>
				<div class="flex align:item gap">
					<div class="flex align:item gap">
						<img:avatar src="20002" class="img:pop border-radius:circle"/>
						<div class="flex flex:column">
							<string class="font:bold">Administrator</string>
							<string class="font:small font-color:mono">1M Subscriber's</string>
						</div>
					</div>
					<flex:grow />
					<div class="flex align:item gap padding:sky border-radius:round background-color:mono">
						<div class="flex align:item gap">
							<icon src="thumb_up" class="font:medium"/>
							<string>{{ lib.number.format (video.vote.count) }}</string>
						</div>
						<separator:small />
						<icon src="thumb_down" class="font:medium"/>
					</div>
					<div computer></div>
					<button:material icon="cloud_download" class="padding icon:large border-radius:pop" computer/>
					<button:material icon="more_vertical" class="padding icon:large border-radius:pop"></button:material>
				</div>
				<div class="flex align:item gap">
					<a:link v-for="genre in video.genre" v-bind:href="genre.permalink" class="font:small">{{ genre.name }}</a:link>
				</div>
				<div class="flex flex:column gap padding border:radius background-color:mono">
					<div class="flex align:item gap">
						<div class="flex align:item gap">
							<icon src="visibility"/>
							<string class="font-bold:pop">{{ lib.number.format ((1000).shuffle (2000)) }} View's</string>
						</div>
						<flex:grow mobile/>
						<div class="flex align:item gap">
							<icon src="calendar_clock"/>
							<string class="font-bold:pop">{{ video ["release_date:string"] }}</string>
						</div>
						<flex:grow computer/>
						<div class="flex align:item gap" computer>
							<circle:pop size="8" class="background-color:red-pop"/>
							<circle:pop size="8" class="background-color:green-pop"/>
							<circle:pop size="8" class="background-color:blue-pop"/>
							<circle:line size="8" class="background-color:yellow-pop"/>
						</div>
					</div>
					<string>
						{{ video.description }}
					</string>
					<div class="flex flex:wrap gap">
						<div class="flex gap padding border:radius box-shadow background:color">
							<div class="flex flex:column">
								<string class="font:large font-color:blue-pop text-align:right">{{ video.popularity }}</string>
								<string class="font:small">Popularity</string>
							</div>
							<separator:vertical />
							<div class="flex flex:column gap:tiny">
								<string class="font:large text-align:right">{{ lib.number.format (video.vote.count) }}</string>
								<string class="font:small">Vote Count</string>
							</div>
							<separator:vertical />
							<div class="flex flex:column gap:tiny">
								<string class="font:large text-align:right">{{ video.vote.average }}</string>
								<string class="font:small">Vote Average</string>
							</div>
						</div>
						<flex:grow/>
						<div class="flex gap padding border:radius box-shadow background:color">
							<div class="flex flex:column">
								<string class="font:large font-color:red-pop text-align:right">{{ lib.number.format (video.budget) }}</string>
								<string class="font:small">Budget</string>
							</div>
							<separator:vertical />
							<div class="flex flex:column gap:tiny">
								<string class="font:large font-color:green-pop text-align:right">{{ lib.number.format (video.revenue) }}</string>
								<string class="font:small">Revenue</string>
							</div>
						</div>
					</div>
				</div>
				<div class="padding:bottom scroll:horizontal border:radius no-overflow">
					<div class="flex gap">
						<div v-for="cast in video.credit.people.cast.limit (20)" class="flex flex:column gap">
							<div class="relative border:radius no-overflow">
								<img:asset src="tmdb.svg" width="164"/>
								<a v-bind:href="cast.permalink"><img:cover v-bind:src="cast.poster.url" class="opacity:small transition:opacity index"/></a>
							</div>
							<div class="flex flex:column gap:tiny">
								<a v-bind:href="cast.permalink" class="font:bold" string>{{ cast.name }}</a>
								<string class="font:small">{{ cast.character }}</string>
							</div>
						</div>
					</div>
				</div>
				<div v-if="video.season.length && ! video.episode.length" class="flex flex:column gap">
					<div v-for="season in video.season" class="flex flex:column gap border:radius background-color:mono no-overflow">
						<div class="flex gap">
							<div class="relative border:radius">
								<img:asset src="tmdb.svg" v-bind:width="vue.device.if_else (144, 96)"/>
								<a:link v-bind:href="vue.router ('tv:season', {id: video.id, name: video.slug, season: season.number})"><img:cover v-bind:src="season.poster.url" class="opacity:small transition:opacity"/></a:link>
							</div>
							<div class="flex flex:column gap:small padding">
								<a:link v-bind:href="'/'" class="font:medium font-bold:pop" string>{{ season.name }}</a:link>
								<div class="flex align:item gap"><icon src="thumb_up"/><string>{{ season.vote.average }}</string></div>
								<div class="flex align:item gap"><icon src="calendar_clock"/><string>{{ season.date.string }}</string></div>
								<div class="flex align:item gap"><b>{{ season.episode.count }}</b> Episode's</div>
								<flex:grow computer/>
								<string class="font:small" computer>{{ season.description || video.description }}</string>
							</div>
						</div>
						<string class="font:small padding padding-top:none" mobile>{{ season.description || video.description }}</string>
					</div>
				</div>
				<div v-if="video.episode.length" class="flex flex:wrap gap" style="justify-content: space-between" computer>
					<div v-for="episode in video.episode" class="flex gap border:radius background-color:mono no-overflow" style="width: 30%">
						<div class="relative border:radius">
							<img:asset src="tmdb.svg" v-bind:width="vue.device.if_else (64, 64)"/>
							<a:link v-bind:href="vue.router ('tv:season-episode', {id: video.id, name: video.slug, season: variable.season, episode: episode.number})"><img:cover v-bind:src="episode.poster.url" class="opacity:small transition:opacity"/></a:link>
						</div>
						<div class="flex flex:column gap:small padding:vertical">
							<a:link v-bind:href="vue.router ('tv:season-episode', {id: video.id, name: video.slug, season: variable.season, episode: episode.number})" class="font-bold:pop" string>{{ episode.name }}</a:link>
							<flex:grow/>
							<div class="flex align:item gap font:small"><icon src="thumb_up"/><string>{{ episode.vote.average }}</string></div>
							<div class="flex align:item gap font:small"><icon src="calendar_clock"/><string>{{ episode.date.string }}</string></div>
						</div>
					</div>
				</div>
				<div v-if="video.episode.length" class="flex flex:column gap" mobile>
					<div v-for="episode in video.episode" class="flex gap border:radius background-color:mono no-overflow">
						<div class="relative border:radius">
							<img:asset src="tmdb.svg" v-bind:width="vue.device.if_else (64, 64)"/>
							<a:link v-bind:href="vue.router ('tv:season-episode', {id: video.id, name: video.slug, season: variable.season, episode: episode.number})"><img:cover v-bind:src="episode.poster.url" class="opacity:small transition:opacity"/></a:link>
						</div>
						<div class="flex flex:column gap:small padding:vertical">
							<a:link v-bind:href="vue.router ('tv:season-episode', {id: video.id, name: video.slug, season: variable.season, episode: episode.number})" class="font-bold:pop" string>{{ episode.name }}</a:link>
							<flex:grow/>
							<div class="flex align:item gap font:small"><icon src="thumb_up"/><string>{{ episode.vote.average }}</string></div>
							<div class="flex align:item gap font:small"><icon src="calendar_clock"/><string>{{ episode.date.string }}</string></div>
						</div>
					</div>
				</div>
				<div class="">
					<adsterra type="horizontal"/>
				</div>
			</div>
			<!--div class="" computer>
				<div class="side:size">
					-
				</div>
			</div>
		</div-->
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