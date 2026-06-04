import { login, Me, logOutUser } from "../controllers/auth.js";
import express from "express";

const routerLogin = express.Router();

routerLogin.get("/me", Me);
routerLogin.post("/login", login);
routerLogin.delete("/logout", logOutUser);

export default routerLogin;
