import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM("academic", "research", "news", "announcement"),
    defaultValue: "academic"
  },
  status: {
    type: DataTypes.ENUM("draft", "published", "archived"),
    defaultValue: "draft"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: "posts",
  indexes: [
    { fields: ["userId", "status"] },
    { fields: ["category", "status"] },
    { fields: ["createdAt"] }
  ]
});

Post.belongsTo(User, { foreignKey: "userId" });

export default Post;
