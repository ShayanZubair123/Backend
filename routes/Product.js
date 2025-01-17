const express = require('express');
const router = express.Router();
const adminController = require('../controller/Product');


router.get('/getAll', adminController.getAllProducts);

router.post('/create', adminController.createProduct);

router.put('/update/:id', adminController.updateProduct);

router.delete('/delete/:id', adminController.deleteProduct);

module.exports = router;
