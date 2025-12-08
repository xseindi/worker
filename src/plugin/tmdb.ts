import php from "../zend/engine";
let {str_after, str_before} = php;

const __api: any = {
	"trending:today": "https://api.themoviedb.org/3/trending/all/day?language=en",
	"trending:week": "https://api.themoviedb.org/3/trending/all/week?language=en",
	"movie": "https://api.themoviedb.org/3/movie/{id}?language=en",
	"movie trending:today": "https://api.themoviedb.org/3/trending/movie/day?language=en",
	"movie trending:week": "https://api.themoviedb.org/3/trending/movie/week?language=en",
	"movie:discover": "https://api.themoviedb.org/3/discover/movie?language=en",
	"movie:popular": "https://api.themoviedb.org/3/movie/popular?language=en",
	"movie:now_playing": "https://api.themoviedb.org/3/movie/now_playing?language=en",
	"movie:top_rated": "https://api.themoviedb.org/3/movie/top_rated?language=en",
	"movie:up_coming": "https://api.themoviedb.org/3/movie/upcoming?language=en",
	"tv": "https://api.themoviedb.org/3/tv/{id}?language=en",
	"tv trending:today": "https://api.themoviedb.org/3/trending/tv/day?language=en",
	"tv trending:week": "https://api.themoviedb.org/3/trending/tv/week?language=en",
	"tv:discover": "https://api.themoviedb.org/3/discover/tv?language=en",
	"tv:popular": "https://api.themoviedb.org/3/tv/popular?language=en",
	"tv:airing_today": "https://api.themoviedb.org/3/tv/airing_today?language=en",
	"tv:on_air": "https://api.themoviedb.org/3/tv/on_the_air?language=en",
	"tv:top_rated": "https://api.themoviedb.org/3/tv/top_rated?language=en",
	"people trending:today": "https://api.themoviedb.org/3/trending/person/day?language=en",
	"people trending:week": "https://api.themoviedb.org/3/trending/person/week?language=en",
	"image:default": "https://image.tmdb.org/t/p/w500",
	"image:original": "https://image.tmdb.org/t/p/original",
	}

php.plugin.tmdb = class {
	api: string;
	token: string;
	adapter: any;
	movie: any;
	tv: any;
	genre: any = {}
	constructor (tmdb: any = {}, adapter: any = {}) {
		this.api = tmdb.api;
		this.token = tmdb.token;
		this.adapter = adapter;
		this.setup ();
		this.movie = new php.plugin.tmdb.movie (this);
		this.tv = new php.plugin.tmdb.tv (this);
		}
	setup () {
		for (var i in this.adapter.request.db.cache.genre.data) this.genre [this.adapter.request.db.cache.genre.data [i].id] = this.adapter.request.db.cache.genre.data [i]
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
		if  (option.append_to_response) url = [url, ["append_to_response", "credits,images,videos,reviews"].join ("=")].join ("&");
		if  (option.country) url = [url, ["with_origin_country", option.country].join ("=")].join ("&");
		return url;
		}
	async fetch (api: string, option: any = {}, single: boolean = false) {
		var response = await fetch (this.url (api, option), this.head ());
		return response.json ();
		}
	array (respond: any, option: any = {}) {
		var tmdb = this;
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve ({
				page: respond.page,
				"page:total": respond.total_pages,
				"data:total": respond.total_results,
				data: revamp (respond.results, option.type, adapter, tmdb),
				// tmdb: respond.results,
				});
			});
		}
	object (respond: any, option: any = {}) {
		var tmdb = this;
		var adapter = this.adapter;
		return new Promise (function (resolve, reject) {
			resolve (revamp.json (respond, option.type, adapter, tmdb));
			});
		}
	image (path: string, size: string = "default") {
		return __api [["image", size].join (":")] + path;
		}
	slugify (name: string) {
		return php.plugin.tmdb.slugify (name);
		}
	genre_array (list: any, type: string) {
		var genre = [];
		for (var id in list) {
			var title = list [id];
			var name = this.slugify (title);
			var permalink = this.genre_permalink (id, list, type);
			genre.push ({id, title, name, permalink});
			}
		return genre;
		}
	genre_split (list: any, type: string) {
		var left = [];
		var right = [];
		var genre = this.genre_array (list, type);
		var length = genre.length;
		var half_way = ((length / 2).toString ().split (".").length > 1) ? 1 : 0;
		var half: number = parseInt (((length / 2) + half_way).toString ().split (".") [0]);
		for (var i = 0; i < half; i ++) left.push (genre [i]);
		for (var i = half; i < length; i ++) right.push (genre [i]);
		return {left, right}
		}
	genre_permalink (id: any, list: any, type: string) {
		return this.adapter.request.router.permalink ((type + ":genre"), {id, name: this.slugify (list [id])});
		}
	}

