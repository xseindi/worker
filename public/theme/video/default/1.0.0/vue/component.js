/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

$.vue.component ("loading", $.vue.js ({
	template: `
		<div id="loading" class="viewport fixed flex align:item justify:item background:color">
			Loading ...
		</div>
		`,
	}))

$.vue.component ("loading:spinner", $.vue.js ({
	template: `
		<div id="loading" class="viewport fixed flex align:item justify:item background:color">
			<img:spinner class="size:large"/>
		</div>
		`,
	}))

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

$.vue.component ("logo-simple", $.vue.js ({
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
	}))

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

$.vue.component ("account-avatar", $.vue.js ({
	prop: ["name", "email", "avatar"],
	template: `
		<button class="button padding:pop" component="account:avatar">
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
	}))

$.vue.component ("account-avatar:float", $.vue.js ({
	setup () {
		return {
			link_privacy_policy: $.vue.router.link ({page: "privacy-policy"}),
			link_term_of_use: $.vue.router.link ({page: "term_of_use"}),
			}
		},
	template: `
		<section class="flex flex:column float:medium top:port right text-align:left border:radius background:color box-shadow no-overflow index transition:visibility">
			<div class="flex align:item gap padding padding-horizontal:medium">
				<img:logo src="google.svg" class="img:small"/>
				<string class="flex:grow font:bold">Account Manager</string>
				<string class="font:small font-bold:pop"></string>
			</div>
			<separator:mono />
			<div v-if="!google.auth.credential" v-on:click="google.auth.prompt ()" class="flex align:item gap padding padding-horizontal:medium">
				<icon src="person_shield" class="font:big text:gradient"/>
				<div class="flex flex:column gap:space">
					<string class="font-bold:pop">One Tap</string>
					<string class="font-size:pop font-color:mono">Sign In</string>
				</div>
			</div>
			<div v-if="google.auth.credential" class="padding:top padding-horizontal:medium">
				<button:awesome v-on:click="google.auth.sign.out ()" class="flex align:item justify:item width:size padding" color="red">Sign Out</button:awesome>
			</div>
			<div class="padding-horizontal:medium" v-else>
				<button:awesome v-on:click="vue.router.reload ()" class="flex align:item justify:item width:size padding">Continue as Guest</button:awesome>
			</div>
			<div class="flex flex:column gap:small font-size:pop padding padding-horizontal:medium">
				<p string>Watch and Download is always <u>Free</u>.</p>
				<p string>We don't store your <u>Information</u>.</p>
				<p string>See site's <a v-bind:href="link_privacy_policy">Privacy Policy</a> and <a v-bind:href="link_term_of_use">Term's of Use</a>.</p>
			</div>
		</section>
		`,
	}))

$.vue.component ("account-avatar:anonymous", $.vue.js ({
	setup () {
		var account = {name: "Anonymous", email: "Sign In", avatar: "male_v.png"}
		if (php.google.auth.credential) account = {name: php.google.auth.profile.name, email: php.google.auth.profile.email, avatar: php.google.auth.profile.picture}
		return {account}
		},
	template: `
		<account-avatar v-bind:name="account.name" v-bind:email="account.email" v-bind:avatar="account.avatar">
			<slot name="default"/>
		</account-avatar>
		`,
	}))

$.vue.component ("notification:float", $.vue.js ({
	template: `
		<section class="flex flex:column float:size top:port right text-align:left border:radius border-radius-top-right:none background:color box-shadow no-overflow index transition:visibility">
			<div class="flex align:item gap padding padding-horizontal:medium">
				<img:logo src="google.svg" class="img:small"/>
				<string class="flex:grow font:bold">Notification</string>
				<string class="font:small font-bold:pop"></string>
			</div>
			<separator:mono />
			<div class="flex flex:column gap padding padding-horizontal:medium">
				<string class="font-bold:pop">No Activity</string>
			</div>
			<separator:mono />
			<div class="flex align:item justify:item padding padding-horizontal:medium">
				<string class="font-size:pop font-color:mono">Activity, Information Feed.</string>
			</div>
		</section>
		`,
	}))

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

$.vue.component ("nav-simple", $.vue.js ({
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
	}))

$.vue.component ("nav-simple:genre", $.vue.js ({
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
	}))

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

$.vue.component ("the-movie:nav", $.vue.js ({
	setup () {
		var css = "padding:sky"
		var data = [
			{component: "a:material", text: "ALL", description: "99 +", url: $.vue.router.link ("movie:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Popular", description: "—", url: $.vue.router.link ("movie:popular"), icon: "hotel_class", css},
			{component: "a:material", text: "Top Rated", description: "—", url: $.vue.router.link ("movie:top_rated"), icon: "local_fire_department", css},
			{component: "a:material", text: "Up Coming", description: "—", url: $.vue.router.link ("movie:up_coming"), icon: "timer_play", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Top Global", description: "0", url: $.vue.router.link ("movie:top_global"), icon: "bolt", css},
			{component: "a:material", text: "Editor Choice", description: "0", url: $.vue.router.link ("movie:editor-choice"), icon: "editor_choice", css},
			{component: "separator:mono"},
			{component: "nav-simple:genre", left: [], right: []},
			]
		return {data}
		},
	template: `
		<nav-simple text="Movie" v-bind:data="data"/>
		`,
	}))

$.vue.component ("the-tv:nav", $.vue.js ({
	setup () {
		var css = "padding:sky"
		var data = [
			{component: "a:material", text: "ALL", description: "99 +", url: $.vue.router.link ("tv:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Popular", description: "—", url: $.vue.router.link ("tv:popular"), icon: "hotel_class", css},
			{component: "a:material", text: "Top Rated", description: "—", url: $.vue.router.link ("tv:top_rated"), icon: "local_fire_department", css},
			{component: "a:material", text: "Airing Today", description: "—", url: $.vue.router.link ("tv:airing_today"), icon: "timer_play", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Top Global", description: "0", url: $.vue.router.link ("tv:top_global"), icon: "bolt", css},
			{component: "a:material", text: "Editor Choice", description: "0", url: $.vue.router.link ("tv:editor-choice"), icon: "editor_choice", css},
			{component: "separator:mono"},
			{component: "nav-simple:genre", left: [], right: []},
			]
		return {data}
		},
	template: `
		<nav-simple text="TV Show" v-bind:data="data"/>
		`,
	}))

$.vue.component ("the-people:nav", $.vue.js ({
	prop: ["position"],
	setup () {
		var css = "padding:sky"
		var data = [
			{component: "a:material", text: "ALL", description: "99 +", url: $.vue.router.link ("people:index"), icon: "more_horiz", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Male", description: "—", url: $.vue.router.link ("people:index", {}, {gender: "male"}), icon: "male", css},
			{component: "a:material", text: "Female", description: "—", url: $.vue.router.link ("people:index", {}, {gender: "female"}), icon: "female", css},
			{component: "separator:mono"},
			{component: "a:material", text: "Top Global", description: "0", url: $.vue.router.link ("people:top_global"), icon: "bolt", css},
			{component: "a:material", text: "Editor Choice", description: "0", url: $.vue.router.link ("people:editor-choice"), icon: "editor_choice", css},
			{component: "separator:mono"},
			{component: "nav-simple:genre", left: [{text: "Passed Away", url: "/"}], right: []},
			]
		return {data}
		},
	template: `
		<nav-simple text="People" v-bind:data="data" v-bind:position="prop.position"/>
		`,
	}))

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */