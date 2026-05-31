import User from "./UserModel.js";
import Category from "./CategoryModel.js";
import Product from "./ProductModel.js";
import Cart from "./CartModel.js";
import CartItem from "./CartItemModel.js";
import Order from "./OrderModel.js";
import OrderItem from "./OrderItemModel.js";
import Sequelize from "sequelize";

// Relasi User & Cart
User.hasOne(Cart);
Cart.belongsTo(User, { foreignKey: "user_id" });

// Relasi User & Order
User.hasMany(Order);
Order.belongsTo(User, { foreignKey: "user_id" });

// Relasi Category & Product
Category.hasMany(Product);
Product.belongsTo(Category, { foreignKey: "category_id" });

// Relasi Cart & CartItem
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

// Relasi Product dengan CartItem
Product.hasMany(CartItem);
CartItem.belongsTo(Product, { foreignKey: "product_id" });

// Relasi Order & OrderItem
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// Relasi Product & OrderItem
Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });
