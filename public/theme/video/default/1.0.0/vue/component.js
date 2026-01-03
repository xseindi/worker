/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.component ("route", {
	prop: ["src"],
	setup () {},
	template: `
		<component v-bind:is="'route:' + prop.src"/>
		`,
	})

vue.component ("for:each", {
	prop: ["component"],
	setup () {},
	template: `
		<component v-for="data in prop.component" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
		`,
	})

vue.component ("block", {
	prop: ["component"],
	setup () {},
	template: `
		<div>
			<component v-for="data in prop.component" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
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

vue.component ("loading", {
	template: `
		<div id="loading" class="viewport fixed flex align:item justify:item background:color">
			Loading ...
		</div>
		`,
	})

vue.component ("loading:spinner", {
	template: `
		<div id="loading" class="viewport fixed flex align:item justify:item background:color">
			<img:spinner class="size:large"/>
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

vue.component ("header-simple", {
	template: ``,
	})

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
					<the-genre:nav />
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
		var css = "padding:io border:radius icon:medium"
		var sub_css = "padding:io padding-left:big border:radius font:small --mobile"
		var menu = {
			general: [
				{component: "a:material", text: "Home", icon: "home", url: "/", css},
				{component: "a:material", text: "Short", icon: "subscription", url: vue.router ({p: "short"}), css},
				{component: "a:material", text: "Trending", icon: "local_fire_department", url: vue.router ("movie:trending"), css},
				// {component: "a:material", text: "Popular", icon: "local_fire_department", url: vue.router ({p: "popular"}), css},
				{component: "a:material", text: "Editor Choice", icon: "editor_choice", url: vue.router ({p: "editor-choice"}), css},
				{component: "a:material", text: "Live", icon: "live_tv", url: vue.router ({p: "live"}), css},
				],
			visitor: [
				{component: "a:material", text: "History", icon: "search_activity", url: vue.router ({p: "history"}), css},
				{component: "a:material", text: "Watch Later", icon: "timer_play", url: vue.router ("playlist:default"), css},
				{component: "a:material", text: "Playlist", icon: "playlist_play", url: vue.router ("playlist:index"), css},
				],
			explore: [
				{component: "a:material", text: "Star", description: vue.dummy.star_count, descriptionColor: "blue", icon: "person", url: vue.router ("people:index"), css},
					{component: "a:material", text: "Male", description: vue.dummy.star_male_count, icon: "male", url: vue.router ("people:index", {}, {gender: "male"}), css: sub_css},
					{component: "a:material", text: "Female", description: vue.dummy.star_female_count, icon: "female", url: vue.router ("people:index", {}, {gender: "female"}), css: sub_css},
				{component: "a:material", text: "Movie", description: vue.dummy.movie_count, descriptionColor: "blue", icon: "movie", url: vue.router ("movie:index"), css},
					{component: "a:material", text: "Trending", description: vue.dummy.movie_trending_count, icon: "trending_up", url: vue.router ("movie:trending"), css: sub_css},
					{component: "a:material", text: "Top Rated", description: vue.dummy.movie_top_rated_count, icon: "star_s", url: vue.router ("movie:top_rated"), css: sub_css},
					{component: "a:material", text: "Now Playing", description: vue.dummy.movie_now_playing_count, icon: "animated_image", url: vue.router ("movie:now_playing"), css: sub_css},
					{component: "a:material", text: "Up Coming", description: vue.dummy.movie_up_coming_count, icon: "timer_play", url: vue.router ("movie:up_coming"), css: sub_css},
				{component: "a:material", text: "TV Show", description: vue.dummy.tv_count, descriptionColor: "blue", icon: "tv_guide", url: vue.router ("tv:index"), css},
					{component: "a:material", text: "Trending", description: vue.dummy.tv_trending_count, icon: "trending_up", url: vue.router ("tv:trending"), css: sub_css},
					{component: "a:material", text: "Top Rated", description: vue.dummy.tv_top_rated_count, icon: "star_s", url: vue.router ("tv:top_rated"), css: sub_css},
					{component: "a:material", text: "Airing Today", description: vue.dummy.tv_airing_today_count, icon: "acute", url: vue.router ("tv:airing_today"), css: sub_css},
					{component: "a:material", text: "Up Coming", description: vue.dummy.tv_up_coming_count, icon: "timer_play", url: vue.router ("tv:up_coming"), css: sub_css},
				// {component: "a:material", text: "Photo", icon: "photo_camera", url: vue.router ("photo:index"), css},
				],
			drama: [
				{component: "a:material", text: "Korea", icon: "globe_asia", url: vue.router ("country:by_type", {country: "korea", type: "tv"})},
				{component: "a:material", text: "Japan", icon: "globe_asia", url: vue.router ("country:by_type", {country: "japan", type: "tv"})},
				{component: "a:material", text: "China", icon: "globe_asia", url: vue.router ("country:by_type", {country: "china", type: "tv"})},
				],
			}
		return {menu}
		},
	mount () {
		vue.mount.menu ()
		},
	template: `
		<div id="menu-simple" class="menu:size flex flex:column box-shadow background:color scrollbar:pop" aria-modal="menu">
			<div class="flex flex:column padding">
				<component v-for="data in menu.general" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
				<!--a:material v-for="a in menu.general" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/-->
			</div>
			<div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">YOU</string>
			</div>
			<div class="flex flex:column padding">
				<component v-for="data in menu.visitor" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
				<!--a:material v-for="a in menu.visitor" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/-->
			</div>
			<div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">EXPLORE</string>
			</div>
			<div class="flex flex:column padding">
				<component v-for="data in menu.explore" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
				<!--a:material v-for="a in menu.explore" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/-->
			</div>
			<div class="padding-horizontal:large" mobile>
				<string class="font-size:intermediate font:bold">GENRE</string>
			</div>
			<div class="flex flex:column padding" mobile>
				<a:material v-for="a in vue.app.data.genre" v-bind:text="a.name" v-bind:href="a.permalink" icon="circle" class="padding:io border:radius icon:tiny"/>
			</div>
			<!--div class="padding-horizontal:large">
				<string class="font-size:intermediate font:bold">DRAMA (ASIA)</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in menu.drama" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/>
			</div-->
			<!--div class="flex justify:item padding padding-top:none padding-bottom:large">
				<img:ad src="referral-vultr-001.png" width="200" class="border:radius"/>
			</div-->
		</div>
		`,
	})

