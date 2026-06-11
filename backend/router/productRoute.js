import { verifyUser } from "../middleware/verifyUser.js";
import { getProduct, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.js";
import express from "express";

const routerProduct = express.Router();

routerProduct.get("/product", verifyUser, getProduct);
routerProduct.get("/product/:id", verifyUser, getProductById);
routerProduct.post("/product", verifyUser, createProduct);
routerProduct.patch("/product/:id", verifyUser, updateProduct);
routerProduct.delete("/product", verifyUser, deleteProduct);

export default routerProduct;
