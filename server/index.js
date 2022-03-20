const express = require("express");
const cors = require("cors");
const {pool} = require("./databae/dbconfig");
var cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const todoRoutes = require("./routes/Todo");
const userRoutes = require("./routes/User");
const authRoutes = require("./routes/Auth");
const categoriesRoutes = require("./routes/Categories");

require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
