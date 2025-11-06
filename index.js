import express from "express";

import mongoose from "mongoose";

import { registerValidation, loginValidation } from "./validations.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is ok"))
  .catch(() => console.log("Error"));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("Server is ok");
  }
});
