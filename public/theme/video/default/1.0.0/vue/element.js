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

vue.element ("img:file", {
	prop: ["src", "type"],
	setup (prop) {
		var absolute = null
		if (prop.type === "absolute") absolute = "background-image: url('/file/" + prop.src + "'); background-position: center center; background-size: cover;"
		return {absolute}
		},
	method: {
		url (src) { return "/file/" + src },
		},
	template: `
		<div v-if="absolute" class="width:height absolute top left" v-bind:style="absolute"></div>
		<img v-bind:src="url (prop.src)" v-else>
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
	prop: ["src", "type"],
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
		svg (src) { return ("/asset/image/illustration/undraw/undraw_{src}.svg").split ("{src}").join (src) },
		},
	template: `
		<img v-bind:src="svg (prop.src)">
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

vue.element ("adsterra", {
	prop: ["type"],
	template: `
		<div v-if="prop.type === 'horizontal:long'" class="flex align:item justify:item">
			<iframe src="/file/ad/adsterra-horizontal-long.html" width="728" height="90" class="border:radius border:none background-color:mono"></iframe>
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
 * the end
 *
 * xxx://xxx.xxx.xxx/xxx
 */