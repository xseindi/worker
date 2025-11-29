/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

$.vue.component ("div:loading", {
	setup () {
		return $.vue ()
		},
	template: `
		<div id="loading">loading ...</div>
		`,
	})

$.vue.component ("account:avatar", $.vue.js ({
	prop: ["name", "email", "avatar"],
	setup () {
		return {}
		},
	template: `
		<button class="button padding:pop" component="account:avatar">
			<div class="flex align:item gap">
				<div class="flex flex:column gap:tiny justify:item text-align:right">
					<div class="font-bold:pop" string>{{ prop.name }}</div>
					<div class="font-size:pop font-bold:pop font-color:mono" string>{{ prop.email }}</div>
				</div>
				<separator:small separator/>
				<div class="relative">
					<img:avatar v-bind:src="prop.avatar" class="size:regular border-radius:circle background-color:mono"/>
					<div class="absolute border-radius:circle index" style="width: 10px; height: 10px; border: 2px solid white; bottom: -2px; right: -2px; background-color: rgb(var(--green-pop));"></div>
				</div>
			</div>
			<slot name="default"/>
		</button>
		`,
	}))

$.vue.component ("account-avatar:guest", $.vue.js ({
	template: `
		<account:avatar name="Anonymous" email="Sign In" avatar="male_v.png">
			<slot name="default"/>
		</account:avatar>
		`,
	}))

$.vue.component ("header:float", $.vue.js ({
	setup () {
		return $.vue ()
		},
	mount () {
		$.vue.mount.search ()
		},
	method: {
		is_ready (element) {
			console.log (element)
			},
		},
	template: `
		<div id="header-float" class="flex align:item gap header:size width:size fixed background-color:alpha box-shadow index:tiny" component="header:float">
			<div class="padding:left" phone>
				<button:float icon="menu" class="header:size --icon-large"></button:icon>
			</div>
			<div class="padding-left:small" computer></div>
			<logo:simple />
			<div class="flex align:item justify:item flex:grow">
				<div class="flex align:item gap">
					<button:material text="G Movie" icon="arrow_drop_down" position="reverse" class="font-bold:pop padding border:radius border-radius-bottom:none background-hover:mono">
						<section class="flex flex:column float:size top:port left font:regular text-align:left border:radius border-radius-top-left:none background:color box-shadow no-overflow index:medium transition:visibility">
							<a:simple icon="more_horiz" description="99 +">
								ALL
							</a:simple>
							<separator:mono separator/>
							<a:simple icon="hotel_class" description="&#x2197;">
								Popular
							</a:simple>
							<a:simple icon="local_fire_department" description="&#x27A1;">
								Top Rated
							</a:simple>
							<a:simple icon="timer_play" description="&#x2198;">
								Up Coming
							</a:simple>
							<separator:mono separator/>
							<a:simple icon="bolt" description="0">
								Top Global
							</a:simple>
							<a:simple icon="editor_choice" description="0">
								Editor Choice
							</a:simple>
							<separator:mono separator/>
							<div class="flex font-size:small text-align:left gap padding">
								<div class="flex flex:column flex:grow">
									<a href="https://bioskopress.com/movie/genre/12/adventure/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Adventure</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/14/fantasy/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Fantasy</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/16/animation/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Animation</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/18/drama/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Drama</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/27/horror/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Horror</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/28/action/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Action</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/35/comedy/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Comedy</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/36/history/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">History</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/37/western/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Western</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/53/thriller/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Thriller</span>
									</a>
								</div>
								<div class="flex flex:column flex:grow">
									<a href="https://bioskopress.com/movie/genre/80/crime/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Crime</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/99/documentary/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Documentary</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/878/science-fiction/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Science Fiction</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/9648/mystery/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Mystery</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/10402/music/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Music</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/10749/romance/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Romance</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/10751/family/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">Family</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/10752/war/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">War</span>
									</a>
									<a href="https://bioskopress.com/movie/genre/10770/tv-movie/" class="flex align:item gap padding:small padding:horizontal">
										<span class="flex:grow">TV Movie</span>
									</a>
								</div>
							</div>
						</section>
					</button:material>
					<button:material text="TV Show" icon="arrow_drop_down" position="reverse" class="font-bold:pop padding icon:medium border:radius border-radius-bottom:none background-hover:mono">
					</button:material>
					<button:material text="People" icon="arrow_drop_down" position="reverse" class="font-bold:pop padding icon:medium border:radius border-radius-bottom:none background-hover:mono">
					</button:material>
				</div>
			</div>
			<div class="flex align:item gap:tiny padding:right">
				<account-avatar:guest class="border:radius border-radius-bottom:none border-hover:mono">
					<section class="flex flex:column float:medium top:port right text-align:left border:radius border-radius-top-right:none background:color box-shadow no-overflow index:medium transition:visibility">
						<div class="flex align:item gap padding padding-horizontal:medium">
							<img:logo src="google.svg" class="img:tiny"/>
							<p class="font:bold" string>Account Manager</p>
							<span class="font:small" string></span>
						</div>
						<separator:mono separator/>
						<div class="flex align:item gap padding padding-horizontal:medium">
							<icon:material src="person_shield" class="font:big text:gradient" icon/>
							<div class="flex flex:column gap:tiny">
								<p class="font-bold:pop" string>Sign Up</p>
								<span class="font-size:pop font-color:mono" string>Under Construction</span>
							</div>
						</div>
						<div class="padding-horizontal:medium">
							<button:cool v-on:click="vue.router.reload ()" class="flex align:item justify:item width:size padding" string>Continue as Guest</button:cool>
						</div>
						<div class="flex flex:column gap:small font-size:pop padding padding-horizontal:medium">
							<p string>We keep your <u>Information</u> Safe.</p>
							<p string>Watch and Download is always <u>Free</u>.</p>
							<p string>Just follow <a href="/">Privacy Policy</a> and <a href="/">Term's of Use</a>.</p>
						</div>
					</section>
				</account-avatar:guest>
				<button:material icon="notifications_unread" class="icon:large border:radius border-radius-bottom:none background-hover:mono">
					<section class="flex flex:column float:size top:port right text-align:left border:radius border-radius-top-right:none background:color box-shadow no-overflow index:medium transition:visibility">
						<div class="flex align:item gap padding padding-horizontal:medium">
							<img:logo src="google.svg" class="img:tiny"/>
							<p class="font:bold" string>Notification</p>
							<span class="font:small" string></span>
						</div>
						<separator:mono separator/>
						<div class="flex align:item padding padding-horizontal:medium">
							<p class="font-bold:pop" string>No Activity</p>
						</div>
						<separator:mono separator/>
						<div class="flex align:item justify:item padding padding-horizontal:medium">
							<p class="font-size:pop font-color:mono" string>Activity, Information Feed.</p>
						</div>
					</section>
				</button:material>
				<button:material id="search-button" icon="search" class="icon:large border-radius:pop background-hover:mono"/>
			</div>
		</div>
		<div id="search-form" class="flex align:item header:size width:size fixed padding:right background-color:alpha index:small" style="display: none">
			<input id="search-input" type="search" class="flex:grow header:size font:medium padding-left:medium border:none" placeholder="Search something ...">
			<button:material id="search-button-submit" icon="search" class="icon:large"/>
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

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */