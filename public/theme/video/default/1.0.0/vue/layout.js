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
					<router v-bind:src="app.router"/>
					<div><img:undraw src="cloud" class="img:big"/></div>
					<footer id="footer" class="flex flex:column padding">
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
								<a:material v-bind:text="'About'" v-bind:href="'/'" v-bind:icon="'description'" class="padding:io border:radius"/>
								<a:material v-bind:text="'Contact'" v-bind:href="'/'" v-bind:icon="'contacts'" class="padding:io border:radius"/>
								<a:material v-bind:text="'Blog'" v-bind:href="'/'" v-bind:icon="'link'" class="padding:io border:radius"/>
							</div>
							<div class="" style="min-width: 200px;">
								<a:material v-bind:text="'Privacy Policy'" v-bind:href="'/'" v-bind:icon="'health_and_safety'" class="padding:io border:radius"/>
								<a:material v-bind:text="'Terms of Use'" v-bind:href="'/'" v-bind:icon="'settings_accessibility'" class="padding:io border:radius"/>
								<a:material v-bind:text="'Cookie Preference'" v-bind:href="'/'" v-bind:icon="'cookie'" class="padding:io border:radius"/>
								<a:material v-bind:text="'Disclaimer'" v-bind:href="'/'" v-bind:icon="'safety_check'" class="padding:io border:radius"/>
								<a:material v-bind:text="'DMCA'" v-bind:href="'/'" v-bind:icon="'admin_panel_settings'" class="padding:io border:radius"/>
								<a:material v-bind:text="'Sitemap'" v-bind:href="'/'" v-bind:icon="'rss_feed'" class="padding:io border:radius"/>
							</div>
							<div class="" style="min-width: 10px;"></div>
						</div>
						<div class="flex flex:column align:item gap:small font:tiny padding padding-bottom:none">
							<string>Copyright &copy; 2025 <a href="/">{{ app.var ["site:name"] }}</a></string>
							<string>All Right's Reserved</string>
							<string>Logo's Trademark's on this Site are the Property of their Respective Owner</string>
							<string>Web Engine Code and Design is Powered by <a href="/">{{ app.var ["site:name"] }}</a></string>
							<div></div>
							<string class="font:tiny font-color:mono">Version (1.0.0)</string>
						</div>
					</footer>
				</main>
			</main>
			<!--footer id="footer">
				footer
			</footer-->
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