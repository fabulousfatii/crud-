const express = require('express');
const app = express();
const port = 3000;
const connectdb = require('./db');
const productRouter = require('./router/productRouter');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectdb();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/product', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});