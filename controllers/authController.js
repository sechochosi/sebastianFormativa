import User from "../models/User.js";
import Session from "../models/Session.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret, expiresIn } from "../config/jwt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email, isActive: true } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, faculty: user.faculty },
      secret,
      { expiresIn }
    );

    await Session.create({
      userId: user.id,
      tokenHash: bcrypt.hashSync(token, 8),
      userAgent: req.headers["user-agent"] || "Desconocido",
      ipAddress: req.ip,
      expiresAt: new Date(Date.now() + 86400000)
    });

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión", details: err.message });
  }
};
