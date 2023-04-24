import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import indexRouter from "./routes/index.js";
import gameXORouter from "./routes/gamexo.js";
import game24Router from "./routes/game24.js";
import placeRouter from "./routes/place.js";
import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "./utils/firebaseConfig.js";
import { apiKeyMiddleware } from "./middlewares/index.js";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const app = express();

app.use(cors({ origin: process.env.WEB_NAME, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/gamexo", apiKeyMiddleware, gameXORouter);
app.use("/game24", game24Router);
app.use("/place", apiKeyMiddleware, placeRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("error");
});

export default app;
