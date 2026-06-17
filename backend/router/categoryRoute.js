import { verifyUser, adminOnly } from "../middleware/verifyUser.js";
import { getCategory, createCategory, deleteCategory } from "../controllers/category.js";
import express from "express";

const routerCategory = express.Router();

routerCategory.get("/category", verifyUser, adminOnly, getCategory);
routerCategory.post("/category", verifyUser, adminOnly, createCategory);
routerCategory.delete("/category/:id", verifyUser, adminOnly, deleteCategory);

export default routerCategory;
