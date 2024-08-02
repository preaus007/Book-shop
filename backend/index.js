import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "18701028",
  database: "library",
});

// By default we can't send any data to our express server
// to prevent this
app.use(express.json());
// allow client to use backend
app.use(cors());

// Attempt to connect to the database on startup
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
  const qry = "SELECT * FROM books";
  db.query(qry, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const qry =
    "INSERT INTO books (`title`, `description`,`price`, `cover`) VALUES(?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(qry, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Get data successfully");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const qry = "DELETE FROM books WHERE id = ?";

  db.query(qry, [bookID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully");
  });
});

app.put("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const qry =
    "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(qry, [...values, bookID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!!");
});
