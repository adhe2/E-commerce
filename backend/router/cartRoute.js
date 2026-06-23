import { verifyUser, adminOnly } from "../middleware/verifyUser.js";
import { getItemCart, addToCart, deleteProductFromCart } from "../controllers/cart.js";
import express from "express";

const routerCart = express.Router();

routerCart.get("/cart", verifyUser, getItemCart);
routerCart.post("/cart", verifyUser, addToCart);
routerCart.delete("/cart/:productId", verifyUser, deleteProductFromCart);

export default routerCart;
