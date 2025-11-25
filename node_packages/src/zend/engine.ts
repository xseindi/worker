import {Hono} from "hono";

import config from "../application/config.json";
import db from "../application/db.json";
import host from "../application/host.json";
import router from "../application/router.json";
import theme from "../application/theme.json";

function plugin () {}

var php: any = {
	"config.json": config, "db.json": db, "host.json": host, "router.json": router, "theme.json": theme,
	express: new Hono <{Bindings: {asset: Fetcher, db: D1Database, cache: KVNamespace}}> (),
	plugin,
	}

export type {Hono as express}
export var html: any = function () {}
export default php;