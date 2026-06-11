import Product from "../model/ProductModel.js";
import User from "../model/UserModel.js";
import { Op, where } from "sequelize";

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

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["name", "description", "price", "stock", "image"],
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { category_id, name, description, price, stock, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ msg: "Name dan Price wajib di isi!" });
    }

    await Product.create({
      category_id,
      name,
      description,
      price,
      stock,
      image,
    });
    res.status(201).json({ msg: "Berhasil membuat Produk baru." });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image } = req.body;

    await Product.update(
      { name, description, price, stock, image },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    res.status(200).json({ msg: "Product berhasil di update." });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const response = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response, { msg: "Berhasil di hapus" });
  } catch (error) {
    console.log(error);
  }
};
