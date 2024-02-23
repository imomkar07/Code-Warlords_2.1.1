const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

//const dbops = require("./src/dbops");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "project_123",
});
/* database:'testdb'
 database:'mahaveer'
 project_123 */
/* con.connect(); */

const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(dbops(connection));

app.get("/", function (req, res) {
  res.send("hello server 5000 is working");
});

app.post("/", function (req, res) {
  res.status(200).send({
    "message enroll": "data received",
  });
});

/* connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
}); */

// API endpoint to get product details by barcode
app.get("/product/:barcode", (req, res) => {
  const barcode = req.params.barcode; /* '${barcode}' */
  const query =
   /*  `SELECT prodName, mrp, qty, rate,amt FROM demo WHERE barcode = `+[barcode]; */
   `select pno,category_no,cname,cname_marathi,pname,pname_marathi,unit,base_rate,bprice,mrp,
  rate,wholesale,stock,disc,gst_per,gst_type,min_stock,hsn_code,hides,gst_per_type2 
  FROM product WHERE barcode = ` +[barcode];
    connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: ", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    const product = results[0];
    res.json(product);
  });
});

/* //post

app.post("/savedinfo/post", (req, res) => {
  const prodictList = req.body;
  prodictList.forEach((element) => {
    const { prodName, mrp, qty, rate, amt } = element;
    const sql =
      "INSERT INTO savedinfo (prodName, mrp, qty, rate, amt) VALUES (?, ?, ?, ?, ?)";

    connection.query(sql, [prodName, mrp, qty, rate, amt], (err, result) => {
      if (err) {
        console.error("Error executing MySQL query: ", err);
        return res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Data inserted successfully:", result);
        return res.status(200).json({ status: "inserted" });
        // return result;
      }
    });
  });
}); */



/* 192.168.1.10 */
app.listen(5000,"192.168.1.10", () => {
  console.log("server running on localhost 5000");
});
