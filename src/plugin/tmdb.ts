import php from "../zend/engine";
let {str_after, str_before} = php;

const prefix_url : any = {
	"trending": "https://api.themoviedb.org/3/trending/all/day",
	"all:trending": "https://api.themoviedb.org/3/trending/all/day",
	"movie:single": "https://api.themoviedb.org/3/movie/{id}",
	"movie:discover": "https://api.themoviedb.org/3/discover/movie",
	"movie:trending": "https://api.themoviedb.org/3/trending/movie/day",
	"movie:popular": "https://api.themoviedb.org/3/movie/popular",
	"movie:now_playing": "https://api.themoviedb.org/3/movie/now_playing",
	"movie:top_rated": "https://api.themoviedb.org/3/movie/top_rated",
	"movie:up_coming": "https://api.themoviedb.org/3/movie/upcoming",
	"tv:single": "https://api.themoviedb.org/3/tv/{id}",
	"tv:discover": "https://api.themoviedb.org/3/discover/tv",
	"tv:trending": "https://api.themoviedb.org/3/trending/tv/day",
	"tv:popular": "https://api.themoviedb.org/3/tv/popular",
	"tv:airing_today": "https://api.themoviedb.org/3/tv/airing_today",
	"tv:on_the_air": "https://api.themoviedb.org/3/tv/on_the_air",
	"tv:top_rated": "https://api.themoviedb.org/3/tv/top_rated",
	"image:default": "https://image.tmdb.org/t/p/w500",
	"image:original": "https://image.tmdb.org/t/p/original",
	}

php.plugin.tmdb = class {
	__GET: any;
	__POST: any;
	api: string;
	request: string;
	movie: any
	tv: any
	all: any
	constructor (api: string, request: any) {
		this.api = api;
		this.request = request;
		this.__GET = {method: "GET", headers: new Headers ({Accept: "application/json"})}
		this.__POST = {method: "GET", headers: new Headers ({Accept: "application/json"})}
		this.movie = new php.plugin.tmdb.movie (this);
		this.tv = new php.plugin.tmdb.tv (this);
		this.all = new php.plugin.tmdb.all (this);
		}
	url (url: string, option: any) {
		var url = [url, ("api_key={api_key}").split ("{api_key}").join (this.api)].join ("?");
		option = option || {}
		option.page = option.page || 1;
		if  (option.page) url = [url, ["page", option.page].join ("=")].join ("&");
		if  (option.genre) url = [url, ["with_genres", option.genre].join ("=")].join ("&");
		return url;
		}
	}

php.plugin.tmdb.movie = class {
	adapter: any;
	constructor (adapter: any) {
		this.adapter = adapter;
		}
	async single (option: any) {
		option = option || {}
		var url = this.adapter.url (prefix_url ["movie:single"].split ("{id}").join (option.id), option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			console.log (respond)
			console.log (revamped (respond, adapter.request))
			resolve (respond);
			});
		}
	async discover (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["movie:discover"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request)});
			});
		}
	async trending (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["movie:trending"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request)});
			});
		}
	async popular (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["movie:popular"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request)});
			});
		}
	async now_playing (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["movie:now_playing"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request)});
			});
		}
	async top_rated (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["movie:top_rated"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request)});
			});
		}
	async up_coming (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["movie:up_coming"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request)});
			});
		}
	}

php.plugin.tmdb.movie.embed_url = async function (id: any) {
	var url = "https://cinemamovie.net/tmdb.php?tmdb_id=" + id;
	var response = await fetch (url, {method: "GET", headers: new Headers ()});
	var data = await response.text ();
	return new Promise (function (resolve) {
		resolve (data);
		});
	}

