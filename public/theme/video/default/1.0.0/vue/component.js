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
		var nav = {
			general: [
				{component: "a:material", text: "Home", icon: "home", url: "/", css},
				{component: "a:material", text: "Short", icon: "subscriptions", url: vue.router ({p: "short"}), css},
				{component: "a:material", text: "Trending", icon: "local_fire_department", url: vue.router ({p: "trending"}), css},
				{component: "a:material", text: "Popular", icon: "local_fire_department", url: vue.router ({p: "popular"}), css},
				{component: "a:material", text: "Editor Choice", icon: "editor_choice", url: vue.router ({p: "editor-choice"}), css},
				{component: "a:material", text: "Live", icon: "live_tv", url: vue.router ({p: "live"}), css},
				]
			}
		var menu = {
			general: [
				{component: "a:material", text: "Home", icon: "home", url: "/", css},
				{component: "a:material", text: "Short", icon: "subscriptions", url: vue.router ({p: "short"}), css},
				{component: "a:material", text: "Trending", icon: "local_fire_department", url: vue.router ({p: "trending"}), css},
				{component: "a:material", text: "Popular", icon: "local_fire_department", url: vue.router ({p: "popular"}), css},
				{component: "a:material", text: "Editor Choice", icon: "editor_choice", url: vue.router ({p: "editor-choice"}), css},
				{component: "a:material", text: "Live", icon: "live_tv", url: vue.router ({p: "live"}), css},
				],
			visitor: [
				{component: "a:material", text: "History", icon: "search_activity", url: vue.router ({p: "history"})},
				{component: "a:material", text: "Watch Later", icon: "timer_play", url: vue.router ("playlist:default")},
				{component: "a:material", text: "Playlist", icon: "playlist_play", url: vue.router ("playlist:index")},
				],
			explore: [
				{component: "a:material", text: "Star", icon: "hotel_class", url: vue.router ("people:index")},
				{component: "a:material", text: "Movie", icon: "movie", url: vue.router ("movie:index")},
				{component: "a:material", text: "TV Show", icon: "tv_guide", url: vue.router ("tv:index")},
				{component: "a:material", text: "Photo", icon: "photo_camera", url: vue.router ("photo:index")},
				],
			drama: [
				{component: "a:material", text: "Korea", icon: "globe_asia", url: vue.router ("country:by_type", {country: "korea", type: "tv"})},
				{component: "a:material", text: "Japan", icon: "globe_asia", url: vue.router ("country:by_type", {country: "japan", type: "tv"})},
				{component: "a:material", text: "China", icon: "globe_asia", url: vue.router ("country:by_type", {country: "china", type: "tv"})},
				],
			}
		return {menu, nav}
		},
	mount () {
		vue.mount.menu ()
		},
	template: `
		<div id="menu-simple" class="menu:size flex flex:column box-shadow background:color" aria-modal="menu" style="scrollbar-width: thin; scrollbar-color: rgb(var(--background-color)) rgb(var(--background-color));">
			<div class="flex flex:column padding">
				<component v-for="data in nav.general" v-bind:is="data.component" v-bind:param="data" v-bind:class="data.css"/>
				<!--a:material v-for="a in menu.general" v-bind:text="a.text" v-bind:href="a.url" v-bind:icon="a.icon" class="padding:io border:radius"/-->
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
						For more information please visit Privacy <a href="/">Content Policy</a>.
					</string>
				</div>
			</div>
			<div class="" style="min-width: 30px;"></div>
			<div class="" style="min-width: 140px;">
				<a:material v-bind:text="'About'" v-bind:href="vue.router ({page: 'about'})" v-bind:icon="'description'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Contact'" v-bind:href="vue.router ({page: 'contact'})" v-bind:icon="'contacts'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Blog'" v-bind:href="vue.router ('index')" v-bind:icon="'link'" class="padding:io border:radius"/>
			</div>
			<div class="" style="min-width: 200px;">
				<a:material v-bind:text="'Privacy Policy'" v-bind:href="vue.router ({page: 'privacy-policy'})" v-bind:icon="'health_and_safety'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Terms of Use'" v-bind:href="vue.router ({page: 'term_of_use'})" v-bind:icon="'settings_accessibility'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Cookie Preference'" v-bind:href="vue.router ({page: 'cookie:preference'})" v-bind:icon="'cookie'" class="padding:io border:radius"/>
				<a:material v-bind:text="'Disclaimer'" v-bind:href="vue.router ({page: 'disclaimer'})" v-bind:icon="'safety_check'" class="padding:io border:radius"/>
				<a:material v-bind:text="'DMCA'" v-bind:href="vue.router ({page: 'DMCA'})" v-bind:icon="'admin_panel_settings'" class="padding:io border:radius"/>
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
			<div v-if="lib.google.auth.empty ()" v-on:click="lib.google.auth.prompt ()" class="flex align:start gap padding padding-horizontal:medium">
				<icon src="person_shield" class="font:big text:gradient"/>
				<div class="flex flex:column gap:space">
					<string class="font-bold:pop">Google One Tap</string>
					<string class="font-size:pop font-color:mono">Third-party Sign In Required</string>
					<string v-if="vue.loading.google_auth_sign_in" class="font-size:small font-color:mono">Loading</string>
					<string v-if="vue.loading.google_auth_sign_in_done" class="font-size:small font-color:mono">OK, Reloading</string>
				</div>
			</div>
			<div v-if="lib.google.auth.credential" class="padding:top padding-horizontal:medium">
				<button:awesome v-on:click="lib.google.auth.sign.out ()" class="flex align:item justify:item width:size padding" color="red">Sign Out</button:awesome>
			</div>
			<div class="padding-horizontal:medium" v-else>
				<button:awesome class="flex align:item justify:item width:size padding">Continue as Guest</button:awesome>
			</div>
			<div class="flex flex:column gap:small font-size:pop padding padding-horizontal:medium">
				<string class="line-spacing:small">
					We do not Store your Information nor do we Track your Activity in this Website's.
					Visit our <a v-bind:href="vue.router ({page: 'privacy-policy'})">Privacy Policy</a> and <a v-bind:href="vue.router ({page: 'term_of_use'})">Term's of Use</a>.
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
		<button:material icon="notifications_unread" class="icon:large padding:pop border:radius border-radius-bottom:none">
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
	prop: ["text", "data", "position"],
	setup (prop) {
		var style = []
		var css = ["flex flex:column float:size top:port text-align:left border:radius background:color box-shadow no-overflow index transition:visibility"]
		if (prop.position === "right") css.push ("right border-radius-top-right:none")
		else if (prop.position) style.push (prop.position)
		else css.push ("left border-radius-top-left:none")
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
		<div class="flex font-size:small text-align:left gap padding">
			<div class="flex flex:column width:half">
				<a v-for="data in (prop.left || [])" v-bind:href="data.url" class="padding:pop">
					{{ data.text }}
				</a>
			</div>
			<div class="flex flex:column width:half">
				<a v-for="data in (prop.right || [])" v-bind:href="data.url" class="padding:pop">
					{{ data.text }}
				</a>
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
			<div v-for="data in (prop.data || data)" class="owl-carousel-item gap:small">
				<a v-bind:href="data.permalink" class="relative border:radius no-overflow">
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
				</a>
				<string class="font-size:pop font-color:mono padding-top:small">{{ data ["release_date:string"] }}</string>
				<a v-bind:href="data.permalink" class="font-bold:pop font:static" style="height: 40px;" string>{{ data.title }}</a>
			</div>
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
			<a v-for="data in data.tmp" v-bind:href="data.permalink">
				<img:ratio v-bind:src="data.poster.url" ratio="3:4" width="128" class="border:radius">
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
			{component: "a:material", text: "ALL", description: "99 +", url: vue.router ("movie:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Trending", description: "—", url: vue.router ("movie:trending"), icon: "hotel_class", css},
			{component: "a:material", text: "Popular", description: "—", url: vue.router ("movie:popular"), icon: "hotel_class", css},
			{component: "a:material", text: "Top Rated", description: "—", url: vue.router ("movie:top_rated"), icon: "local_fire_department", css},
			{component: "a:material", text: "Now Playing", description: "—", url: vue.router ("movie:now_playing"), icon: "local_fire_department", css},
			{component: "a:material", text: "Up Coming", description: "—", url: vue.router ("movie:up_coming"), icon: "timer_play", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Editor Choice", description: "0", url: vue.router ("movie:editor-choice"), icon: "editor_choice", css},
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
			{component: "a:material", text: "ALL", description: "99 +", url: vue.router ("tv:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Trending", description: "—", url: vue.router ("tv:trending"), icon: "hotel_class", css},
			{component: "a:material", text: "Popular", description: "—", url: vue.router ("tv:popular"), icon: "hotel_class", css},
			{component: "a:material", text: "Top Rated", description: "—", url: vue.router ("tv:top_rated"), icon: "local_fire_department", css},
			{component: "a:material", text: "Airing Today", description: "—", url: vue.router ("tv:airing_today"), icon: "timer_play", css},
			{component: "a:material", text: "Up Coming", description: "—", url: vue.router ("tv:up_coming"), icon: "timer_play", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Editor Choice", description: "0", url: vue.router ("tv:editor-choice"), icon: "editor_choice", css},
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
			{component: "a:material", text: "ALL", description: "99 +", url: vue.router ("people:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Male", description: "—", url: vue.router ("people:index", {}, {gender: "male"}), icon: "male", css},
			{component: "a:material", text: "Female", description: "—", url: vue.router ("people:index", {}, {gender: "female"}), icon: "female", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Editor Choice", description: "0", url: vue.router ("people:editor-choice"), icon: "editor_choice", css},
			{component: "separator:mono"},
			{component: "nav-simple:genre", left: [{text: "Passed Away", url: "/"}], right: []},
			]
		return {data}
		},
	template: `
		<nav-simple text="People" v-bind:data="data" v-bind:position="prop.position"/>
		`,
	})

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.component ("page:privacy-policy", {
	prop: [],
	setup (prop) {
		return {}
		},
	template: `
