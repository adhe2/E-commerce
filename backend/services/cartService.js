import { where } from "sequelize";
import Cart from "../model/CartModel.js";

export const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!user) {
    await Cart.create({
      where: {
        user_id: userId,
      },
    });
  }

  return cart;
};
