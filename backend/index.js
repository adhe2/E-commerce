import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import routerUser from "./router/userRoute.js";
import routerLogin from "./router/authRoute.js";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import "./model/Associations.js";

dotenv.config();

const app = express();

const SequelizeStore = connectSessionSequelize(session.Store);

const sessionStore = new SequelizeStore({
  db: db,
});

// const initStore = async () => {
//   await sessionStore.sync();
// };
// initStore();

// await db.authenticate();
// await db.sync();

app.use(express.json());
app.use(cors({ credentials: true }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      httpOnly: true,
    },
  }),
);

app.use(routerUser);
app.use(routerLogin);

app.listen(process.env.APP_PORT, () => {
  try {
    console.log("Server up and running");
  } catch (error) {
    console.log(error);
  }
});
