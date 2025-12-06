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
		var test = [
			{component: "block", css: "bacot", data: [{component: "a:material", text: "asd", css: ""}]},
			]
		return {test}
		},
	template: `
		<div layout="index" class="flex flex:column height:size">
			<header id="header" class="header:size relative index:large">
				<header-simple:float></header-simple:float>
			</header>
			<main class="flex flex:grow index">
				<menu id="menu" class="block relative">
					<div outter>
						<menu-simple></menu-simple>
					</div>
				</menu>
				<main id="main" class="flex flex:column flex:grow">
					<div v-if="null" class="flex align:item justify:item padding:vertical" phone>
						<div class="flex align:item gap" phone>
							<the-movie:nav />
							<the-tv:nav position="left: -75px;"/>
							<the-people:nav position="right"/>
						</div>
					</div>
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
			<div class="padding:left" phone>
				<button:material id="menu-button" icon="menu" class="icon:large padding-horizontal:small padding:vertical background:clear"/>
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
				{text: "Korea", icon: "globe_asia", url: php.router ("country", {country: "korea"}, {type: "tv"})},
				{text: "Japan", icon: "globe_asia", url: php.router ("country", {country: "japan"}, {type: "tv"})},
				{text: "China", icon: "globe_asia", url: php.router ("country", {country: "china"}, {type: "tv"})},
				],
			}
		return {menu}
		},
	template: `
		<div id="menu-simple" class="menu:size flex flex:column box-shadow background:color">
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.general" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:pop border-radius:pop"/>
			</div>
			<div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">YOU</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.visitor" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:pop border-radius:pop"/>
			</div>
			<div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">EXPLORE</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.explore" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:pop border-radius:pop"/>
			</div>
			<div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">DRAMA (ASIA)</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.drama" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:pop border-radius:pop"/>
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