const express = require('express');
const { addProduct, getAllProducts, deleteProduct, editProduct,getReport, getProducts  } = require('./productController');
const router = express.Router();

//get all products
router.get('/', getAllProducts);

//get products with filter, sort and pagination
router.get('/:sortBy/:order/:limit', getProducts);

//add product
router.post('/', addProduct);

//update product
router.put('/:id', editProduct);

//delete product
router.delete('/:id', deleteProduct);

//get report
router.get('/report', getReport);


module.exports = router;