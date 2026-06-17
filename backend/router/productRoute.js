import { verifyUser, adminOnly } from "../middleware/verifyUser.js";
import { getProduct, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.js";
import express from "express";

const routerProduct = express.Router();

routerProduct.get("/product", verifyUser, getProduct);
routerProduct.get("/product/:id", verifyUser, getProductById);
routerProduct.post("/product", verifyUser, adminOnly, createProduct);
routerProduct.patch("/product/:id", verifyUser, adminOnly, updateProduct);
routerProduct.delete("/product", verifyUser, adminOnly, deleteProduct);

export default routerProduct;
