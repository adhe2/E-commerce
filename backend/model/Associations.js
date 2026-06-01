import User from "./UserModel.js";
import Category from "./CategoryModel.js";
import Product from "./ProductModel.js";
import Cart from "./CartModel.js";
import CartItem from "./CartItemModel.js";
import Order from "./OrderModel.js";
import OrderItem from "./OrderItemModel.js";
import Sequelize from "sequelize";

// Relasi User & Cart
User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

// Relasi User & Order
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

// Relasi Category & Product
Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

// Relasi Cart & CartItem
Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

// Relasi Product dengan CartItem
Product.hasMany(CartItem, { foreignKey: "product_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

// Relasi Order & OrderItem
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// Relasi Product & OrderItem
Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });
