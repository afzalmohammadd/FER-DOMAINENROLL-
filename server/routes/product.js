const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const productController = require("../controllers/product.js")



console.log("getproducts");
router.post('/addProduct',upload.single('image'),productController.addProduct);
router.get('/allProducts',productController.getProducts)
router.put('/:productId',upload.single('image'),productController.editProduct)
router.delete('/:productId',productController.deleteProduct)
router.get('/:productId',productController.getProduct)


module.exports = router;