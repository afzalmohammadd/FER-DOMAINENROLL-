const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");

router.post('/addToCart', cartController.addToCart);
router.get('/allCarts', cartController.getAllCarts);
router.put('/:cartId', cartController.updateCart);
router.delete('/:cartId', cartController.deleteCart);

module.exports = router;
