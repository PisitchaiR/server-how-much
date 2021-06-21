const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "151.106.124.152",
  user: "u693904119_thunpisitchai",
  password: "3114Kung",
  database: "u693904119_how_much"
});

app.get("/getData", (req, res) => {
  db.query("SELECT * FROM list", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add", (req, res) => {
  const orderName = req.body.orderName;
  const price = req.body.price;
  db.query(
    "INSERT INTO list (name, price) VALUE (?,?)",
    [orderName, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delData/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM list WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen("5000", () => {
  console.log("server run on port 5000");
});
