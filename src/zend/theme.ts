import php from "../zend/engine";

import template_website_default_1_0_0_layout from "../theme/website/default/1.0.0/layout.json";
import template_website_default_1_0_0_component from "../theme/website/default/1.0.0/component.json";

import template_video_default_1_0_0_layout from "../theme/video/default/1.0.0/layout.json";
import template_video_default_1_0_0_component from "../theme/video/default/1.0.0/component.json";

php.theme = class {
	constructor () {
		//
		}
	}

php.theme.template = function () {}

php.theme.template.website = {
	default: {
		"0.0.0": {layout: {}, component: {}},
		"1.0.0": {layout: template_website_default_1_0_0_layout, component: template_website_default_1_0_0_component},
		},
	}

php.theme.template.video = {
	default: {
		"0.0.0": {layout: {}, component: {}},
		"1.0.0": {layout: template_video_default_1_0_0_layout, component: template_video_default_1_0_0_component},
		},
	}

//