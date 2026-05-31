import db from "../config/database.js";
import { DataTypes } from "sequelize";

const Order = db.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    total_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "processing", "shipped", "completed", "cancelled"),
      defaultValue: "pending",
    },
  },
  {
    freezeTableName: true,
  },
);

export default Order;
