const Cart = require("../models/cart.js");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If user's cart doesn't exist, create a new one
      cart = new Cart({ userId, product: [{ productId, quantity }] });
    } else {
      // If user's cart exists, update it
      const existingProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // If the product doesn't exist in the cart, add it
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while adding to cart");
  }
}

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find(req.body.userId).populate("products.productId");
    res.status(200).json(carts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while fetching carts");
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    const existingProductIndex = cart.product.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // If the product exists in the cart, update its quantity
      cart.product[existingProductIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).send("Product not found in cart");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while updating cart");
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    cart.product = cart.product.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).send("Product removed from cart successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while deleting from cart");
  }
};
