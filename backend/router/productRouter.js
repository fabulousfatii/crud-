const express = require('express');
const multer= require('multer');

const router= express.Router();
const {getProduct, createProduct, updateProduct, deleteProduct} = require('../controller/productController');
const {upload} = require('../middleware/multerMiddleware');

router.get('/', getProduct);
router.post('/create', upload.single('img'), createProduct);

router.put('/update/:_id', updateProduct);
router.delete('/delete/:_id', deleteProduct);

module.exports = router;
