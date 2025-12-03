/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.layout ("default", vue.js ({
	template: `
		<div layout="default">layout:default</div>
		`,
	}))

vue.layout ("index", vue.js ({
	mount () {
		vue.mount.layout ()
		},
	template: `
		<div layout="index" class="flex flex:column height:size">
			<header id="header" class="header:size relative index:large">
				<header:float></header:float>
			</header>
			<main class="flex flex:grow index">
				<menu id="menu">
					menu
				</menu>
				<main id="main" class="flex flex:column flex:grow">
					<div class="flex align:item justify:item padding:vertical" phone>
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

vue.layout (404, vue.js ({
	template: `
		<div layout="404">not found</div>
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

vue.component ("header:float", vue.js ({
	mount () {
		vue.mount.search ()
		},
	template: `
		<div id="header-float" class="flex align:item gap header:size width:size fixed background-color:alpha box-shadow index:tiny" component="header:float">
			<div class="padding:left" phone>
				<button:float icon="menu" class="header:size --icon-large"></button:icon>
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
				<button:material icon="notifications_unread" class="icon:large padding:pop border:radius border-radius-bottom:none">
					<notification:float />
				</button:material>
				<account-avatar:anonymous class="border:radius border-radius-bottom:none border-hover:mono-pop">
					<account-avatar:float />
				</account-avatar:anonymous>
			</div>
		</div>
		<div id="search-form" class="flex align:item header:size width:size fixed padding:right background-color:alpha index:small" style="display: none">
			<input id="search-input" type="search" class="flex:grow header:size font:medium padding-left:medium border:none" placeholder="Search something ...">
			<button:material id="search-button-submit" icon="search" class="icon:large padding:pop border-radius:pop"/>
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
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */