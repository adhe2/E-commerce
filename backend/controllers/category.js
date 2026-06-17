import Category from "../model/CategoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const response = await Category.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Nama kategori wajib diisi!" });
    }

    const category = await Category.findOne({
      where: {
        name,
      },
    });

    if (category) return res.status(400).json({ msg: "Kategori sudah ada." });

    await Category.create({
      name,
    });
    res.status(201).json({ msg: "Category telah dibuat" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server." });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server." });
  }
};
