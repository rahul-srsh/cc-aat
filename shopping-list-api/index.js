require("dotenv").config();

const express = require("express");

const app = express();

const jwt = require("jsonwebtoken");

var cors = require("cors");

const routes = require("./routes");

// const agenda = require("./controllers/weatherController");

app.use(express.json());

app.use(cors());

app.options('*', cors()) 

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

// app.get("/shopping", authenicateToken, routes.getItems);

app.get("/shopping", authenicateToken, routes.getItems);

app.post("/item", authenicateToken, routes.getSingleItem);

app.post("/add-item", authenicateToken, routes.addItem);

app.put("/edit-item", authenicateToken, routes.updateItem);

app.delete("/delete-item", authenicateToken, routes.deleteItem);

app.get("/categories", routes.getCategories);

app.post("/register", routes.addUser);

app.post("/login", routes.loginUser);

function authenicateToken(req, res, next) {
  // console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    // console.log(user);
    next();
  });
}

app.listen(5000);
