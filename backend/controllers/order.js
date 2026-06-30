import Cart from "../model/CartModel.js";
import CartItem from "../model/CartItemModel.js";
import Product from "../model/ProductModel.js";
import Order from "../model/OrderModel.js";
import OrderItem from "../model/OrderItemModel.js";

export const getOrders = async (req, res) => {
  try {
    const response = await Order.findAll({
      attributes: ["user_id", "total_price", "status"],
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: OrderItem,
          attributes: ["quantity", "price"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Terjadi kesalahan pada server.",
    });
  }
};

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

    console.log(JSON.stringify(cartItems, null, 2));

    if (cartItems.length === 0) {
      return res.status(400).json({
        msg: "Cart kosong",
      });
    }

    //Total harga
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.quantity * item.product.price;
    });

    const order = await Order.create({
      user_id: req.userId,
      total_price: totalPrice,
    });

    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.product.price,
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

export const deleteAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        user_id: req.userId,
      },
    });

    const orderIds = orders.map((order) => order.id);

    await OrderItem.destroy({
      where: {
        order_id: orderIds,
      },
    });

    await Order.destroy({
      where: {
        user_id: req.userId,
      },
    });

    return res.status(200).json({
      msg: "Semua order berhasil dihapus",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: error.message,
    });
  }
};
