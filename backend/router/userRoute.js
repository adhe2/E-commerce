import { createUser, getUser, getUserById, updateUser, deleteUser } from "../controllers/user.js";
import { verifyUser } from "../middleware/verifyUser.js";
import express from "express";

const routerUser = express.Router();

routerUser.get("/users", verifyUser, getUser);
routerUser.get("/users/:id", verifyUser, getUserById);
routerUser.post("/users", verifyUser, createUser);
routerUser.patch("/users/:id", verifyUser, updateUser);
routerUser.delete("/users", verifyUser, deleteUser);

export default routerUser;
