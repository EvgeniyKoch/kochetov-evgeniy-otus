import express from 'express';
import path from 'path';
import session from "express-session";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

import config from './config.js';
import Guest from "./entities/Guest.js";
import addRoutes from "./routes/index.js";
import { userInstance } from "./entities/user/index.js";

const registerPlugins = (app) => {
  app.set("view engine", "pug");
  app.use(methodOverride("_method"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.use(
    session({
      secret: "secret key",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(async (req, res, next) => {
    if (req?.session?.userId) {
      const { userId } = req.session;
      const user = await userInstance.findOneById(userId);
      res.locals.currentUser = user;
    } else {
      res.locals.currentUser = new Guest();
    }
    next();
  });

  app.use(async (req, res, next) => {
    const token = req.cookies.access_token;

    if (token) {
      const data = jwt.verify(token, config.secret);
      req.session.userId = data.id;
    }
    next();
  });
};

export default (app) => {
  registerPlugins(app);
  addRoutes(app);

  return app;
};
