/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

vue.element ("string", vue.js ({
	template: `
		<span string>
			<slot name="default"/>
		</span>
		`,
	}))

vue.element ("icon", vue.js ({
	prop: ["src"],
	template: `
		<icon:material v-bind:src="prop.src">
			<slot name="default"/>
		</icon:material>
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

vue.element ("a:material", vue.js ({
	prop: ["text", "description", "url", "icon"],
	template: `
		<a v-bind:href="prop.url" class="flex align:item gap font:static font:flex background-hover:mono-pop">
			<icon v-bind:src="prop.icon"/>
			<string v-if="prop.text" primary>{{ prop.text }}</string>
			<string primary v-else><slot name="default"/></string>
			<string v-if="prop.description" class="font:small font-bold:pop font-color:green">{{ prop.description }}</string>
		</a>
		`,
	}))

vue.element ("button:material", vue.js ({
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
	}))

vue.element ("button:awesome", vue.js ({
	prop: ["color"],
	setup (prop) {
		return {color: ("background-color:{color} background-hover:{color}").split ("{color}").join (prop.color || "blue")}
		},
	template: `
		<button v-bind:class="['button font-color:white border-radius:round', color].join (' ')" element="button:awesome">
			<slot name="default"/>
		</button>
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

vue.element ("icon:material", vue.js ({
	prop: ["src"],
	template: `
		<div class="icon:container" icon>
			<span v-if="prop.src" class="icon:material">{{ prop.src }}</span>
			<span class="icon:material" v-else><slot name="default"/></span>
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

vue.element ("img:logo", vue.js ({
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
	}))

vue.element ("img:avatar", vue.js ({
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
	}))

vue.element ("img:undraw", vue.js ({
	prop: ["src"],
	method: {
		svg (src) { return ("/asset/image/illustration/undraw/undraw_{src}.svg").split ("{src}").join (src) },
		},
	template: `
		<img v-bind:src="svg (prop.src)">
		`,
	}))

vue.element ("img:spinner", vue.js ({
	template: `
		<div class="spinner">
			<svg class="spinner-circular" viewBox="25 25 50 50">
				<circle class="spinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
			</svg>
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

vue.element ("separator:mono", vue.js ({
	template: `
		<div class="height background-color:mono"></div>
		`,
	}))

vue.element ("separator:vertical", vue.js ({
	template: `
		<div class="width height:size background-color:mono-sky"></div>
		`,
	}))

vue.element ("separator:small", vue.js ({
	template: `
		<div class="width height:small background-color:mono-sky"></div>
		`,
	}))

vue.element ("separator:pop", vue.js ({
	template: `
		<div class="width height:pop background-color:mono-sky"></div>
		`,
	}))

vue.element ("separator:medium", vue.js ({
	template: `
		<div class="width height:medium background-color:mono-sky"></div>
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

vue.element ("status:online", vue.js ({
	template: `
		<div class="absolute border-radius:circle index" style="width: 10px; height: 10px; border: 2px solid white; bottom: -2px; right: -2px;"></div>
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