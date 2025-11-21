import php from "../../../../zend/engine"
var {chr} = php.constant
var {ln, ln_r, ln_tab, ln_s} = php.constant
var {zero, one} = php.constant

export default function (app: any, request: any, response: any, next: any) {
	request.component ["footer:info"] = function (param: any = {}, tab: number = zero) {
		return request.theme.component ("footer:info").render (param, tab)
		}
	request.component ["button:inline"] = function (param: any = {}, tab: number = zero) {
		var data: any = []
		for (var i in param.data) {
			if (param.data [i].type === "separator") data.push (request.theme.component ("separator:mono").render (tab + 2))
			if (param.data [i].type === "anchor") {
				var anchor: any = []
				for (var x in param.data [i].anchor) {
					var a = param.data [i].anchor [x]
					anchor.push (request.theme.component ("button:inline anchor").render (a, tab + 2 + 1))
					}
				data.push (request.theme.component ("button:inline anchor:container").render ({slot: anchor}, tab + 2))
				}
			}
		return request.theme.component ("button:inline").render ({title: param.title, slot: data}, tab)
		}
	}