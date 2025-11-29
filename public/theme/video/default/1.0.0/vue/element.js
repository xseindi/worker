/**
 * xxx
 *
 * title
 * description
 * sub description
 *
 * xxx://xxx.xxx.xxx/xxx
 */

$.vue.element ("string", $.vue.js ({
	template: `
		<span string>
			<slot name="default"/>
		</span>
		`,
	}))

$.vue.element ("icon", $.vue.js ({
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

$.vue.element ("logo:simple", $.vue.js ({
	prop: ["src", "title", "description"],
	template: `
		<a href="/" class="flex align:item gap" element="logo:simple">
			<div><img v-bind:src="prop.src || app.image.logo" class="img:size"></div>
			<div class="flex flex:column gap:tiny">
				<p class="font-family:logo font:intermediate font:bold text:gradient">{{ prop.title || app.var ["site:name"] }}</p>
				<span class="font:small font:bold a:static" string>{{ prop.description || app.var ["site:description"] }}</span>
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

$.vue.element ("a:simple", $.vue.js ({
	prop: ["icon", "description"],
	template: `
		<a class="a:simple a:static">
			<icon:material v-bind:src="prop.icon" icon/>
			<p primary string><slot name="default"/></p>
			<span v-if="prop.description" class="font:small font-bold:pop font-color:green-pop" string>{{ prop.description }}</span>
		</a>
		`,
	}))

$.vue.element ("button:material", $.vue.js ({
	prop: ["text", "description", "icon", "position"],
	template: `
		<button class="button background-hover:mono" element="button:material">
			<div v-if="prop.text" class="flex align:item gap">
				<icon v-if="prop.icon && (prop.position !== 'reverse')" v-bind:src="prop.icon"/>
				<string class="flex:grow font:bold">{{ prop.text }}</string>
				<string v-if="prop.description" class="font:small font-bold:pop">{{ prop.description }}</string>
				<icon v-if="prop.icon && (prop.position === 'reverse')" v-bind:src="prop.icon"/>
			</div>
			<icon v-else-if="prop.icon" v-bind:src="prop.icon"/>
			<slot name="default"/>
		</button>
		`,
	}))

$.vue.element ("button:awesome", $.vue.js ({
	prop: ["color"],
	setup (prop) {
		var color = "background-color:blue-ray background-hover:blue-ray"
		if (prop.color === "red") color = "background-color:red-pop background-hover:red-pop"
		if (prop.color === "green") color = "background-color:green-pop background-hover:green-pop"
		if (prop.color === "blue") color = "background-color:blue-pop background-hover:blue-pop"
		return {color}
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

$.vue.element ("icon:material", $.vue.js ({
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

$.vue.element ("img:logo", $.vue.js ({
	prop: ["src"],
	method: {
		url (src) { return "/asset/image/logo/" + src },
		},
	template: `
		<img v-bind:src="url (prop.src)">
		`,
	}))

$.vue.element ("img:avatar", $.vue.js ({
	prop: ["src"],
	method: {
		url (src) { return "/asset/image/avatar/" + src },
		},
	template: `
		<img v-bind:src="url (prop.src)">
		`,
	}))

$.vue.element ("img:undraw", $.vue.js ({
	prop: ["src"],
	method: {
		svg (src) { return ("/asset/image/illustration/undraw/undraw_{src}.svg").split ("{src}").join (src) },
		},
	template: `
		<img v-bind:src="svg (prop.src)">
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

$.vue.element ("separator:mono", $.vue.js ({
	template: `
		<div class="height background-color:mono"></div>
		`,
	}))

$.vue.element ("separator:vertical", $.vue.js ({
	template: `
		<div class="width height:size background-color:mono-sky"></div>
		`,
	}))

$.vue.element ("separator:small", $.vue.js ({
	template: `
		<div class="width height:small background-color:mono-sky"></div>
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