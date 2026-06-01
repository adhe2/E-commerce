import argon2 from "argon2";
import User from "../model/UserModel.js";

export const getUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Data tidak ditemukan." });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["id", "name", "email", "role"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data User tidak ditemukan." });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confPassword } = req.body;

    if (password !== confPassword) return res.status(400).json({ msg: "Confrim password anda salah." });

    // Validasi untuk duplikat email

    const emailExist = await User.findOne({
      where: {
        email: email,
      },
    });

    if (emailExist) {
      return res.status(400).json({ msg: "Email sudah digunakan!" });
    }

    const hashPassword = await argon2.hash(password);

    // Pembuatan Akun User
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "customer",
    });

    res.status(201).json({ msg: "Akun user berhasil dibuat." });
  } catch (error) {
    res.status(400).json({ msg: "Terjadi kesalahan." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan." });

    const { name, email, password, confPassword } = req.body;

    const emailExist = await User.findOne({
      where: {
        email: email,
      },
    });

    if (emailExist && emailExist.id !== user.id) {
      return res.status(400).json({ msg: "Email sudah digunakan." });
    }

    let hashPassword;
    if (password === "" || password === null || password === undefined) {
      hashPassword = user.password;
    } else {
      if (password !== confPassword)
        return res.status(400).json({ msg: "Confirm password tidak cocok dengan password anda." });
      hashPassword = await argon2.hash(password);
    }

    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.status(200).json({ msg: "Data user berhasil di update." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Terjadi kesalahan.",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleted) {
      return res.status(404).json({
        msg: "User tidak ditemukan.",
      });
    }

    res.status(200).json({ msg: "Akun user telah dihapus." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server!" });
  }
};
