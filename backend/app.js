const express = require('express');
const app = express();
const port = 3000;
const connectdb = require('./db');
const productRouter = require('./router/productRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectdb();

app.use('/product', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});