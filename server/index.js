const express = require("express");
const dbconnection = require("./connection/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 7000;
const path = require("path")



app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000","https://precious-malabi-008175.netlify.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const usersRouter = require("./routes/auth.js");
const productRouter = require("./routes/product.js");
const cartRouter = require("./routes/cart.js");

// Routes
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

dbconnection();
