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
					<div class="flex gap padding" computer>
						<div class="flex flex:column gap">
							<video-card:poster v-bind:data="app.data.asia.all"/>
							<video-card:poster v-bind:data="app.data.asia.all"/>
						</div>
						<div class="flex flex:column flex:grow gap padding:large border:radius box-shadow background-color">
							<div class="flex align:item gap font:large">
								<div class="border-radius:circle background-color:red-pop" style="width: 8px; height: 8px;"></div>
								<div class="border-radius:circle background-color:green-pop" style="width: 8px; height: 8px;"></div>
								<div class="border-radius:circle background-color:blue-pop" style="width: 8px; height: 8px;"></div>
								<div class="flex:grow"></div>
								<div class="border-radius:circle background-color:yellow-pop" style="width: 8px; height: 8px;"></div>
								<!--string class="font-family:logo font:bold text:gradient">Welcome ... !!!</string-->
								<!--icon src="military_tech"/-->
							</div>
							<div class="flex flex:grow align:item justify:item"><img:undraw src="designer" height="150" class=""/></div>
							<div class="">
								<separator:mono/>
							</div>
							<div class="font:large font-bold:pop">Million's of Movie's, TV Show's and People to discover.</div>
							<div class="flex align:item gap font:big">
								<icon src="play_circle" class="text:gradient"/>
								<string>Explore now.</string>
							</div>
						</div>
						<!---->
						<!--div class="flex flex:column gap" style="width: 375px;">
							<div class="flex align:item gap font:large font:bold" style="margin-bottom: -5px;">
								<icon src="play_circle"/>
								<string>Must Watch</string>
							</div>
							<video-card:vertical v-bind:data="app.data.trending.week"/>
						</div-->
					</div>
					<div class="padding background-color:mono-pop" mobile>
						<div class="flex flex:column flex:grow gap padding:large border:radius box-shadow background-color">
							<div class="flex align:item font:large">
								<string class="font-family:logo font:bold text:gradient">Welcome ... !!!</string>
								<div class="flex:grow"></div>
								<icon src="military_tech"/>
							</div>
							<div class="flex flex:grow align:item justify:item"><img:undraw src="designer" height="150" class=""/></div>
							<div class="">
								<separator:mono/>
							</div>
							<div class="font:intermediate font-bold:pop">Million's of Movie's, TV Show's, People to discover.</div>
							<div class="flex align:item gap font:large">
								<icon src="play_circle" class="text:gradient"/>
								<string>Explore now.</string>
							</div>
						</div>
					</div>
					<div class="flex flex:wrap align:item justify:item gap padding">
						<a:genre v-for="genre in app.data.genre" v-bind:href="genre.permalink" v-bind:text="genre.name"/>
					</div>
					<title-simple text="Trending" icon="local_fire_department" class="padding-bottom:none">
						<div class="flex align:item gap font:intermediate font:bold" computer>
							<a class="font:static" string>Today</a>
							<icon src="toggle_off"/>
							<a class="font:static" string>This Week</a>
						</div>
					</title-simple>
					<video-card id="video-trending" v-bind:data="app.data.trending.today"/>
					<adsterra type="horizontal"/>
					<title-simple text="Must Watch" icon="local_fire_department" class="padding-bottom:none"/>
						<video-card id="video-mw" item="item:best" v-bind:option="{shuffle: true}"/>
							<adsterra type="horizontal"/>
					<title-simple text="Movie" icon="movie" class="padding-bottom:none"/>
						<video-card id="video-movie" v-bind:data="app.data.movie.popular"/>
							<adsterra type="horizontal"/>
					<title-simple text="TV Show" icon="tv_guide" class="padding-bottom:none"/>
						<video-card id="video-tv" v-bind:data="app.data.tv.popular" v-bind:option="{icon: 'tv_guide'}"/>
							<adsterra type="horizontal"/>
					<title-simple text="South Korea" icon="globe" class="padding-bottom:none">
						-
					</title-simple>
					<video-card id="video-asia-KR" v-bind:data="app.data.asia.KR"/>
					<title-simple text="Japan" icon="globe" class="padding-bottom:none">
						-
					</title-simple>
					<video-card id="video-asia-JP" v-bind:data="app.data.asia.JP"/>
					<title-simple text="China" icon="globe" class="padding-bottom:none">
						-
					</title-simple>
					<video-card id="video-asia-CN" v-bind:data="app.data.asia.CN"/>
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