import User from "../model/UserModel.js";

export const verifyUser = async (req, res, next) => {
  try {
    if (!req.session.userId) return res.status(401).json({ msg: "Mohon login ke akun anda." });
    const user = await User.findOne({
      where: {
        id: req.session.userId,
      },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    req.userId = user.id;
    req.role = user.role;

    next();
  } catch (error) {
    res.status(500).json({ msg: "Terjadi kesalahan pada server." });
  }
};

export const adminOnly = async (req, res, next) => {
  try {
    if (req.role !== "admin") return res.status(403).json({ msg: "Akses Terlarang!" });
    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "Terjadi kesalahan pada server!" });
  }
};
