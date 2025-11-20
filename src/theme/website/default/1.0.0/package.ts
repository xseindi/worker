import php from "../../../../zend/engine"
var {chr} = php.constant
var {ln, ln_r, ln_tab, ln_s} = php.constant
var {zero, one} = php.constant

export default function (app: any, request: any, response: any, next: any) {
	request.component ["footer:info"] = function (param: any = {}, tab: number = zero) {
		return request.theme.component ("footer:info").render (param, tab)
		}
	}