vue.component ("footer-simple", {
	template: `
		<div class="flex gap" component="footer-simple">
			<div class="flex flex:column flex:grow gap:medium">
				<logo-simple href="/"/>
				<div class="flex flex:column gap padding border:radius background-color:mono">
					<string class="font:medium font-bold:pop font-color:red">Sensitive Content Warning</string>
					<string>
						This site may contain sensitive content.
						We does not review nor do we endorse the content of this site.
						For more information please visit Privacy <a:link v-bind:href="vue.router ({page: 'privacy-policy'})">Content Policy</a:link>.
					</string>
				</div>
			</div>
			<div class="" style="min-width: 30px;"></div>
			<div class="" style="min-width: 140px;">
				<a:material v-bind:text="'About'" v-bind:href="vue.router ({page: 'about'})" v-bind:icon="'description'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Contact'" v-bind:href="vue.router ({page: 'contact'})" v-bind:icon="'contact'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Blog'" v-bind:href="vue.router ('index')" v-bind:icon="'link'" class="padding:io border:radius"/>
			</div>
			<div class="" style="min-width: 200px;">
				<a:material v-bind:text="'Privacy Policy'" v-bind:href="vue.router ({page: 'privacy-policy'})" v-bind:icon="'health_and_safety'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Terms of Use'" v-bind:href="vue.router ({page: 'term_of_use'})" v-bind:icon="'setting_accessibility'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Cookie Preference'" v-bind:href="vue.router ({page: 'cookie:preference'})" v-bind:icon="'cookie'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Disclaimer'" v-bind:href="vue.router ({page: 'disclaimer'})" v-bind:icon="'safety_check'" class="padding:io border:radius"/>
				<a:material v-bind:text="'DMCA'" v-bind:href="vue.router ({page: 'DMCA'})" v-bind:icon="'admin_panel_setting'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Sitemap'" v-bind:href="vue.router ('index')" v-bind:icon="'rss_feed'" class="padding:io border:radius"/>
			</div>
			<div class="" style="min-width: 10px;"></div>
		</div>
		`,
	})

