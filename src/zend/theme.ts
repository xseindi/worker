import php from "../zend/engine";

php.theme = class {
	theme: any;
	constructor (theme: any) {
		this.theme = theme;
		}
	layout (id: string) { return new php.theme.layout (this.theme, id); }
	component (id: string) { return new php.theme.component (this.theme, id); }
	element (id: string) { return new php.theme.element (this.theme, id); }
	}

php.theme.layout = class {
	theme: any;
	id: string;
	markup: any = [];
	constructor (theme: any, id: string) {
		this.theme = theme;
		this.id = id;
		}
	}

php.theme.component = class {
	theme: any;
	id: string;
	markup: any = [];
	constructor (theme: any, id: string) {
		this.theme = theme;
		this.id = id;
		}
	}

php.theme.element = class {
	theme: any;
	id: string;
	markup: any = [];
	constructor (theme: any, id: string) {
		this.theme = theme;
		this.id = id;
		}
	}