/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.router ("home", {
	prop: [],
	setup () {},
	template: `
		<div class="flex gap padding" computer>
			<div class="flex flex:column flex:grow gap padding:large border:radius box-shadow background-color">
				<div class="flex align:item gap">
					<div class="border-radius:circle background-color:red-pop" style="width: 8px; height: 8px;"></div>
					<div class="border-radius:circle background-color:green-pop" style="width: 8px; height: 8px;"></div>
					<div class="border-radius:circle background-color:blue-pop" style="width: 8px; height: 8px;"></div>
					<div class="flex:grow"></div>
					<div class="border-radius:circle background-color:yellow-pop" style="width: 8px; height: 8px;"></div>
				</div>
				<div class="flex flex:grow align:item justify:item"><img:undraw src="designer" height="128" class=""/></div>
				<div class="">
					<separator:mono/>
				</div>
				<div class="font:large font-bold:pop">Million's of Movie's, TV Show's and People to discover.</div>
				<div class="flex align:item gap font:big">
					<icon src="play_circle" class="text:gradient"/>
					<string>Explore now.</string>
				</div>
			</div>
			<div class="flex flex:column gap">
				<video-card:poster v-bind:data="app.data.asia.all"/>
				<video-card:poster v-bind:data="app.data.asia.all"/>
			</div>
		</div>
		<div class="padding background-color:mono-pop" mobile>
			<div class="flex flex:column flex:grow gap padding:large border:radius box-shadow background-color">
				<div class="flex align:item gap">
					<div class="border-radius:circle background-color:red-pop" style="width: 8px; height: 8px;"></div>
					<div class="border-radius:circle background-color:green-pop" style="width: 8px; height: 8px;"></div>
					<div class="border-radius:circle background-color:blue-pop" style="width: 8px; height: 8px;"></div>
					<div class="flex:grow"></div>
					<div class="border-radius:circle background-color:yellow-pop" style="width: 8px; height: 8px;"></div>
				</div>
				<div class="flex flex:grow align:item justify:item"><img:undraw src="designer" height="128" class=""/></div>
				<div class="">
					<separator:mono/>
				</div>
				<div class="font:intermediate font-bold:pop">Million's of Movie's, TV Show's and People to discover.</div>
				<div class="flex align:item gap font:large">
					<icon src="play_circle" class="text:gradient"/>
					<string>Explore now.</string>
				</div>
			</div>
		</div>
		<div class="flex flex:wrap align:item justify:item gap padding">
			<a:genre v-for="genre in app.data.genre" v-bind:href="genre.permalink" v-bind:text="genre.name"/>
		</div>
		<title-simple text="Trending" icon="local_fire_department" class="padding-bottom:none"/>
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
		<title-simple text="South Korea" icon="globe" class="padding-bottom:none"/>
		<video-card id="video-asia-KR" v-bind:data="app.data.asia.KR"/>
		<title-simple text="Japan" icon="globe" class="padding-bottom:none"/>
		<video-card id="video-asia-JP" v-bind:data="app.data.asia.JP"/>
		<title-simple text="China" icon="globe" class="padding-bottom:none"/>
		<video-card id="video-asia-CN" v-bind:data="app.data.asia.CN"/>
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