const userRouter = require("./user");
const cartRouter = require("./cart");
const addressRouter = require("./address");
const orderRouter = require("./order");
const productRouter = require("./product");
const categoriesRouter = require("./categories");
const importProduct = require("./importProduct");

const route = (app) => {
  app.use("/api", userRouter);
  app.use("/api/import", importProduct);
  app.use("/api/address", addressRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/product", productRouter);
  app.use("/api/categories", categoriesRouter);
};

module.exports = route;
