const express = require("express");
let port = 5000;
const cors = require("cors");
const pool = require("./databae/dbconfig");
const PORT = process.env.PORT || 3000;
const todoRoutes = require("./routes/Todo");
const userRoutes = require("./routes/User");
const userRoutes = require("./routes/Categories");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

app.use("/api/todo", todoRoutes);
app.use("/api/user", userRoutes);