vue.component ("footer-simple:info", {
	template: `
		<div class="flex flex:column align:item gap:small font:tiny padding padding-bottom:small" component="footer-simple:info">
			<string>Copyright &copy; 2025 <a href="/">{{ vue.app.var ["site:name"] }}</a></string>
			<string>All Right's Reserved</string>
			<string>Logo's Trademark's on this Site are the Property of their Respective Owner</string>
			<string>Web Engine Code and Design is Powered by <a v-bind:href="'mailto:support@' + lib.url.document.host.name">{{ vue.app.var ["site:name"] }}</a></string>
			<div></div>
			<string class="font:tiny font-color:mono">Version (1.0.0)</string>
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

vue.component ("logo-simple", {
	prop: ["src", "title", "description"],
	template: `
		<a class="flex align:item gap" component="logo-simple">
			<img:logo v-bind:src="prop.src || vue.app.image.logo" class="img:size"/>
			<div class="flex flex:column gap:space" margin>
				<span class="font-family:logo font:intermediate font:bold text:gradient">{{ prop.title || vue.app.var ["site:name"] }}</span>
				<string class="font:small font:bold font:static">{{ prop.description || vue.app.var ["site:description"] }}</string>
			</div>
		</a>
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

vue.component ("account-simple", {
	prop: ["name", "email", "avatar"],
	template: `
		<button id="account-simple" class="button padding:pop border:radius border-radius-bottom:none" component="account:avatar">
			<div class="flex align:item gap">
				<div class="flex flex:column justify:item gap:space text-align:right" margin computer>
					<string class="font-bold:pop">{{ prop.name }}</string>
					<string class="font-size:small font-bold:pop font-color:mono">{{ prop.email }}</string>
				</div>
				<separator:pop computer/>
				<div class="relative">
					<img:avatar v-bind:src="prop.avatar" class="size:regular border-radius:circle background-color:mono"/>
					<status:online class="background-color:green"/>
				</div>
			</div>
			<slot name="default"/>
		</button>
		`,
	})

vue.component ("account-simple:float", {
	setup () {
		return {}
		},
	method: {},
	template: `
		<section class="flex flex:column float:medium top:port right text-align:left border:radius background:color box-shadow no-overflow index transition:visibility">
			<div class="flex align:item gap padding padding-horizontal:medium">
				<img:logo src="google" class="img:small"/>
				<string class="flex:grow font:bold">Account Manager</string>
				<string class="font:small font-bold:pop"></string>
			</div>
			<separator:mono />
			<!--div v-if="lib.google.auth.empty ()" v-on:click="lib.google.auth.prompt ()" class="flex align:start gap padding padding-horizontal:medium">
				<icon src="person_shield" class="font:big text:gradient"/>
				<div class="flex flex:column gap:space">
					<string class="font-bold:pop">Google One Tap</string>
					<string class="font-size:pop font-color:mono">Third-party Sign In Required</string>
					<string v-if="vue.loading.google_auth_sign_in" class="font-size:small font-color:mono">Loading</string>
					<string v-if="vue.loading.google_auth_sign_in_done" class="font-size:small font-color:mono">OK, Reloading</string>
				</div>
			</div-->
			<div v-if="lib.google.auth.credential" class="padding:top padding-horizontal:medium">
				<button:awesome v-on:click="lib.google.auth.sign.out ()" class="flex align:item justify:item width:size padding" color="red">Sign Out</button:awesome>
			</div>
			<div class="padding:top padding-horizontal:medium" v-else>
				<button:awesome class="flex align:item justify:item width:size padding">Continue as Guest</button:awesome>
			</div>
			<div class="flex flex:column gap:small font-size:pop padding padding-horizontal:medium">
				<string class="line-spacing:small">
					We do not Store your Information nor do we Track your Activity in this Website's.
					Visit our <a:link v-bind:href="vue.router ({page: 'privacy-policy'})">Privacy Policy</a:link> and <a:link v-bind:href="vue.router ({page: 'term_of_use'})">Term's of Use</a:link>.
				</string>
			</div>
		</section>
		`,
	})

vue.component ("account-simple:anonymous", {
	setup () {
		var account = {name: "Anonymous", email: "Sign In", avatar: vue.app.image.avatar}
		if (lib.google.auth.credential) account = {name: lib.google.auth.profile.name, email: lib.google.auth.profile.email, avatar: lib.google.auth.profile.picture}
		return {account}
		},
	template: `
		<account-simple v-bind:name="account.name" v-bind:email="account.email" v-bind:avatar="account.avatar">
			<slot name="default"/>
		</account-simple>
		`,
	})

vue.component ("notification-simple", {
	template: `
		<button:material icon="notification_unread" class="icon:large padding:pop border:radius border-radius-bottom:none">
			<slot name="default"/>
		</button:material>
		`,
	})

vue.component ("notification-simple:float", {
	template: `
		<section class="flex flex:column float:size top:port right text-align:left border:radius border-radius-top-right:none background:color box-shadow no-overflow index transition:visibility">
			<div class="flex align:item gap padding padding-horizontal:medium">
				<img:logo src="google" class="img:small"/>
				<string class="flex:grow font:bold">Notification</string>
				<string class="font:small font-bold:pop"></string>
			</div>
			<separator:mono />
			<div class="flex flex:column gap padding padding-horizontal:medium">
				<div v-if="lib.AD__.block ()" class="flex gap">
					<icon src="do_not_touch" class="font:big text:gradient"/>
					<div class="flex flex:column">
						<string class="font-bold:pop font-color:red">AD Block</string>
						<string class="font-size:pop font-color:mono">Please disable your <b>AD Block</b></string>
					</div>
				</div>
				<string class="font-bold:pop" v-else>No Activity</string>
			</div>
			<separator:mono />
			<div class="flex align:item justify:item padding padding-horizontal:medium">
				<string class="font-size:pop font-color:mono">Activity, Information Feed.</string>
			</div>
		</section>
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

vue.component ("nav-simple", {
	prop: ["text", "data", "position", "option"],
	setup (prop) {
		var style = []
		var css = ["flex flex:column top:port text-align:left border:radius background:color box-shadow no-overflow index transition:visibility"]
		prop.option = prop.option || {}
		if (prop.position === "right") css.push ("right border-radius-top-right:none")
		else if (prop.position) style.push (prop.position)
		else css.push ("left border-radius-top-left:none")
		if (prop.option ["float:size"]) css.push (prop.option ["float:size"])
		else css.push ("float:size")
		return {css, style}
		},
	template: `
		<button:material v-bind:text="prop.text" icon="arrow_drop_down" icon-position="right" class="padding border:radius border-radius-bottom:none background-hover:mono">
			<section v-bind:class="css" v-bind:style="style">
				<component v-for="data in prop.data" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
			</section>
		</button:material>
		`,
	})

vue.component ("nav-simple:genre", {
	prop: ["left", "right"],
	template: `
		<div class="flex font:small text-align:left gap padding">
			<div class="flex flex:column width:half">
				<a:link v-for="data in (prop.left || [])" v-bind:href="data.permalink" class="padding:pop">
					{{ data.name }}
				</a:link>
			</div>
			<div class="flex flex:column width:half">
				<a:link v-for="data in (prop.right || [])" v-bind:href="data.permalink" class="padding:pop">
					{{ data.name }}
				</a:link>
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

vue.component ("video-card", {
	prop: ["id", "reference", "data", "item", "option"],
	setup (prop) {
		var ready = vue.reference (false)
		lib.timeout (function () {
			ready.value = true
			lib.timeout (function () {
				var id = "#" + prop.id
				var reference = "#" + (prop.reference || "main")
				lib.owl.carousel (id, reference, {play: "auto", loop: true, gap: 20, "nav": false, "nav:dot": true, responsive: lib.owl.carousel [prop.item || "item:pop"]})
				}, 1)
			}, 3)
		prop.option = prop.option || {}
		var data = prop.data || vue.app.data.trending.today
		var option = prop.option || {}
		if (option.shuffle) data = data.shuffle ()
		if (option.limit) data = data.limit (option.limit)
		return {prop, data, ready}
		},
	method: {
		ico (icon, type) {
			if (type === "movie") return "movie"
			else if (type === "tv") return "tv_guide"
			else return icon || "movie"
			},
		},
	template: `
		<div v-if="ready" v-bind:id="prop.id" class="owl-carousel owl-theme padding tmdb-background">
			<video-card:simple v-for="data in data" v-bind:data="data" class="owl-carousel-item"/>
			<!--div v-for="data in data" class="owl-carousel-item gap:small">
				<a:link v-bind:href="data.permalink" class="relative border:radius no-overflow">
					<img:asset src="3x4.svg"/>
					<images v-bind:src="data.poster.url" type="cover" class="opacity:small transition:opacity"/>
					<div class="owl-carousel-rating flex gap:small font:tiny absolute border-radius:pop position:top-left">
						<icon src="star"/>
						<string class="font-bold:pop">{{ data.vote.average }}</string>
					</div>
					<div class="flex align:item gap:tiny absolute position:top-right">
						<img:flag v-if="data.country.length" v-for="country in data.country" v-bind:src="country" class="img:atom border-radius:regular opacity:small"/>
						<img:flag v-else-if="data.language" v-bind:src="data.language" type="language" class="img:atom border-radius:regular opacity:small"/>
					</div>
					<div class="flex flex:column gap:tiny absolute position:bottom-left">
						<icon v-bind:src="ico (prop.option.icon, data.type)" class="text:gradient"/>
						<div class="owl-carousel-quality font:tiny font:bold border-radius:pop">HD</div>
					</div>
					<div class="flex flex:column align:end gap:tiny absolute position:bottom-right">
						<div v-for="genre in data.genre" class="owl-carousel-tag font:tiny border-radius:round">{{ genre.name }}</div>
					</div>
				</a:link>
				<string class="font-size:pop font-color:mono padding-top:small">{{ data ["release_date:string"] }}</string>
				<a:link v-bind:href="data.permalink" class="font-bold:pop font:static" style="height: 40px;" string>{{ data.title }}</a:link>
			</div-->
		</div>
		<div class="padding" v-else>
			<img:spinner class="size:medium"/>
		</div>
		`,
	})

vue.component ("video-card:poster", {
	prop: ["data", "option"],
	setup (prop) {
		prop.option = prop.option || {}
		var array = prop.data || vue.app.data.trending.today
		var limit = prop.option.limit || 3
		var data = vue.reactive ({tmp: array.shuffle ().limit (limit)})
		lib.time.interval (function () { data.tmp = array.shuffle ().limit (limit) }, 60)
		return {prop, data}
		},
	template: `
		<div class="flex align:item gap">
			<a:link v-for="data in data.tmp" v-bind:href="data.permalink">
				<img:ratio v-bind:src="data.poster.url" ratio="tmdb:portrait" width="128" class="border:radius"/>
			</a:link>
		</div>
		`,
	})

vue.component ("video-card:simple", {
	prop: ["data", "option"],
	setup (prop) {
		var option = prop.option || {title: true}
		if (("title" in option) === false) option.title = true
		return {data: prop.data, option}
		},
	method: {
		ico (type) {
			if (type === "movie") return "movie"
			else if (type === "tv") return "tv_guide"
			else return icon || "movie"
			},
		orientation () {
			if (this.option.orientation === "landscape") return "tmdb-landscape.svg"
			else return "tmdb-portrait.svg"
			},
		img (data) {
			if (this.option.orientation === "landscape") return data.backdrop.url
			else return data.poster.url
			},
		},
	template: `
		<div class="flex flex:column gap:small width:max" item>
			<div class="relative border:radius no-overflow">
				<img:asset v-bind:src="orientation ()" class="width:height"/>
				<a:link v-bind:href="data.permalink"><img:cover v-bind:src="img (data)" class="opacity:small transition:opacity"/></a:link>
				<div class="owl-carousel-rating flex gap:small font:tiny absolute border-radius:pop position:top-left">
					<icon src="star"/>
					<string class="font-bold:pop">{{ data.vote.average }}</string>
				</div>
				<div class="flex align:item gap:tiny absolute position:top-right">
					<img:flag v-if="data.country.length" v-for="country in data.country" v-bind:src="country" class="img:atom border-radius:regular opacity:small"/>
					<img:flag v-else-if="data.language" v-bind:src="data.language" type="language" class="img:atom border-radius:regular opacity:small"/>
				</div>
				<div class="flex flex:column gap:tiny absolute position:bottom-left">
					<icon v-bind:src="ico (data.type)" class="text:gradient"/>
					<div class="owl-carousel-quality font:tiny font:bold border-radius:pop">HD</div>
				</div>
				<div class="flex flex:column align:end gap:tiny absolute position:bottom-right">
					<div v-for="genre in data.genre" class="owl-carousel-tag font:tiny border-radius:round">{{ genre.name }}</div>
				</div>
			</div>
			<string v-if="option.title" class="font-size:pop font-color:mono padding-top:small">{{ data ["release_date:string"] }}</string>
			<a:link v-if="option.title" v-bind:href="data.permalink" class="font-bold:pop font:static" style="height: 40px;" string>{{ data.title }}</a:link>
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

vue.component ("paging-simple", {
	prop: ["page", "total"],
	template: `
		<div class="flex align:item gap padding">
			<a v-bind:href="lib.p.url.back (prop.page, prop.total)" class="flex align:item gap padding:sky font-bold:pop font:static border-radius:round background-color:mono">
				<icon src="arrow_left_alt"/>
				<string>Back</string>
			</a>
			<div v-if="vue.device.computer ()" class="flex flex:grow align:item justify:item gap:small paging">
				<a v-for="page in lib.p (prop.page, prop.total)" v-bind:href="lib.p.url (page, prop.total)" class="font-bold:pop font:static border-radius:regular background-color:mono" v-bind:style="lib.p.style (prop.page, page)">
					{{ lib.p.render (page, total) }}
				</a>
			</div>
			<flex:grow v-else/>
			<a v-bind:href="lib.p.url.next (prop.page, prop.total)" class="flex align:item gap padding:sky font-bold:pop font:static border-radius:round background-color:mono">
				<string>Next</string>
				<icon src="arrow_right_alt"/>
			</a>
		</div>
		<div class="flex align:item justify:item gap:small padding paging" mobile>
			<a v-for="page in lib.p (prop.page, prop.total)" v-bind:href="lib.p.url (page, prop.total)" class="font-bold:pop font:static border-radius:regular background-color:mono" v-bind:style="lib.p.style (prop.page, page)">
				{{ lib.p.render (page, total) }}
			</a>
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

vue.component ("the-movie:nav", {
	setup () {
		var css = "padding:sky"
		var data = [
			{component: "a:material", text: "ALL", description: vue.dummy.movie_count, descriptionColor: "blue", url: vue.router ("movie:index"), icon: "more_horizontal", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Trending", description: vue.dummy.movie_trending_count, url: vue.router ("movie:trending"), icon: "trending_up", css},
			// {component: "a:material", text: "Popular", description: "—", url: vue.router ("movie:popular"), icon: "hotel_class", css},
			{component: "a:material", text: "Top Rated", description: vue.dummy.movie_top_rated_count, url: vue.router ("movie:top_rated"), icon: "star_s", css},
			{component: "a:material", text: "Now Playing", description: vue.dummy.movie_now_playing_count, url: vue.router ("movie:now_playing"), icon: "animated_image", css},
			{component: "a:material", text: "Up Coming", description: vue.dummy.movie_up_coming_count, url: vue.router ("movie:up_coming"), icon: "timer_play", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Editor Choice", description: vue.dummy.movie_editor_choice_count, url: vue.router ("movie:editor-choice"), icon: "editor_choice", css},
			// {component: "separator:mono"},
			// {component: "nav-simple:genre", left: [], right: []},
			]
		return {data}
		},
	template: `
		<nav-simple text="Movie" v-bind:data="data"/>
		`,
	})

vue.component ("the-tv:nav", {
	setup () {
		var css = "padding:sky"
		var data = [
			{component: "a:material", text: "ALL", description: vue.dummy.tv_count, descriptionColor: "blue", url: vue.router ("tv:index"), icon: "more_horizontal", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Trending", description: vue.dummy.tv_trending_count, url: vue.router ("tv:trending"), icon: "trending_up", css},
			//  {component: "a:material", text: "Popular", description: "—", url: vue.router ("tv:popular"), icon: "hotel_class", css},
			{component: "a:material", text: "Top Rated", description: vue.dummy.tv_top_rated_count, url: vue.router ("tv:top_rated"), icon: "star_s", css},
			{component: "a:material", text: "Airing Today", description: vue.dummy.tv_airing_today_count, url: vue.router ("tv:airing_today"), icon: "acute", css},
			{component: "a:material", text: "Up Coming", description: vue.dummy.tv_up_coming_count, url: vue.router ("tv:up_coming"), icon: "timer_play", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Editor Choice", description: vue.dummy.tv_editor_choice_count, url: vue.router ("tv:editor-choice"), icon: "editor_choice", css},
			// {component: "separator:mono"},
			// {component: "nav-simple:genre", left: [], right: []},
			]
		return {data}
		},
	template: `
		<nav-simple text="TV Show" v-bind:data="data"/>
		`,
	})

vue.component ("the-people:nav", {
	prop: ["position"],
	setup () {
		var css = "padding:sky"
		var data = [
			{component: "a:material", text: "ALL", description: vue.dummy.star_count, descriptionColor: "blue", url: vue.router ("people:index"), icon: "more_horizontal", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Male", description: vue.dummy.star_male_count, url: vue.router ("people:index", {}, {gender: "male"}), icon: "male", css},
			{component: "a:material", text: "Female", description: vue.dummy.star_female_count, url: vue.router ("people:index", {}, {gender: "female"}), icon: "female", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Editor Choice", description: vue.dummy.star_editor_choice_count, url: vue.router ("people:editor-choice"), icon: "editor_choice", css},
			{component: "separator:mono"},
			{component: "nav-simple:genre", left: [{name: "Passed Away", permalink: "/"}], right: []},
			]
		return {data}
		},
	template: `
		<nav-simple text="People" v-bind:data="data" v-bind:position="prop.position"/>
		`,
	})

vue.component ("the-genre:nav", {
	prop: ["position"],
	setup () {
		var half = vue.app.data.genre.length / 2
		if (half.string ().exist (".")) half = half + 0.5
		var left = vue.app.data.genre.slice (0, half)
		var right = vue.app.data.genre.slice (half)
		var data = [
			{component: "nav-simple:genre", left, right},
			]
		return {data}
		},
	template: `
		<nav-simple text="Genre" v-bind:data="data" v-bind:option="{'float:size': 'float:medium'}"/>
		`,
	})

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.component ("bokep:header", {
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
					<!--the-genre:nav /-->
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

vue.component ("bokep:menu", {
	setup () {
		var css = "padding:io border:radius icon:medium"
		var sub_css = "padding:io padding-left:big border:radius font:small --mobile"
		var menu = {
			general: [
				{component: "a:material", text: "Home", icon: "home", url: "/", css},
				{component: "a:material", text: "Short", icon: "subscription", url: vue.router ({p: "short"}), css},
				// {component: "a:material", text: "Trending", icon: "local_fire_department", url: vue.router ("movie:trending"), css},
				// {component: "a:material", text: "Popular", icon: "local_fire_department", url: vue.router ({p: "popular"}), css},
				{component: "a:material", text: "Editor Choice", icon: "editor_choice", url: vue.router ({p: "editor-choice"}), css},
				{component: "a:material", text: "Live", icon: "live_tv", url: vue.router ({p: "live"}), css},
				],
			visitor: [
				{component: "a:material", text: "History", icon: "search_activity", url: vue.router ({p: "history"}), css},
				{component: "a:material", text: "Watch Later", icon: "timer_play", url: vue.router ("playlist:default"), css},
				{component: "a:material", text: "Playlist", icon: "playlist_play", url: vue.router ("playlist:index"), css},
				],
			explore: [
				{component: "a:material", text: "Star", description: "99 +", descriptionColor: "blue", icon: "person", url: vue.router ("people:index"), css},
					{component: "a:material", text: "Male", description: "0", icon: "male", url: vue.router ("people:index", {}, {gender: "male"}), css: sub_css},
					{component: "a:material", text: "Female", description: "99 +", icon: "female", url: vue.router ("people:index", {}, {gender: "female"}), css: sub_css},
				// {component: "a:material", text: "Movie", description: vue.dummy.movie_count, descriptionColor: "blue", icon: "movie", url: vue.router ("movie:index"), css},
					// {component: "a:material", text: "Trending", description: vue.dummy.movie_trending_count, icon: "trending_up", url: vue.router ("movie:trending"), css: sub_css},
					// {component: "a:material", text: "Top Rated", description: vue.dummy.movie_top_rated_count, icon: "star_s", url: vue.router ("movie:top_rated"), css: sub_css},
					// {component: "a:material", text: "Now Playing", description: vue.dummy.movie_now_playing_count, icon: "animated_image", url: vue.router ("movie:now_playing"), css: sub_css},
					// {component: "a:material", text: "Up Coming", description: vue.dummy.movie_up_coming_count, icon: "timer_play", url: vue.router ("movie:up_coming"), css: sub_css},
				// {component: "a:material", text: "TV Show", description: vue.dummy.tv_count, descriptionColor: "blue", icon: "tv_guide", url: vue.router ("tv:index"), css},
					// {component: "a:material", text: "Trending", description: vue.dummy.tv_trending_count, icon: "trending_up", url: vue.router ("tv:trending"), css: sub_css},
					// {component: "a:material", text: "Top Rated", description: vue.dummy.tv_top_rated_count, icon: "star_s", url: vue.router ("tv:top_rated"), css: sub_css},
					// {component: "a:material", text: "Airing Today", description: vue.dummy.tv_airing_today_count, icon: "acute", url: vue.router ("tv:airing_today"), css: sub_css},
					// {component: "a:material", text: "Up Coming", description: vue.dummy.tv_up_coming_count, icon: "timer_play", url: vue.router ("tv:up_coming"), css: sub_css},
				{component: "a:material", text: "Photo", description: "1K +", descriptionColor: "blue", icon: "photo_camera", url: vue.router ("photo:index"), css},
				],
			}
		var genre = []
		var lgbt = []
		for (var i in vue.app.data.genre) {
			if (["transgender", "lesbian"].includes (vue.app.data.genre [i].slug)) lgbt.push (vue.app.data.genre [i])
			else genre.push (vue.app.data.genre [i])
			}
		return {menu, genre, lgbt}
		},
	mount () {
		vue.mount.menu ()
		},
	template: `
		<div id="menu-simple" class="menu:size flex flex:column box-shadow background:color scrollbar:pop" aria-modal="menu">
			<div class="flex flex:column padding">
				<component v-for="data in menu.general" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
				<!--a:material v-for="a in menu.general" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/-->
			</div>
			<div class="padding-horizontal:large padding-top:small">
				<string class="font-size:intermediate font:bold">YOU</string>
			</div>
			<div class="flex flex:column padding">
				<component v-for="data in menu.visitor" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
				<!--a:material v-for="a in menu.visitor" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/-->
			</div>
			<div class="padding-horizontal:large padding-top:small">
				<string class="font-size:intermediate font:bold">EXPLORE</string>
			</div>
			<div class="flex flex:column padding">
				<component v-for="data in menu.explore" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
				<!--a:material v-for="a in menu.explore" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/-->
			</div>
			<div class="padding-horizontal:large padding-top:small">
				<string class="font-size:intermediate font:bold">LGBT</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in lgbt" v-bind:text="a.name" v-bind:href="a.permalink" v-bind:icon="a.icon" class="padding:io border:radius icon:medium"/>
			</div>
			<div class="padding-horizontal:large padding-top:small">
				<string class="font-size:intermediate font:bold">GENRE</string>
			</div>
			<div class="flex flex:column padding">
				<a:material v-for="a in genre" v-bind:text="a.name" v-bind:href="a.permalink" icon="circle" class="padding:io border:radius icon:tiny"/>
			</div>
		</div>
		`,
	})