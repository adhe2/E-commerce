import { getOrCreateCart } from "../services/cartService.js";
import CartItem from "../model/CartItemModel.js";
import Product from "../model/ProductModel.js";

export const getItemCart = async (req, res) => {
  try {
    const response = await CartItem.findAll({
      attributes: ["id", "cart_id", "product_id", "quantity"],
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.userId);

    await CartItem.create({
      user_id: cart.id,
      product_id: req.body.productId,
      quantity: req.body.quantity,
    });
    res.status(201).json({ msg: "Produk telah dimasukkan ke dalam keranjang" });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server." });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        user_id: req.userId,
      },
    });

    if (!cart) return res.status(404).json({ msg: "Keranjang tidak ditemukan." });

    const deleted = await CartItem.destroy({
      where: {
        cart_id: cart.id,
        product_id: req.params.productId,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        msg: "Produk tidak ditemukan di keranjang.",
      });
    }
    res.status(200).json({ msg: "Berhasil menghapus produk dari keranjang." });
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server." });
  }
};
