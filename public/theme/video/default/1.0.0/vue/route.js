/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.route ("home", {
	setup () {},
	template: `
		<div class="flex flex:column">
			<div class="flex gap padding" computer>
				<div class="flex flex:column flex:grow gap padding:large border:radius box-shadow background-color">
					<div class="flex align:item gap">
						<circle:pop size="8" class="background-color:red-pop"/>
						<circle:pop size="8" class="background-color:green-pop"/>
						<circle:pop size="8" class="background-color:blue-pop"/>
						<div class="flex:grow"></div>
						<circle:line size="8" class="background-color:yellow-pop"/>
						<circle:pop size="8" class="background-color:yellow-pop"/>
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
					<video-card:poster v-bind:data="vue.app.data.asia.all"/>
					<video-card:poster v-bind:data="vue.app.data.asia.all"/>
				</div>
			</div>
			<div class="padding background-color:mono" mobile>
				<div class="flex flex:column flex:grow gap padding:large border:radius box-shadow background-color">
					<div class="flex align:item gap">
						<circle:pop size="8" class="background-color:red-pop"/>
						<circle:pop size="8" class="background-color:green-pop"/>
						<circle:pop size="8" class="background-color:blue-pop"/>
						<div class="flex:grow"></div>
						<circle:line size="8" class="background-color:yellow-pop"/>
						<circle:pop size="8" class="background-color:yellow-pop"/>
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
				<a:genre v-for="genre in vue.app.data.genre" v-bind:href="genre.permalink" v-bind:text="genre.name"/>
			</div>
			<title-simple text="Trending" icon="local_fire_department" class="padding-bottom:none"/>
			<video-card id="video-trending" v-bind:data="vue.app.data.trending.today"/>
			<adsterra type="horizontal"/>
			<title-simple text="Must Watch" icon="local_fire_department" class="padding-bottom:none"/>
			<video-card id="video-mw" item="item:best" v-bind:option="{shuffle: true}"/>
			<adsterra type="horizontal"/>
			<title-simple text="Movie" icon="movie" class="padding-bottom:none"/>
			<video-card id="video-movie" v-bind:data="vue.app.data.movie.popular"/>
			<adsterra type="horizontal"/>
			<title-simple text="TV Show" icon="tv_guide" class="padding-bottom:none"/>
			<video-card id="video-tv" v-bind:data="vue.app.data.tv.popular" v-bind:option="{icon: 'tv_guide'}"/>
			<adsterra type="horizontal"/>
			<title-simple text="South Korea" icon="globe" class="padding-bottom:none"/>
			<video-card id="video-asia-KR" v-bind:data="vue.app.data.asia.KR"/>
			<title-simple text="Japan" icon="globe" class="padding-bottom:none"/>
			<video-card id="video-asia-JP" v-bind:data="vue.app.data.asia.JP"/>
			<title-simple text="China" icon="globe" class="padding-bottom:none"/>
			<video-card id="video-asia-CN" v-bind:data="vue.app.data.asia.CN"/>
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

vue.route ("listing", {
	setup () {
		var page = (lib.url.document.query.get ("page") || 1).integer ()
		var variable = vue.app.variable
		if (variable.data) {}
		else if (variable.cache) variable.data = vue.app.data [variable.cache].popular
		else variable.data = []
		var data = vue.reactive ({list: variable.data, page})
		if (false) if (data.page > 1) lib.timeout (function () { data.list = vue.app.data.tv.popular }, 3)
		return {variable, data}
		},
	method: {
		ico (type) {
			if (type === "movie") return "movie"
			else if (type === "tv") return "tv_guide"
			else return icon || "movie"
			},
		paging (current) {
			current = current.integer ()
			var page = []
			var stage = 2
			var left = current - stage
			var right = current + stage
			if (current <= stage) {
				// left = 1
				// right = (stage * 2) + left
				}
			for (var i = left; i <= right; i ++) page.push (i)
			return page
			},
		paging_style (current, page) {
			if (current === page) return "font-weight: bold; text-decoration: underline;"
			else return ""
			},
		paging_number (page) {
			if (page === 0) return "500"
			else if (page === - 1) return "499"
			else if (page === 501) return "1"
			else if (page === 502) return "2"
			else return page
			},
		paging_url (page) {
			var p = 1
			if (page === 0) p = 500
			else if (page === - 1) p = 499
			else if (page === 501) p = 1
			else if (page === 502) p = 2
			else p = page
			var url = lib.url.document.path + '?page=' + p
			return url
			},
		paging_back (page) {
			page = page - 1
			// if (page < 1) page = 1
			if (page === 0) page = 500
			if (page === - 1) page = 499
			var url = lib.url.document.path + '?page=' + page
			return url
			},
		paging_next (page) {
			page = page + 1
			// if (page > 500) page = 500
			if (page === 501) page = 1
			if (page === 502) page = 2
			var url = lib.url.document.path + '?page=' + page
			return url
			},
		grid (computer) {
			if (computer) return "grid-template-columns: repeat(5, 1fr); grid-gap: 10px;"
			else return "grid-template-columns: repeat(2, 1fr); grid-gap: 10px;"
			},
		},
	template: `
		<div class="flex flex:column">
			<title-simple v-bind:text="variable.title" v-bind:icon="variable.icon" class="padding-bottom:none"/>
			<div class="grid padding" v-bind:style="grid (vue.device.computer ())">
				<div v-for="data in data.list" class="flex flex:column gap:small width:max" item>
					<div class="relative border:radius no-overflow">
						<img:asset src="3x4.svg" class="width:height"/>
						<a v-bind:href="data.permalink"><img:cover v-bind:src="data.poster.url" class="opacity:small transition:opacity"/></a>
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
					<string class="font-size:pop font-color:mono padding-top:small">{{ data ["release_date:string"] }}</string>
					<a v-bind:href="data.permalink" class="font-bold:pop font:static" style="height: 40px;" string>{{ data.title }}</a>
				</div>
			</div>
			<div class="flex align:item gap padding">
				<a v-bind:href="paging_back (data.page)" class="flex align:item gap padding:sky font-bold:pop font:static border-radius:round background-color:mono">
					<icon src="arrow_left_alt"/>
					<string>Back</string>
				</a>
				<div v-if="vue.device.computer ()" class="flex flex:grow align:item justify:item gap:small paging">
					<a v-for="page in paging (data.page)" v-bind:href="paging_url (page)" class="font-bold:pop font:static border-radius:regular background-color:mono" v-bind:style="paging_style (data.page, page)">
						{{ paging_number (page) }}
					</a>
				</div>
				<flex:grow v-else/>
				<a v-bind:href="paging_next (data.page)" class="flex align:item gap padding:sky font-bold:pop font:static border-radius:round background-color:mono">
					<string>Next</string>
					<icon src="arrow_right_alt"/>
				</a>
			</div>
			<div class="flex align:item justify:item gap:small padding paging" mobile>
				<a v-for="page in paging (data.page)" v-bind:href="paging_url (page)" class="font-bold:pop font:static border-radius:regular background-color:mono" v-bind:style="paging_style (data.page, page)">
					{{ page }}
				</a>
			</div>
			<div class="padding">
				<adsterra type="horizontal"/>
			</div>
		</div>
		`,
	})

vue.route ("listing:all", {
	setup () {
		var page = (lib.url.document.query.get ("page") || 1).integer ()
		var variable = vue.app.variable
		if (variable.data) {}
		else if (variable.cache) variable.data = vue.app.data [variable.cache].popular
		else variable.data = []
		var data = vue.reactive ({list: variable.data, page})
		if (false) if (data.page > 1) lib.timeout (function () { data.list = vue.app.data.tv.popular }, 3)
		return {variable, data}
		},
	method: {
		ico (type) {
			if (type === "movie") return "movie"
			else if (type === "tv") return "tv_guide"
			else return icon || "movie"
			},
		paging (current) {
			current = current.integer ()
			var page = []
			var stage = 2
			var left = current - stage
			var right = current + stage
			if (current <= stage) {
				left = 1
				right = (stage * 2) + left
				}
			for (var i = left; i <= right; i ++) page.push (i)
			return page
			},
		paging_style (current, page) {
			if (current === page) return "font-weight: bold; text-decoration: underline;"
			else return ""
			},
		paging_url (page) {
			var url = lib.url.document.path + '?page=' + page
			return url
			},
		paging_back (page) {
			page = page - 1
			if (page < 1) page = 1
			var url = lib.url.document.path + '?page=' + page
			return url
			},
		paging_next (page) {
			page = page + 1
			if (page > 500) page = 500
			var url = lib.url.document.path + '?page=' + page
			return url
			},
		grid (computer) {
			if (computer) return "grid-template-columns: repeat(5, 1fr); grid-gap: 10px;"
			else return "grid-template-columns: repeat(2, 1fr); grid-gap: 10px;"
			},
		},
	template: `
		<div class="flex flex:column">
			<title-simple v-bind:text="variable.title" v-bind:icon="variable.icon" class="padding-bottom:none"/>
			<div class="grid padding" v-bind:style="grid (vue.device.computer ())">
				<div v-for="data in data.list" class="flex flex:column gap:small width:max" item>
					<div class="relative border:radius no-overflow">
						<img:asset src="3x4.svg" class="width:height"/>
						<a v-bind:href="data.permalink"><img:cover v-bind:src="data.poster.url" class="opacity:small transition:opacity"/></a>
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
					<string class="font-size:pop font-color:mono padding-top:small">{{ data ["release_date:string"] }}</string>
					<a v-bind:href="data.permalink" class="font-bold:pop font:static" style="height: 40px;" string>{{ data.title }}</a>
				</div>
			</div>
			<div class="flex align:item gap padding">
				<a v-bind:href="paging_back (data.page)" class="flex align:item gap padding:sky font-bold:pop font:static border-radius:round background-color:mono">
					<icon src="arrow_left_alt"/>
					<string>Back</string>
				</a>
				<div v-if="vue.device.computer ()" class="flex flex:grow align:item justify:item gap:small paging">
					<a v-for="page in paging (data.page)" v-bind:href="paging_url (page)" class="font-bold:pop font:static border-radius:regular background-color:mono" v-bind:style="paging_style (data.page, page)">
						{{ page }}
					</a>
				</div>
				<flex:grow v-else/>
				<a v-bind:href="paging_next (data.page)" class="flex align:item gap padding:sky font-bold:pop font:static border-radius:round background-color:mono">
					<string>Next</string>
					<icon src="arrow_right_alt"/>
				</a>
			</div>
			<div class="flex align:item justify:item gap:small padding paging" mobile>
				<a v-for="page in paging (data.page)" v-bind:href="paging_url (page)" class="font-bold:pop font:static border-radius:regular background-color:mono" v-bind:style="paging_style (data.page, page)">
					{{ page }}
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

vue.route ("page", {
	setup () {
		return {variable: vue.app.variable}
		},
	template: ``,
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

vue.route ("page:privacy-policy", {
	setup () {
		return {variable: vue.app.variable}
		},
	template: `
<div class="padding:horizontal">
<h1>{{ variable.title }}</h1>
<p>Last updated: {{ variable.last_update }}</p>
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
<p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to {{ variable.name }}.</p>
</li>
<li>
<p><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</p>
</li>
<!--li>
<p><strong>Country</strong> refers to: Alaska,  United States</p>
</li-->
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
<p><strong>Website</strong> refers to {{ variable.name }}, accessible from <a v-bind:href="variable.base_url" rel="external nofollow noopener" target="_blank">{{ variable.base_url }}</a></p>
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
<p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.</p>
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
<p>By email: {{ variable.email }}</p>
</li>
<li>
<p>By visiting this page on our website: <a v-bind:href="variable.url" rel="external nofollow noopener" target="_blank">{{ variable.url }}</a></p>
</li>
</ul>
</div>
		`,
	})

vue.route ("page:cookie-preference", {
	setup () {
		return {variable: vue.app.variable}
		},
	template: `
<div class="padding:horizontal">
<h1>{{ variable.title }}</h1>
<p>We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies We use include beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</p>
<ul>
<li><strong>Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</li>
<li><strong>Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</li>
</ul>
<p>Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.</p>
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

vue.route ("page:DMCA", {
	setup () {
		return {variable: vue.app.variable}
		},
	template: `
<div class="padding:horizontal">
<h1>{{ variable.title }}</h1>
<p>This Digital Millennium Copyright Act policy (“Policy”) applies to the <a v-bind:href="variable.base_url">{{ lib.url.document.host.name }}</a> website (“Website” or “Service”) and any of its related products and services (collectively, “Services”) and outlines how {{ variable.name }} (“{{ variable.name }}”, “we”, “us” or “our”) addresses copyright infringement notifications and how you (“you” or “your”) may submit a copyright infringement complaint.</p>
<p>Protection of intellectual property is of utmost importance to us and we ask our users and their authorized agents to do the same. It is our policy to expeditiously respond to clear notifications of alleged copyright infringement that comply with the United States Digital Millennium Copyright Act (“DMCA”) of 1998, the text of which can be found at the U.S. Copyright Office.</p>
<div class="index"><h3>Table of contents</h3><ol class="index"><li><a href="#what-to-consider-before-submitting-a-copyright-complaint">What to consider before submitting a copyright complaint</a></li><li><a href="#notifications-of-infringement">Notifications of infringement</a></li><li><a href="#counter-notifications">Counter-notifications</a></li><li><a href="#changes-and-amendments">Changes and amendments</a></li><li><a href="#reporting-copyright-infringement">Reporting copyright infringement</a></li></ol></div>
<h2 id="what-to-consider-before-submitting-a-copyright-complaint">What to consider before submitting a copyright complaint</h2>
<p>Before submitting a copyright complaint to us, consider whether the use could be considered fair use. Fair use states that brief excerpts of copyrighted material may, under certain circumstances, be quoted verbatim for purposes such as criticism, news reporting, teaching, and research, without the need for permission from or payment to the copyright holder. If you have considered fair use, and you still wish to continue with a copyright complaint, you may want to first reach out to the user in question to see if you can resolve the matter directly with the user.</p>
<p>Please note that if you are unsure whether the material you are reporting is in fact infringing, you may wish to contact an attorney before filing a notification with us.</p>
<p>We may, at our discretion or as required by law, share a copy of your notification or counter-notification with third parties. This may include sharing the information with the account holder engaged in the allegedly infringing activity or for publication.</p>
<h2 id="notifications-of-infringement">Notifications of infringement</h2>
<p>If you are a copyright owner or an agent thereof, and you believe that any material available on our Services infringes your copyrights, then you may submit a written copyright infringement notification (“Notification”) using the contact details below pursuant to the DMCA. All such Notifications must comply with the DMCA requirements.</p>
<p>Filing a DMCA complaint is the start of a pre-defined legal process. Your complaint will be reviewed for accuracy, validity, and completeness. If your complaint has satisfied these requirements, our response may include the removal or restriction of access to allegedly infringing material as well as a permanent termination of repeat infringers’ accounts. A backup of the terminated account’s data may be requested, however, we may not be able to provide you with one and, as such, you are strongly encouraged to take your own backups.</p>
<p>If we remove or restrict access to materials or terminate an account in response to a Notification of alleged infringement, we will make a good faith effort to contact the affected user with information concerning the removal or restriction of access, which may include a full copy of your Notification (including your name, address, phone, and email address), along with instructions for filing a counter-notification.</p>
<p>Notwithstanding anything to the contrary contained in any portion of this Policy, {{ variable.name }} reserves the right to take no action upon receipt of a DMCA copyright infringement notification if it fails to comply with all the requirements of the DMCA for such notifications.</p>
<h2 id="counter-notifications">Counter-notifications</h2>
<p>A user who receives a copyright infringement Notification may make a counter-Notification pursuant to sections 512(g)(2) and (3) of the US Copyright Act. If you receive a copyright infringement Notification, it means that the material described in the Notification has been removed from our Services or access to the material has been restricted. Please take the time to read through the Notification, which includes information on the Notification we received. To file a counter-notification with us, you must provide a written communication compliant with the DMCA requirements.</p>
<p>Please note that if you are not sure whether certain material infringes the copyrights of others or that the material or activity was removed or restricted by mistake or misidentification, you may wish to contact an attorney before filing a counter-notification.</p>
<p>Notwithstanding anything to the contrary contained in any portion of this Policy, {{ variable.name }} reserves the right to take no action upon receipt of a counter-notification. If we receive a counter-notification that complies with the terms of 17 U.S.C. § 512(g), we may forward it to the person who filed the original Notification.</p>
<p>The process described in this Policy does not limit our ability to pursue any other remedies we may have to address suspected infringement.</p>
<h2 id="changes-and-amendments">Changes and amendments</h2>
<p>We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page, post a notification on the main page of the Website. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</p>
<p>An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other act specified at that time) will constitute your consent to those changes.</p>
<h2 id="reporting-copyright-infringement">Reporting copyright infringement</h2>
<p>If you would like to notify us of the infringing material or activity, we encourage you to contact us using the details below:</p>
<p><a v-bind:href="'mailto:' + variable.email">{{ variable.email }}</a></p>
<p>This document was last updated on {{ variable.last_update }}
</div>
	`,
	})

vue.route ("page:disclaimer", {
	setup () {
		return {variable: vue.app.variable}
		},
	template: `
<div class="padding:horizontal">
<h1>{{ variable.title }}</h1>
<p>Last updated: {{ variable.last_update }}</p>
<h2>Interpretation and Definitions</h2>
<h3>Interpretation</h3>
<p>The words whose initial letters are capitalized have meanings defined under the following conditions.
The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
<h3>Definitions</h3>
<p>For the purposes of this Disclaimer:</p>
<ul>
<li><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Disclaimer) refers to {{ variable.name }}.</li>
<li><strong>Service</strong> refers to the Website.</li>
<li><strong>You</strong> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
<li><strong>Website</strong> refers to {{ variable.name }}, accessible from <a v-bind:href="variable.base_url" rel="external nofollow noopener" target="_blank">{{ variable.base_url }}</a></li>
</ul>
<h2>Disclaimer</h2>
<p>The information contained on the Service is for general information purposes only.</p>
<p>The Company assumes no responsibility for errors or omissions in the contents of the Service.</p>
<p>In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice.</p>
<p>The Company does not warrant that the Service is free of viruses or other harmful components.</p>
<h2>External Links Disclaimer</h2>
<p>The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.</p>
<p>Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
<h2>Errors and Omissions Disclaimer</h2>
<p>The information given by the Service is for general guidance on matters of interest only. Even if the Company takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur. Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.</p>
<p>The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.</p>
<h2>Fair Use Disclaimer</h2>
<p>The Company may use copyrighted material which has not always been specifically authorized by the copyright owner. The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.</p>
<p>The Company believes this constitutes a &quot;fair use&quot; of any such copyrighted material as provided for in section 107 of the United States Copyright law.</p>
<p>If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.</p>
<h2>Views Expressed Disclaimer</h2>
<p>The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.</p>
<p>Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment. The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.</p>
<h2>No Responsibility Disclaimer</h2>
<p>The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services. As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.</p>
<p>In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.</p>
<h2>&quot;Use at Your Own Risk&quot; Disclaimer</h2>
<p>All information in the Service is provided &quot;as is&quot;, with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.</p>
<p>The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.</p>
<h2>Contact Us</h2>
<p>If you have any questions about this Disclaimer, You can contact Us:</p>
<ul>
<li>
<p>By email: {{ variable.email }}</p>
</li>
<li>
<p>By visiting this page on our website: <a v-bind:href="variable.url.contact" rel="external nofollow noopener" target="_blank">{{ variable.url.contact }}</a></p>
</li>
</ul>
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
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.route ("under-construction", {
	setup () {
		return {variable: vue.app.variable}
		},
	template: `
		<div class="flex flex:column">
			<title-simple v-bind:text="variable.title" v-bind:icon="variable.icon" class="padding-bottom:none"/>
			<div class="flex align:item justify:item padding-vertical:big">
				<img:undraw src="construction_worker" class="" width="280"/>
			</div>
		</div>
		`,
	})

/**
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */