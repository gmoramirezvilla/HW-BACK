const express = require("express");
const path = require('path');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/auth", require("./routes/auth"));
app.use("/books", require("./routes/books"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})