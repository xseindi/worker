import php from "../zend/engine";

import template_website_default_1_0_0_package from "../theme/website/default/1.0.0/package";
import template_website_default_1_0_0_app from "../theme/website/default/1.0.0/app";
import template_website_default_1_0_0_layout from "../theme/website/default/1.0.0/layout.json";
import template_website_default_1_0_0_component from "../theme/website/default/1.0.0/component.json";

import template_video_default_1_0_0_package from "../theme/video/default/1.0.0/package";
import template_video_default_1_0_0_app from "../theme/video/default/1.0.0/app";
import template_video_default_1_0_0_layout from "../theme/video/default/1.0.0/layout.json";
import template_video_default_1_0_0_component from "../theme/video/default/1.0.0/component.json";

php.theme = class {
	theme: any;
	constructor (theme: any) {
		this.theme = theme;
		}
	layout (id: string) { return new php.theme.layout (this.theme, id); }
	component (id: string) { return new php.theme.component (this.theme, id); }
	}

php.theme.layout = class {
	theme: any;
	id: string;
	markup: any;
	constructor (theme: any, id: string) {
		this.markup = (this.theme = theme).layout [this.id = id] || "";
		}
	render (variable: any = {}, tab: number = 0) {
		if (typeof variable === "number") return php.render (this.markup, {}, variable);
		else return php.render (this.markup, variable, tab);
		}
	}

php.theme.component = class {
	theme: any;
	id: string;
	markup: any;
	constructor (theme: any, id: string) {
		this.markup = (this.theme = theme).component [this.id = id] || "";
		}
	render (variable: any = {}, tab: number = 0) {
		if (typeof variable === "number") return php.render (this.markup, {}, variable);
		else return php.render (this.markup, variable, tab);
		}
	}

php.theme.template = function () {}

php.theme.template.website = {
	default: {
		"0.0.0": {layout: {}, component: {}},
		"1.0.0": {package: template_website_default_1_0_0_package, app: template_website_default_1_0_0_app, layout: template_website_default_1_0_0_layout, component: template_website_default_1_0_0_component},
		},
	}

php.theme.template.video = {
	default: {
		"0.0.0": {layout: {}, component: {}},
		"1.0.0": {package: template_video_default_1_0_0_package, app: template_video_default_1_0_0_app, layout: template_video_default_1_0_0_layout, component: template_video_default_1_0_0_component},
		},
	}

//