<div class="">
<h1>Privacy Policy</h1>
<p>Last updated: December 11, 2025</p>
<p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
<p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
<h2>Interpretation and Definitions</h2>
<h3>Interpretation</h3>
<p>The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
<h3>Definitions</h3>
<p>For the purposes of this Privacy Policy:</p>
<ul>
<li>
<p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
</li>
<li>
<p><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
</li>
<li>
<p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Google.</p>
</li>
<li>
<p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
</li>
<li>
<p><strong>Country</strong> refers to: Alaska,  United States</p>
</li>
<li>
<p><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</p>
</li>
<li>
<p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
</li>
<li>
<p><strong>Service</strong> refers to the Website.</p>
</li>
<li>
<p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
</li>
<li>
<p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
</li>
<li>
<p><strong>Website</strong> refers to Google, accessible from <a href="https://google.com" rel="external nofollow noopener" target="_blank">https://google.com</a></p>
</li>
<li>
<p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
</li>
</ul>
<h2>Collecting and Using Your Personal Data</h2>
<h3>Types of Data Collected</h3>
<h4>Personal Data</h4>
<p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
<ul>
<li>
<p>Email address</p>
</li>
<li>
<p>First name and last name</p>
</li>
<li>
<p>Usage Data</p>
</li>
</ul>
<h4>Usage Data</h4>
<p>Usage Data is collected automatically when using the Service.</p>
<p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
<p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device's unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
<p>We may also collect information that Your browser sends whenever You visit Our Service or when You access the Service by or through a mobile device.</p>
<h4>Tracking Technologies and Cookies</h4>
<p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies We use include beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
<ul>
<li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
<li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
</ul>
<p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies on <a href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies" target="_blank">TermsFeed website</a> article.</p>
<p>We use both Session and Persistent Cookies for the purposes set out below:</p>
<ul>
<li>
<p><strong>Necessary / Essential Cookies</strong></p>
<p>Type: Session Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</p>
</li>
<li>
<p><strong>Cookies Policy / Notice Acceptance Cookies</strong></p>
<p>Type: Persistent Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</p>
</li>
<li>
<p><strong>Functionality Cookies</strong></p>
<p>Type: Persistent Cookies</p>
<p>Administered by: Us</p>
<p>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</p>
</li>
</ul>
<p>For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.</p>
<h3>Use of Your Personal Data</h3>
<p>The Company may use Personal Data for the following purposes:</p>
<ul>
<li>
<p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
</li>
<li>
<p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
</li>
<li>
<p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
</li>
<li>
<p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
</li>
<li>
<p><strong>To provide You</strong> with news, special offers, and general information about other goods, services and events which We offer that are similar to those that you have already purchased or inquired about unless You have opted not to receive such information.</p>
</li>
<li>
<p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
</li>
<li>
<p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
</li>
<li>
<p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
</li>
</ul>
<p>We may share Your personal information in the following situations:</p>
<ul>
<li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
<li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
<li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
<li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
<li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
<li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
</ul>
<h3>Retention of Your Personal Data</h3>
<p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
<p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer periods.</p>
<h3>Transfer of Your Personal Data</h3>
<p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from Your jurisdiction.</p>
<p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
<p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
<h3>Delete Your Personal Data</h3>
<p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
<p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
<p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
<p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
<h3>Disclosure of Your Personal Data</h3>
<h4>Business Transactions</h4>
<p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
<h4>Law enforcement</h4>
<p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
<h4>Other legal requirements</h4>
<p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
<ul>
<li>Comply with a legal obligation</li>
<li>Protect and defend the rights or property of the Company</li>
<li>Prevent or investigate possible wrongdoing in connection with the Service</li>
<li>Protect the personal safety of Users of the Service or the public</li>
<li>Protect against legal liability</li>
</ul>
<h3>Security of Your Personal Data</h3>
<p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
<h2>Children's Privacy</h2>
<p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
<p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
<h2>Links to Other Websites</h2>
<p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
<p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
<h2>Changes to this Privacy Policy</h2>
<p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
<p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
<h2>Contact Us</h2>
<p>If you have any questions about this Privacy Policy, You can contact us:</p>
<ul>
<li>
<p>By email: support@google.com</p>
</li>
<li>
<p>By visiting this page on our website: <a href="https://google.com/privacy/policy/" rel="external nofollow noopener" target="_blank">https://google.com/privacy/policy/</a></p>
</li>
</ul>
</div>
		`,
	})