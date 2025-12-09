/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.element ("string", {
	template: `
		<span string>
			<slot name="default"/>
		</span>
		`,
	})

vue.element ("icon", {
	prop: ["src"],
	template: `
		<icon:material v-bind:src="prop.src">
			<slot name="default"/>
		</icon:material>
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

vue.element ("a:material", {
	prop: ["text", "description", "url", "icon"],
	template: `
		<a v-bind:href="prop.url" class="flex align:item gap font:static font:flex background-hover:mono-pop">
			<icon v-bind:src="prop.icon"/>
			<string v-if="prop.text" primary>{{ prop.text }}</string>
			<string primary v-else><slot name="default"/></string>
			<string v-if="prop.description" class="font:small font-bold:pop font-color:green">{{ prop.description }}</string>
		</a>
		`,
	})

vue.element ("button:material", {
	prop: ["text", "description", "icon", "icon-position"],
	template: `
		<button class="button background-hover:mono background-focus:mono" element="button:material">
			<div v-if="prop.text" class="flex align:item gap">
				<icon v-if="prop.icon && (prop.iconPosition !== 'right')" v-bind:src="prop.icon"/>
				<string class="flex:grow font:bold">{{ prop.text }}</string>
				<string v-if="prop.description" class="font:small font-bold:pop">{{ prop.description }}</string>
				<icon v-if="prop.icon && (prop.iconPosition === 'right')" v-bind:src="prop.icon"/>
			</div>
			<icon v-else-if="prop.icon" v-bind:src="prop.icon"/>
			<slot name="default"/>
		</button>
		`,
	})

vue.element ("button:awesome", {
	prop: ["color"],
	setup (prop) {
		return {color: ("background-color:{color} background-hover:{color}").split ("{color}").join (prop.color || "blue")}
		},
	template: `
		<button v-bind:class="['button font-color:white border-radius:round', color].join (' ')" element="button:awesome">
			<slot name="default"/>
		</button>
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

vue.element ("icon:material", {
	prop: ["src"],
	template: `
		<div class="icon:container" icon>
			<span v-if="prop.src" class="icon:material">{{ prop.src }}</span>
			<span class="icon:material" v-else><slot name="default"/></span>
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

vue.element ("images", {
	prop: ["src", "type"],
	template: `
		<img:cover v-if="prop.type === 'cover'" v-bind:src="prop.src"/>
		<img v-bind:src="prop.src" v-else>
		`,
	})

vue.element ("img:cover", {
	prop: ["src"],
	method: {
		url (src) { return "background-image: url('" + src + "'); background-position: center center; background-size: cover;" },
		},
	template: `
		<div class="absolute top left width:height" v-bind:style="url (prop.src)"></div>
		`,
	})

vue.element ("img:file", {
	prop: ["src", "type"],
	method: {
		url (src) { return "/file/" + src },
		},
	template: `
		<images v-bind:src="url (prop.src)" v-bind:type="prop.type"/>
		`,
	})

vue.element ("img:asset", {
	prop: ["src"],
	method: {
		url (src) { return "/asset/image/" + src },
		},
	template: `
		<img v-bind:src="url (prop.src)">
		`,
	})

vue.element ("img:logo", {
	prop: ["src"],
	method: {
		url (src) {
			if (typeof src === "string") if (src.startsWith ("http:") || src.startsWith ("https:")) return src
			return "/asset/image/logo/" + php.image.stock [src]
			},
		},
	template: `
		<img v-bind:src="url (prop.src)">
		`,
	})

vue.element ("img:avatar", {
	prop: ["src"],
	method: {
		url (src) {
			if (typeof src === "string") if (src.startsWith ("http:") || src.startsWith ("https:")) return src
			return "/asset/image/avatar/" + php.image.stock [src]
			},
		},
	template: `
		<img v-bind:src="url (prop.src)">
		`,
	})

vue.element ("img:undraw", {
	prop: ["src"],
	method: {
		url (src) { return ("/asset/image/illustration/undraw/undraw_{src}.svg").split ("{src}").join (src) },
		},
	template: `
		<img v-bind:src="url (prop.src)">
		`,
	})

vue.element ("img:flag", {
	prop: ["src", "type"],
	method: {
		url (src, type) {
			var path = "https://static-files.motogp.pulselive.com/assets/flags/{src}.svg"
			path = "/asset/image/flag/{src}.svg"
			if (type == "language") path = path = "/asset/image/flag/language/{src}.svg"
			return path.split ("{src}").join (src.small ())
			},
		},
	template: `
		<img v-bind:src="url (prop.src, prop.type)">
		`,
	})

vue.element ("img:spinner", {
	template: `
		<div class="spinner">
			<svg class="spinner-circular" viewBox="25 25 50 50">
				<circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
			</svg>
		</div>
		`,
	})

// https://static-files.motogp.pulselive.com/assets/flags/id.svg

/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.element ("a:genre", {
	prop: ["text"],
	setup () {},
	method: {
		css () { return "font-size:pop font-bold:pop font:static padding:pop border-radius:round border border-color:mono background-hover:mono-pop" },
		},
	template: `
		<a v-if="prop.text" v-bind:class="css ()">{{ prop.text }}</a>
		<a v-bind:class="css ()" v-else><slot name="default"/></a>
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

vue.element ("separator:mono", {
	template: `
		<div class="height background-color:mono"></div>
		`,
	})

vue.element ("separator:vertical", {
	template: `
		<div class="width height:size background-color:mono-sky"></div>
		`,
	})

vue.element ("separator:small", {
	template: `
		<div class="width height:small background-color:mono-sky"></div>
		`,
	})

vue.element ("separator:pop", {
	template: `
		<div class="width height:pop background-color:mono-sky"></div>
		`,
	})

vue.element ("separator:medium", {
	template: `
		<div class="width height:medium background-color:mono-sky"></div>
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

vue.element ("status:online", {
	template: `
		<div class="absolute border-radius:circle index" style="width: 10px; height: 10px; border: 2px solid white; bottom: -2px; right: -2px;"></div>
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

vue.element ("title-simple", {
	prop: ["text", "icon"],
	template: `
		<div class="flex align:item gap padding">
			<icon src="local_fire_department" class="font:big"/>
			<string v-if="prop.text" class="font-size:large font:bold padding">{{ prop.text }}</string>
			<string class="font-size:large font:bold padding" v-else><slot name="default"/></string>
			<div class="flex:grow"></div>
			<div></div>
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

vue.element ("img:ad", {
	prop: ["src"],
	method: {
		url (src) { return ("/ad/{src}").split ("{src}").join (src) },
		},
	template: `
		<img v-bind:src="url (prop.src)">
		`,
	})

vue.element ("adsterra", {
	prop: ["type"],
	template: `
		<div v-if="true" class="flex align:item justify:item">
			<div v-if="vue ['is:computer'] ()" class="border:radius background-color:mono" style="width: 728px; height: 90px;"></div>
			<div v-if="vue ['is:mobile'] ()" class="border:radius background-color:mono" style="width: 320px; height: 50px;"></div>
		</div>
		<div v-else-if="prop.type === 'horizontal'" class="flex align:item justify:item">
			<iframe v-if="vue ['is:computer'] ()" src="/ad/adsterra/7qvt6.html" width="728" height="90" class="border:radius border:none background-color:mono"></iframe>
			<iframe v-if="vue ['is:mobile'] ()" src="/ad/adsterra/t2738.html" width="320" height="50" class="border:radius border:none background-color:mono"></iframe>
		</div>
		<div v-else></div>
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