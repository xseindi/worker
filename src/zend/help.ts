import php from "../zend/engine";

php.help = function () {
	//
	}

php.js = function () {
	//
	}

php.js ["global"] = function () {
	return `var $$$ = {"theme": {"id": "{{ theme:id }}", "type": "{{ theme:type }}", "version": "{{ theme:version }}", "layout": "{{ theme:layout }}", "component": {}, "element": {}}, "router": {{{ router }}}}`;
	// return `var $__ = {"c:type": "{{ c:type }}", "router": {{{ router }}}, ad: {}}`;
	}

php.js ["ad:block detector"] = function () {
	return `$.ajax ({url: "{{ ad:adsterra }}", success: function () {}, error: function () { $__.ad.block = true; if ($__.ad.error) $__.ad.error ($__.ad.block); }})`;
	}