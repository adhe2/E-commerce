import { verifyUser, adminOnly } from "../middleware/verifyUser.js";
import { createOrder, getOrders, deleteAllOrders } from "../controllers/order.js";

import express from "express";

const routerOrder = express.Router();

routerOrder.get("/order", verifyUser, getOrders);
routerOrder.post("/order", verifyUser, createOrder);
routerOrder.delete("/order", verifyUser, deleteAllOrders);

export default routerOrder;
