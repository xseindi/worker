import php from "../zend/engine";
let {str_after, str_before} = php;

const __api: any = {
	"trending:today": "https://api.themoviedb.org/3/trending/all/day?language=en-US",
	"trending:week": "https://api.themoviedb.org/3/trending/all/week?language=en-US",
	"movie": "https://api.themoviedb.org/3/movie/{id}?language=en-US",
	"movie trending:today": "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
	"movie trending:week": "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
	"movie:discover": "https://api.themoviedb.org/3/discover/movie?language=en-US",
	"movie:popular": "https://api.themoviedb.org/3/movie/popular?language=en-US",
	"movie:now_playing": "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
	"movie:top_rated": "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
	"movie:up_coming": "https://api.themoviedb.org/3/movie/upcoming?language=en-US",
	"tv": "https://api.themoviedb.org/3/tv/{id}?language=en-US",
	"tv trending:today": "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
	"tv trending:week": "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
	"tv:discover": "https://api.themoviedb.org/3/discover/tv?language=en-US",
	"tv:popular": "https://api.themoviedb.org/3/tv/popular?language=en-US",
	"tv:airing_today": "https://api.themoviedb.org/3/tv/airing_today?language=en-US",
	"tv:on_air": "https://api.themoviedb.org/3/tv/on_the_air?language=en-US",
	"tv:top_rated": "https://api.themoviedb.org/3/tv/top_rated?language=en-US",
	"people trending:today": "https://api.themoviedb.org/3/trending/person/day?language=en-US",
	"people trending:week": "https://api.themoviedb.org/3/trending/person/week?language=en-US",
	"image:default": "https://image.tmdb.org/t/p/w500",
	"image:original": "https://image.tmdb.org/t/p/original",
	}

const __genre: any = {
	all: {},
	movie: {
		28: "Action",
		12: "Adventure",
		16: "Animation",
		35: "Comedy",
		80: "Crime",
		99: "Documentary",
		18: "Drama",
		10751: "Family",
		14: "Fantasy",
		36: "History",
		27: "Horror",
		10402: "Music",
		9648: "Mystery",
		10749: "Romance",
		878: "Science Fiction",
		10770: "TV Movie",
		53: "Thriller",
		10752: "War",
		37: "Western",
		},
	tv: {
		10759: "Action & Adventure",
		16: "Animation",
		35: "Comedy",
		80: "Crime",
		99: "Documentary",
		18: "Drama",
		10751: "Family",
		10762: "Kids",
		9648: "Mystery",
		10763: "News",
		10764: "Reality",
		10765: "Sci-Fi & Fantasy",
		10766: "Soap",
		10767: "Talk",
		10768: "War & Politics",
		37: "Western",
		},
	}

php.plugin.tmdb = class {
	api: string;
	token: string;
	request: any;
	movie: any;
	tv: any;
	genre: any = {}
	constructor (tmdb: any = {}, request: any = {}) {
		this.api = tmdb.api;
		this.token = tmdb.token;
		this.request = request;
		this.genre = php.object.assign (__genre.movie, __genre.tv);
		this.movie = new php.plugin.tmdb.movie (this);
		this.tv = new php.plugin.tmdb.tv (this);
		}
	head () {
		return {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: ["Bearer", this.token].join (" "),
				},
			}
		}
	url (api: string, option: any = {}) {
		var url = __api [api];
		if (option.id) {
			url = url.split ("{id}").join (option.id);
			delete option.id;
			}
		option.page = option.page || 1;
		if  (option.page) url = [url, ["page", option.page].join ("=")].join ("&");
		if  (option.genre) url = [url, ["with_genres", option.genre].join ("=")].join ("&");
		return url;
		}
	async fetch (api: string, option: any = {}) {
		var response = await fetch (this.url (api, option), this.head ());
		var respond: any = await response.json ();
		var adapter = this.request;
		return new Promise (function (resolve, reject) {
			resolve ({page: respond.page, "page:total": respond.total_pages, "data:total": respond.total_results, data: revamp (respond.results, option.type, adapter), tmdb: respond.results});
			});
		}
	image (path: string, size: string = "default") {
		return __api [["image", size].join (":")] + path;
		}
	to_slugify (name: string) {
		return php.plugin.tmdb.slugify (name);
		}
	}

