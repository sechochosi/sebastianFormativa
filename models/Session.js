import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Session = sequelize.define("Session", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tokenHash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  userAgent: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  expiresAt: {
    type: DataTypes.DATE,
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
  lastUsedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "sessions"
});

Session.belongsTo(User, { foreignKey: "userId" });

export default Session;
