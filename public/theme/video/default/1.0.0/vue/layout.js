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
	setup () {
		var oc = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
		return {oc}
		},
	mount () {
		vue.mount.main ()
		},
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
					<!--div v-if="null" class="flex align:item justify:item padding:vertical" phone>
						<div class="flex align:item gap" phone>
							<the-movie:nav />
							<the-tv:nav position="left: -75px;"/>
							<the-people:nav position="right"/>
						</div>
					</div-->
					<!--div class="flex">
						<div id="video-top-container" class="flex:grow" styles="max-width: 100%;">
							<video-card id="video-top" reference="video-top-container" item="item:sky"/>
						</div>
						<div class="flex flex:column gap padding:vertical padding:right" computer>
							<img:asset src="16x9.svg" height="165" class="border:radius"/>
							<img:asset src="16x9.svg" height="165" class="border:radius"/>
						</div>
						<div class="flex flex:column gap padding:vertical padding:right" phone>
							<img:asset src="16x9.svg" width="150" class="border:radius"/>
							<img:asset src="16x9.svg" width="150" class="border:radius"/>
							<img:asset src="16x9.svg" width="150" class="border:radius"/>
							<img:asset src="16x9.svg" width="150" class="border:radius"/>
						</div>
					</div-->
					<div class="flex">
						<div class="padding" style="width: 70%;">
							<div class="background-color:mono width:height">
								Hello World
							</div>
						</div>
						<div class="flex flex:column gap padding:vertical padding:right" style="width: 30%;">
							<a href="/"><img:ad src="referral-vultr-001.png" class="width:size border:radius"/></a>
							<a href="/"><img:ad src="referral-vultr-004.jpg" class="width:size border:radius"/></a>
						</div>
					</div>
					<div class="flex flex:wrap align:item justify:item gap padding">
						<a:genre v-for="genre in app.data.genre" v-bind:href="genre.permalink" v-bind:text="genre.name"/>
					</div>
					<video-card id="test" v-bind:data="app.data.tv.country.KR"/>
					<adsterra type="horizontal"/>
					<title-simple text="Title" icon="local_fire_department" class="padding-bottom:none"/>
					<video-card id="test-002" item="item:best"/>
					<adsterra type="horizontal"/>
					<title-simple text="Trending" icon="local_fire_department" class="padding-bottom:none"/>
					<video-card id="video-trending"/>
					<title-simple text="Popular" icon="local_fire_department" class="padding-bottom:none"/>
					<video-card id="video-popular"/>
					<!--div id="test-oc-container" class="relative">
						<div id="test-oc" class="owl-carousel owl-theme padding">
							<div v-for="oc in oc" class="owl-carousel-item">
								<div class="relative border:radius no-overflow">
									<img:asset src="3x4.svg" class=""/>
									<img:file src="movie-tron.webp" type="absolute"/>
								</div>
								<div>asd</div>
							</div>
						</div>
					</div-->
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

vue.component ("header-simple:float", {
	mount () {
		vue.mount.search ()
		},
	template: `
		<div id="header-simple" class="flex align:item gap header:size width:size fixed background-color:alpha box-shadow index:tiny" component="header-simple:float">
			<div class="padding:left" mobile>
				<button:material id="menu:toggle" icon="menu" class="icon:large padding-horizontal:small padding:vertical background:clear"/>
			</div>
			<div class="padding-left:small" computer></div>
			<logo-simple href="/"/>
			<div class="flex align:item justify:item flex:grow">
				<div class="flex align:item gap" computer>
					<the-movie:nav />
					<the-tv:nav />
					<the-people:nav />
				</div>
			</div>
			<div class="flex align:item gap:tiny padding:right">
				<button:material id="search-button" icon="search" class="icon:large padding:pop border-radius:pop"/>
				<notification-simple>
					<notification-simple:float />
				</notification-simple>
				<account-simple:anonymous>
					<account-simple:float />
				</account-simple:anonymous>
			</div>
		</div>
		<div id="search-form" class="flex align:item header:size width:size fixed padding:right background-color:alpha index:small" style="display: none">
			<input id="search-input" type="search" class="flex:grow header:size font:medium padding-left:medium border:none" placeholder="Search something ...">
			<button:material id="search-button-submit" icon="search" class="icon:large padding:pop border-radius:pop"/>
		</div>
		`,
	})

vue.component ("menu-simple", {
	setup () {
		var menu = {
			general: [
				{text: "Home", icon: "home", url: "/"},
				{text: "Short", icon: "subscriptions", url: php.router ({p: "short"})},
				{text: "Trending", icon: "local_fire_department", url: php.router ({p: "trending"})},
				{text: "Top Global", icon: "bolt", url: php.router ({p: "top_global"})},
				{text: "Editor Choice", icon: "editor_choice", url: php.router ({p: "editor-choice"})},
				{text: "Live", icon: "live_tv", url: php.router ({p: "live"})},
				],
			visitor: [
				{text: "History", icon: "search_activity", url: php.router ({p: "history"})},
				{text: "Watch Later", icon: "timer_play", url: php.router ("playlist:default")},
				{text: "Playlist", icon: "playlist_play", url: php.router ("playlist:index")},
				],
			explore: [
				{text: "Star", icon: "hotel_class", url: php.router ("people:index")},
				{text: "Movie", icon: "movie", url: php.router ("movie:index")},
				{text: "TV Show", icon: "tv_guide", url: php.router ("tv:index")},
				{text: "Photo", icon: "photo_camera", url: php.router ("photo:index")},
				],
			drama: [
				{text: "Korea", icon: "globe_asia", url: php.router ("country:by_type", {country: "korea", type: "tv"})},
				{text: "Japan", icon: "globe_asia", url: php.router ("country:by_type", {country: "japan", type: "tv"})},
				{text: "China", icon: "globe_asia", url: php.router ("country:by_type", {country: "china", type: "tv"})},
				],
			}
		return {menu}
		},
	mount () {
		vue.mount.menu ()
		},
	template: `
		<div id="menu-simple" class="menu:size flex flex:column box-shadow background:color" aria-modal="menu" style="scrollbar-width: thin; scrollbar-color: rgb(var(--background-color)) rgb(var(--background-color));">
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.general" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/>
			</div>
			<div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">YOU</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.visitor" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/>
			</div>
			<div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">EXPLORE</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.explore" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/>
			</div>
			<div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">DRAMA (ASIA)</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.drama" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/>
			</div>
		</div>
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
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */