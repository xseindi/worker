import php from "../zend/engine";

php.help = function () {
	//
	}

php.js = function () {
	//
	}

php.js ["global"] = function () {
	return `var $__ = {"c:type": "{{ c:type }}", "router": {{{ router }}}, ad: {}}`;
	}

php.js ["ad:block detector"] = function () {
	return `$.ajax ({url: "{{ ad:adsterra }}", success: function () {}, error: function () { $__.ad.block = true; if ($__.ad.error) $__.ad.error ($__.ad.block); }})`;
	}