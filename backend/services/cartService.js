import Cart from "../model/CartModel.js";

export const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({
    where: {
      user_id: userId,
    },
  });

  if (!cart) {
    await Cart.create({
      user_id: userId,
    });
  }

  return cart;
};
