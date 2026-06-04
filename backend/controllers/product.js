import Product from "../model/ProductModel.js";
import User from "../model/UserModel.js";
import { Op } from "sequelize";

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: ["id", "name", "description", "price", "stock", "image"],
    });

    if (!response) return res.status(404).json({ msg: "Produk tidak ditemukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server." });
  }
};
