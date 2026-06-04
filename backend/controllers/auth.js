import User from "../model/UserModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan atau tidak terdaftar" });

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Password salah!" });

    req.session.userId = user.id;

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          msg: "Gagal menyimpan session",
        });
      }

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });

    console.log(req.session);
  } catch (error) {
    console.log(error);
  }
};

export const Me = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ msg: "Anda belum login ke akun anda" });

    const user = await User.findOne({
      attributes: ["id", "name", "email", "role"],
      where: {
        id: req.session.userId,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const logOutUser = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: "tidak dapat logout" });
    });

    res.status(200).json({ msg: "Anda telah logout" });
  } catch (error) {
    console.log(error);
  }
};
