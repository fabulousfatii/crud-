const express = require('express');

const router= express.Router();
const {getProduct, createProduct, updateProduct, deleteProduct} = require('../controller/productController');

router.get('/', getProduct);
router.post('/create', createProduct);
router.put('/update/:_id', updateProduct);
router.delete('/delete/:_id', deleteProduct);

module.exports = router;