php.plugin.tmdb.movie = class {
	tmdb: any;
	constructor (tmdb: any) {
		this.tmdb = tmdb;
		}
	async discover () {}
	async single (id: any, option: any = {}) {
		return this.tmdb.object (await this.tmdb.fetch ("movie", (option = php.object.assign ({id, type: "movie", append_to_response: true}, option))), option);
		}
	async popular (option: any = {}) {
		return this.tmdb.array (await this.tmdb.fetch ("movie:popular", (option = php.object.assign ({type: "movie"}, option))), option);
		}
	}

php.plugin.tmdb.tv = class {
	tmdb: any;
	constructor (tmdb: any) {
		this.tmdb = tmdb;
		}
	async discover (option: any = {}) {
		return this.tmdb.array (await this.tmdb.fetch ("tv:discover", (option = php.object.assign ({type: "tv"}, option))), option);
		}
	async single (id: any, option: any = {}) {
		return this.tmdb.object (await this.tmdb.fetch ("tv", (option = php.object.assign ({id, type: "tv", append_to_response: true}, option))), option);
		}
	async popular (option: any = {}) {
		return this.tmdb.array (await this.tmdb.fetch ("tv:popular", (option = php.object.assign ({type: "tv"}, option))), option);
		}
	}

php.plugin.tmdb.image = function (path: string, size: string = "default") {
	return __api [["image", size].join (":")] + path;
	}

php.plugin.tmdb.slugify = function (name: string) {
	var slugify = (name || "").toLocaleLowerCase ().split (" ").join ("-").split ("'").join ("").split ("&").join ("").split (":").join ("-").split ("--").join ("-");
	if (slugify.endsWith ("-")) return slugify.slice (0, (- 1));
	else return slugify;
	}

function revamp (input: any, type: any = null, adapter: any = {}, tmdb: any = {}) {
	return input.map (function (data: any, index: number) {
		return revamp.json (data, type, adapter, tmdb);
		});
	}