php.plugin.tmdb.tv = class {
	adapter: any;
	constructor (adapter: any) {
		this.adapter = adapter;
		}
	async single (option: any) {
		option = option || {}
		var url = this.adapter.url (prefix_url ["tv:single"].split ("{id}").join (option.id), option);
		var data = await fetch (url, this.adapter.__GET);
		return data.json ();
		}
	async discover (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["tv:discover"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request, "tv")});
			});
		}
	async trending (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["tv:trending"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request, "tv")});
			});
		}
	async popular (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["tv:popular"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request, "tv")});
			});
		}
	async airing_today (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["tv:airing_today"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request, "tv")});
			});
		}
	async top_rated (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["tv:top_rated"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request, "tv")});
			});
		}
	async on_the_air (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["tv:on_the_air"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request, "tv")});
			});
		}
	}

php.plugin.tmdb.all = class {
	adapter: any;
	constructor (adapter: any) {
		this.adapter = adapter;
		}
	async trending (option: any) {
		var adapter: any;
		var url = (adapter = this.adapter).url (prefix_url ["all:trending"], option);
		var response = await fetch (url, this.adapter.__GET);
		var respond : any = await response.json ();
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, total_page: respond.total_pages, total_list: respond.total_results, list: revamp (respond.results, adapter.request, "tv")});
			});
		}
	}

function to_id (input: string) {
	return str_after (str_before (":movie", php.app.route ["movie:single"]), input).split ("-") [0];
	}

function to_tv_id (input: string) {
	return str_after (str_before (":tv", php.app.route ["tv:single"]), input).split ("-") [0];
	}

function to_slugify (input: string) {
	var slugify = input.toLocaleLowerCase ().split (" ").join ("-").split (":").join ("-").split ("--").join ("-");
	if (slugify.substr (- 1) === "-") return slugify.split ("-") [0];
	else return slugify;
	}

function revamp (data: any, request: any, type: string = "movie") {
	return data.map (function (data: any) {
		return revamped (data, request, type);
		});
	}

function revamped (the: any, request: any, type: string = "movie") {
	var slugify = to_slugify ([the.id, (the.title || the.name)].join ("-"));
	var title = (the.title || the.name);
	var title_original = (the.original_title || title);
	var poster = php.plugin.tmdb.image.src (the.poster_path);
	var poster_original = php.plugin.tmdb.image.src (the.poster_path, "original");
	var poster_backdrop = the.backdrop_path ? php.plugin.tmdb.image.src (the.backdrop_path, "original") : "";
	var permalink = request.url.address + php.app.route ["movie:single"].split (":movie").join (slugify);
	var permalink_watch = request.url.address + php.app.route ["movie:watch"].split (":movie").join (slugify);
	var country = the.origin_country;
	var genre = [];
	for (var i in the.genres) {
		genre.push ({id: the.genres [i].id, name: the.genres [i].name, permalink: ""});
		}
	if ((type = the.media_type || type) === "tv") {
		permalink = request.url.address + php.app.route ["tv:single"].split (":tv").join (slugify).split (":season").join (1).split (":episode").join (1);
		permalink_watch = request.url.address + php.app.route ["tv:watch"].split (":tv").join (slugify).split (":season").join (1).split (":episode").join (1);
		}
	var release_date = (the.release_date || the.first_air_date), release_date_string;
	if (release_date) {
		var date = new Date (release_date);
		release_date_string = [php.lib.date.month.name [date.getMonth () + 1], date.getDate ()].join (" ") + ", " + date.getFullYear ();
		}
	else {
		release_date = "0000-00-00";
		release_date_string = "N/A";
		}
	return {
		id: the.id,
		title, "title:original": title_original,
		slugify,
		permalink, permalink_watch,
		poster, poster_original, poster_backdrop,
		release_date, release_date_string,
		}
	}

php.plugin.tmdb.image = function () {}
php.plugin.tmdb.image.src = function (path: string, size: string = "default") { return prefix_url [["image", size].join (":")] + path; }
php.plugin.tmdb.to_id = to_id;
php.plugin.tmdb.to_tv_id = to_tv_id;
php.plugin.tmdb.to_slugify = to_slugify;