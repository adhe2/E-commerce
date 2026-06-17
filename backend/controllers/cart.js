import { getOrCreateCart } from "../services/cartService.js";
import CartItem from "../model/CartItemModel.js";
import Product from "../model/ProductModel.js";
import Cart from "../model/CartModel.js";

export const getItemCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.userId);

    const response = await CartItem.findAll({
      where: {
        cart_id: cart.id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "image"],
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

export const addToCart = async (req, res) => {
  try {
    if (!req.body.quantity || req.body.quantity < 1) return res.status(400).json({ msg: "Quantity minimal 1" });

    const cart = await getOrCreateCart(req.userId);

    const product = await Product.findByPk(req.body.productId);

    if (!product) {
      return res.status(404).json({
        msg: "Produk tidak ditemukan",
      });
    }

    if (product.stock < req.body.quantity) {
      return res.status(400).json({
        msg: "Stok tidak mencukupi",
      });
    }

    const item = await CartItem.findOne({
      where: {
        cart_id: cart.id,
        product_id: req.body.productId,
      },
    });

    if (item) {
      const newQuantity = item.quantity + req.body.quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          msg: "Stok tidak mencukupi",
        });
      }

      await item.update({
        quantity: item.quantity + req.body.quantity,
      });
      res.status(200).json({ msg: "Quantity di update" });
    } else {
      await CartItem.create({
        cart_id: cart.id,
        product_id: req.body.productId,
        quantity: req.body.quantity,
      });
    }
    res.status(201).json({ msg: "Produk telah dimasukkan ke dalam keranjang" });
  } catch (error) {
    console.log(error);
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