php.plugin.tmdb.movie = class {
	tmdb: any;
	__genre: any = __genre.movie;
	constructor (tmdb: any) {
		this.tmdb = tmdb;
		}
	discover () {}
	popular (option: any = {}) {
		return this.tmdb.fetch ("movie:popular", Object.assign ({type: "movie"}, option));
		}
	genre (genre: string) {
		if (genre === "split") return this.genre_split ();
		else if (genre === undefined) return this.genre_array ();
		else if (genre in this.__genre) return {
			id: genre,
			title: this.__genre [genre],
			name: this.tmdb.to_slugify (this.__genre [genre]),
			permalink: this.genre_permalink (genre),
			}
		}
	genre_array () {
		var genre = [];
		for (var id in this.__genre) {
			var title = this.__genre [id];
			var name = this.tmdb.to_slugify (title);
			var permalink = this.genre_permalink (id);
			genre.push ({id, title, name, permalink});
			}
		return genre;
		}
	genre_split () {
		var left = [];
		var right = [];
		var genre = this.genre_array ();
		var length = genre.length;
		var half: number = parseInt (((length / 2) + 1).toString ().split (".") [0]);
		for (var i = 0; i < half; i ++) left.push (genre [i]);
		for (var i = half; i < length; i ++) right.push (genre [i]);
		return {left, right}
		}
	genre_permalink (id: any) {
		return php ["router.json"]["movie:genre"].split (":id").join (id).split (":name").join (this.tmdb.to_slugify (this.__genre [id]));
		}
	}

php.plugin.tmdb.movie.genre = __genre.movie;

php.plugin.tmdb.tv = class {
	tmdb: any;
	__genre: any = __genre.tv;
	constructor (tmdb: any) {
		this.tmdb = tmdb;
		}
	genre (genre: string) {
		if (genre === "split") return this.genre_split ();
		else if (genre === undefined) return this.genre_array ();
		else if (genre in this.__genre) return {
			id: genre,
			title: this.__genre [genre],
			name: this.tmdb.to_slugify (this.__genre [genre]),
			permalink: this.genre_permalink (genre),
			}
		}
	genre_array () {
		var genre = [];
		for (var id in this.__genre) {
			var title = this.__genre [id];
			var name = this.tmdb.to_slugify (title);
			var permalink = this.genre_permalink (id);
			genre.push ({id, title, name, permalink});
			}
		return genre;
		}
	genre_split () {
		var left = [];
		var right = [];
		var genre = this.genre_array ();
		var length = genre.length;
		var half: number = parseInt (((length / 2) + 0).toString ().split (".") [0]);
		for (var i = 0; i < half; i ++) left.push (genre [i]);
		for (var i = half; i < length; i ++) right.push (genre [i]);
		return {left, right}
		}
	genre_permalink (id: any) {
		return php ["router.json"]["tv:genre"].split (":id").join (id).split (":name").join (this.tmdb.to_slugify (this.__genre [id]));
		}
	}

php.plugin.tmdb.image = function (path: string, size: string = "default") {
	return __api [["image", size].join (":")] + path;
	}

php.plugin.tmdb.slugify = function (name: string) {
	var slugify = (name || "").toLocaleLowerCase ().split (" ").join ("-").split ("'").join ("").split ("&").join ("-").split (":").join ("-").split ("--").join ("-");
	if (slugify.endsWith ("-")) return slugify.substr (- 1);
	else return slugify;
	}

function revamp (input: any, type: any = null, adapter: any = {}) {
	return input.map (function (data: any, index: number) {
		return revamp.json (data, type, adapter);
		});
	}

revamp.json = function (input: any = {}, type: any = null, adapter: any = {}) {
	var id = input.id;
	var title = (input.title || input.name) || "";
	var title_original = (input.original_title || input.original_name) || "";
	var name = php.plugin.tmdb.slugify (title);
	var description = input.overview;
	var poster = php.plugin.tmdb.image (input.poster_path);
	var poster_original = php.plugin.tmdb.image (input.poster_path, "original");
	var poster_backdrop = php.plugin.tmdb.image (input.backdrop_path);
	var poster_backdrop_original = php.plugin.tmdb.image (input.backdrop_path, "original");
	var release_date = (input.release_date || input.first_air_date), r_date = new Date (release_date);
	var release_date_string = "";
	var year = r_date.getFullYear ();
	var popularity = input.popularity;
	var country = input.origin_country || [];
	type = input.media_type || type;
	var genre = []; if (input.genre_ids) for (var i in input.genre_ids) genre.push ({id: input.genre_ids [i], name: php.plugin.tmdb.slugify (__genre [type][input.genre_ids [i]]), title: __genre [type][input.genre_ids [i]]});
	var permalink = adapter.request.base_url + php ["router.json"][type].split (":id").join (id).split (":name").join (name);
	if (type === "movie") {}
	if (type === "tv") {}
	var output = {
		id, type, name,
		"title": title, "title:original": title_original,
		description,
		permalink,
		"poster": poster, "poster:original": poster_original, "backdrop": poster_backdrop, "backdrop:original": poster_backdrop_original,
		"release_date": release_date, "release_date:string": release_date_string, year,
		popularity,
		genre,
		country,
		}
	return output;
	}

/*
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
*/