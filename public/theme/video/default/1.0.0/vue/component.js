/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

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

vue.component ("logo-simple", {
	prop: ["src", "title", "description"],
	template: `
		<a class="flex align:item gap" component="logo-simple">
			<img:logo v-bind:src="prop.src || app.image.logo" class="img:size"/>
			<div class="flex flex:column gap:space" margin>
				<span class="font-family:logo font:intermediate font:bold text:gradient">{{ prop.title || app.var ["site:name"] }}</span>
				<string class="font:small font:bold font:static">{{ prop.description || app.var ["site:description"] }}</string>
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
			<div v-if="google.auth.empty ()" v-on:click="google.auth.prompt ()" class="flex align:start gap padding padding-horizontal:medium">
				<icon src="person_shield" class="font:big text:gradient"/>
				<div class="flex flex:column gap:space">
					<string class="font-bold:pop">Google One Tap</string>
					<string class="font-size:pop font-color:mono">Third-party Sign In Required</string>
					<string v-if="vue.loading.google_auth_sign_in" class="font-size:small font-color:mono">Loading</string>
					<string v-if="vue.loading.google_auth_sign_in_done" class="font-size:small font-color:mono">OK, Reloading</string>
				</div>
			</div>
			<div v-if="google.auth.credential" class="padding:top padding-horizontal:medium">
				<button:awesome v-on:click="google.auth.sign.out ()" class="flex align:item justify:item width:size padding" color="red">Sign Out</button:awesome>
			</div>
			<div class="padding-horizontal:medium" v-else>
				<button:awesome class="flex align:item justify:item width:size padding">Continue as Guest</button:awesome>
			</div>
			<div class="flex flex:column gap:small font-size:pop padding padding-horizontal:medium">
				<string class="line-spacing:small">
					We do not Store your Information nor do we Track your Activity in this Website's.
					Visit our <a v-bind:href="php.router.link.page ['privacy-policy']">Privacy Policy</a> and <a v-bind:href="php.router.link.page ['term_of_use']">Term's of Use</a>.
				</string>
			</div>
		</section>
		`,
	})

vue.component ("account-simple:anonymous", {
	setup () {
		var account = {name: "Anonymous", email: "Sign In", avatar: php.app.image.avatar}
		if (php.google.auth.credential) account = {name: php.google.auth.profile.name, email: php.google.auth.profile.email, avatar: php.google.auth.profile.picture}
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
				<div v-if="php.AD__.block ()" class="flex gap">
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
		prop.option = prop.option || {}
		var data = prop.data || php.app.data.trending.today
		var option = prop.option || {}
		if (option.shuffle) data = data.shuffle ()
		return {prop, data}
		},
	mount (v) {
		var id = "#" + v.prop.id
		var reference = "#" + (v.prop.reference || "main")
		php.owl.carousel (id, reference, {play: "auto", loop: true, gap: 20, "nav": false, "nav:dot": true, responsive: php.owl.carousel [v.prop.item || "item:pop"]})
		},
	template: `
		<div v-bind:id="prop.id" class="owl-carousel owl-theme padding tmdb-background none">
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
						<icon v-bind:src="prop.option.icon || 'movie'" class="font:intermediate text:gradient"/>
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
		`,
	})

vue.component ("video-card:vertical", {
	prop: ["data", "option"],
	setup (prop) {
		prop.option = prop.option || {}
		var data = (prop.data || php.app.data.trending.today).shuffle ().limit (2)
		return {prop, data}
		},
	template: `
		<div v-for="data in data" class="flex gap border:radius box-shadow no-overflow">
			<div class="relative no-overflow" style="min-width: 128px;">
				<a v-bind:href="data.permalink">
					<img:asset src="3x4.svg" class="width:size" style="width: 128px;"/>
					<images v-bind:src="data.poster.url" type="cover" class="opacity:small transition:opacity"/>
				</a>
			</div>
			<div class="flex flex:column gap:small padding:vertical padding:right">
				<string class="font:small font-color:mono">{{ data ["release_date:string"] }}</string>
				<a v-bind:href="data.permalink" class="font:intermediate font-bold:pop font:static" string>{{ data.title }}</a>
				<div class="flex:grow"></div>
				<a v-for="genre in data.genre" v-bind:href="genre.permalink" class="font:tiny" string>{{ genre.name }}</a>
				<div class="flex align:item gap">
					<icon src="tv_guide"/>
					<icon src="star"/>
					<string>{{ data.vote.average }}</string>
					<img:flag v-if="data.country.length" v-for="country in data.country" v-bind:src="country" class="img:atom border-radius:regular opacity:small"/>
					<img:flag v-else-if="data.language" v-bind:src="data.language" type="language" class="img:atom border-radius:regular opacity:small"/>
				</div>
			</div>
		</div>
		`,
	})

vue.component ("video-card:poster", {
	prop: ["data", "option"],
	setup (prop) {
		prop.option = prop.option || {}
		var data = (prop.data || php.app.data.trending.today).shuffle ().limit (prop.option.limit || 3)
		return {prop, data}
		},
	template: `
		<div class="flex align:item gap">
			<a v-for="data in data" v-bind:href="data.permalink">
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
			{component: "a:material", text: "ALL", description: "99 +", url: php.router ("movie:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Popular", description: "—", url: php.router ("movie:popular"), icon: "hotel_class", css},
			{component: "a:material", text: "Top Rated", description: "—", url: php.router ("movie:top_rated"), icon: "local_fire_department", css},
			{component: "a:material", text: "Up Coming", description: "—", url: php.router ("movie:up_coming"), icon: "timer_play", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Top Global", description: "0", url: php.router ("movie:top_global"), icon: "bolt", css},
			{component: "a:material", text: "Editor Choice", description: "0", url: php.router ("movie:editor-choice"), icon: "editor_choice", css},
			{component: "separator:mono"},
			{component: "nav-simple:genre", left: [], right: []},
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
			{component: "a:material", text: "ALL", description: "99 +", url: php.router ("tv:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Popular", description: "—", url: php.router ("tv:popular"), icon: "hotel_class", css},
			{component: "a:material", text: "Top Rated", description: "—", url: php.router ("tv:top_rated"), icon: "local_fire_department", css},
			{component: "a:material", text: "Airing Today", description: "—", url: php.router ("tv:airing_today"), icon: "timer_play", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Top Global", description: "0", url: php.router ("tv:top_global"), icon: "bolt", css},
			{component: "a:material", text: "Editor Choice", description: "0", url: php.router ("tv:editor-choice"), icon: "editor_choice", css},
			{component: "separator:mono"},
			{component: "nav-simple:genre", left: [], right: []},
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
			{component: "a:material", text: "ALL", description: "99 +", url: php.router ("people:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Male", description: "—", url: php.router ("people:index", {}, {gender: "male"}), icon: "male", css},
			{component: "a:material", text: "Female", description: "—", url: php.router ("people:index", {}, {gender: "female"}), icon: "female", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Top Global", description: "0", url: php.router ("people:top_global"), icon: "bolt", css},
			{component: "a:material", text: "Editor Choice", description: "0", url: php.router ("people:editor-choice"), icon: "editor_choice", css},
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