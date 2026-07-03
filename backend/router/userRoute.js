import { createUser, getUser, getUserById, updateUser, deleteUser } from "../controllers/user.js";
import { verifyUser, adminOnly } from "../middleware/verifyUser.js";
import express from "express";

const routerUser = express.Router();

routerUser.get("/users", verifyUser, adminOnly, getUser);
routerUser.get("/users/:id", verifyUser, adminOnly, getUserById);
routerUser.post("/users", createUser);
routerUser.patch("/users/:id", verifyUser, updateUser);
routerUser.delete("/users", verifyUser, adminOnly, deleteUser);

export default routerUser;
