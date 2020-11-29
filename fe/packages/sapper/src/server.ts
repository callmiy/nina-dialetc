import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PORT, IS_DEV as dev } from "@ta/cm/src/envs";

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    cookieParser(),
    (req, res, next) => {
      const token = req.cookies["my-jwt"];
      const profile = token ? jwt.decode(token) : false;

      const session = () => {
        return {
          authenticated: !!profile,
          profile,
        };
      };

      const store = { session };

      return sapper.middleware(store)(req, res, next);
    }
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
