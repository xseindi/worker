import {Hono} from "hono";

import host from "../host.json";
import db from "../db.json";
import router from "../router.json";
import theme from "../theme.json";
import config from "../config.json";

function plugin () {}

var php: any = {
	"host.json": host, "db.json": db, "router.json": router, "theme.json": theme, "config.json": config,
	express: new Hono <{Bindings: {asset: Fetcher, db: D1Database, cache: KVNamespace}}> (),
	plugin,
	}

export type {Hono as express}
export var html: any = function () {}
export default php;