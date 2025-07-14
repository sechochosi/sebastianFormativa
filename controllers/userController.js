import User from "../models/User.js";

// Obtener_fijo
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener perfil", details: err.message });
  }
};

// Obtener todos
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios", details: err.message });
  }
};
