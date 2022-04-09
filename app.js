require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const routes = require("./server/routes/recipeRoutes.js");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", routes);

app.listen(port, () => console.log(`Listening to port ${port}`));
