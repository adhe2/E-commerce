import Cart from "../model/CartModel.js";
import CartItem from "../model/CartItemModel.js";
import Product from "../model/ProductModel.js";
import Order from "../model/OrderModel.js";
import OrderItem from "../model/OrderItemModel.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        user_id: req.userId,
      },
    });

    if (!cart) return res.status(404).json({ msg: "Cart tidak ditemukan" });

    const cartItems = await CartItem.findAll({
      where: {
        cart_id: cart.id,
      },
      include: Product,
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        msg: "Cart kosong",
      });
    }

    //Total harga
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.Product.price;
    });

    const order = await Order.create({
      user_id: req.userId,
      total_price: totalPrice,
    });

    const orderItems = CartItem.map((item) => ({
      order_id: order.id,
      Product_id: item.product_id,
      quantity: item.quantity,
      price: item.Product.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    await CartItem.destroy({
      where: {
        cart_id: cart.id,
      },
    });
    return res.status(201).json({
      msg: "Order berhasil dibuat",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: error.message,
    });
  }
};