revamp.json = function (input: any = {}, type: any = null, adapter: any = {}, tmdb: any = {}) {
	var id = input.id;
	var title = (input.title || input.name) || "";
	var title_original = (input.original_title || input.original_name) || "";
	var slug = php.plugin.tmdb.slugify (title);
	var description = input.overview;
	var poster = {path: input.poster_path, url: php.plugin.tmdb.image (input.poster_path), "url:original": php.plugin.tmdb.image (input.poster_path, "original")}
	var backdrop = null; if (input.backdrop_path) backdrop = {path: input.backdrop_path, url: php.plugin.tmdb.image (input.backdrop_path), "url:original": php.plugin.tmdb.image (input.backdrop_path, "original")}
	var release_date = (input.release_date || input.first_air_date), r_date = new Date (release_date);
	var release_date_string = php.date.month.name [r_date.getMonth () + 1] + " " + r_date.getDate () + ", " + r_date.getFullYear ();
	var year = r_date.getFullYear ();
	var popularity = input.popularity;
	var vote = {average: input.vote_average || 0, count: input.vote_count || 0}
	var country = input.origin_country || [];
	var language = input.original_language || "en";
	var adult = input.adult || false;
	var budget = input.budget || 0;
	var revenue = input.revenue || 0;
	var status = input.status || "";
	var tagline = input.tagline || "";
	type = input.media_type || type;
	var genre = [], genre_id_list: any = [];
	if (input.genre_ids) {
		genre_id_list = input.genre_ids;
		for (var i in input.genre_ids) {
			var genre_id = input.genre_ids [i];
			var genre_name = tmdb.genre [genre_id].name;
			var genre_slug = tmdb.genre [genre_id].slug;
			var genre_permalink = adapter.request.router (type + ":genre", {id: genre_id, name: genre_slug});
			genre.push ({id: genre_id, name: genre_name, slug: genre_slug, permalink: genre_permalink});
			}
		}
	else if (input.genres) {
		for (var i in input.genres) {
			var genre_id = input.genres [i].id;
			var genre_name = tmdb.genre [genre_id].name;
			var genre_slug = tmdb.genre [genre_id].slug;
			var genre_permalink = adapter.request.router (type + ":genre", {id: genre_id, name: genre_slug});
			genre.push ({id: genre_id, name: genre_name, slug: genre_slug, permalink: genre_permalink});
			genre_id_list.push (genre_id);
			}
		}
	var permalink = adapter.request.base_url + php ["router.json"][type].split (":id").join (id).split (":name").join (slug);
	if (type === "movie") {}
	if (type === "tv") {}
	var credit: any = {image: {poster: [], backdrop: []}, video: {trailer: [], teaser: [], s: [], list: []}, people: {cast: [], crew: []}}
	if (input.credits) {
		if (input.images) {
			if (input.images.posters) {
				for (var i in input.images.posters) {
					var poster_path = input.images.posters [i].file_path;
					var poster_url = php.plugin.tmdb.image (poster_path);
					var poster_url_original = php.plugin.tmdb.image (poster_path, "original");
					credit.image.poster.push ({path: poster_path, url: poster_url, "url:original": poster_url_original});
					}
				}
			}
		if (input.videos) {
			if (input.videos.results) {
				for (var i in input.videos.results) {
					if (input.videos.results [i].site.toLocaleLowerCase () === "youtube") {
						var video_title = input.videos.results [i].name;
						var video_key = input.videos.results [i].key;
						var video_type = (input.videos.results [i].type || "").toLocaleLowerCase ();
						var video_object = {title: video_title, type: video_type, "embed:id": video_key, "embed:url": "https://www.youtube.com/embed/" + video_key}
						if (video_type === "trailer") credit.video.trailer.push (video_object);
						else if (video_type === "teaser") credit.video.teaser.push (video_object);
						else if (video_type === "behind the scenes") credit.video.s.push (video_object);
						else credit.video.list.push (video_object);
						}
					}
				}
			}
		if (input.credits.cast) {
			for (var i in input.credits.cast) {
				var cast_id = input.credits.cast [i].id;
				var cast_identity = input.credits.cast [i].cast_id;
				var cast_name = input.credits.cast [i].name;
				var cast_character = input.credits.cast [i].character;
				var cast_adult = input.credits.cast [i].adult;
				var cast_gender = input.credits.cast [i].gender;
				var cast_poster_path = input.credits.cast [i].profile_path;
				var cast_poster_url = php.plugin.tmdb.image (cast_poster_path);
				var cast_poster_url_original = php.plugin.tmdb.image (cast_poster_path, "original");
				credit.people.cast.push ({id: cast_id, identity: cast_identity, name: cast_name, character: cast_character, adult: cast_adult, gender: cast_gender, poster: {path: cast_poster_path, url: cast_poster_url, "url:original": cast_poster_url_original}});
				}
			}
		}
	var output = {
		id, type, slug,
		"title": title, "title:original": title_original,
		tagline,
		description,
		permalink,
		poster, backdrop,
		"release_date": release_date, "release_date:string": release_date_string, year,
		"genre:id": genre_id_list, genre,
		status, adult, budget, revenue,
		popularity, vote,
		country, language,
		credit,
		}
	return output;
	}