import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  studentId: {
    type: DataTypes.STRING(9),
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM("student", "teacher", "admin", "coordinator"),
    defaultValue: "student"
  },
  faculty: {
    type: DataTypes.ENUM(
      "business_school",
      "ciencias_tecnicas",
      "arquitectura_diseno_arte",
      "ciencias_medicas_salud_vida",
      "jurisprudencia_ciencias_sociales_humanidades"
    ),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "users",
  indexes: [
    { fields: ["email"] },
    { fields: ["faculty", "role"] },
    { fields: ["studentId"] }
  ]
});

export default User;
