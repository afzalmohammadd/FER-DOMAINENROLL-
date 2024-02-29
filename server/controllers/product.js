const Products = require("../models/product.js");

exports.getProducts = async (req, res) => {
  console.log("inside get products");
  try {
    console.log("try");
    const products = await Products.find({}).populate("category");
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("error occured");
  }
};

exports.addProduct = async (req, res) => {
  console.log("inside addProduct")
  try {
    console.log(req.file)
    const { title, price, category, description } = req.body;
    
    const newProduct = new Products({
      title,
      price,
      image: `/uploads/${req.file.filename}`,
      category,
      description,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("error occured");c
  }
};

exports.getProduct = async (req, res) => {
  try {
    const Product = await Products.findById(req.params.productId);
    res.status(200).json(Product);
  } catch (err) {
    console.log(err);
    res.status(500).send("error occured");
  }
};

exports.editProduct = async (req, res) => {
  try {
    const existingProduct = await Products.findById(req.params.productId);
    if (!existingProduct) {
      return res.status(404).send("Product not found");
    }

    // Handle image upload
    let imagePath = existingProduct.image; 
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Update product fields
    existingProduct.title = req.body.title;
    existingProduct.price = req.body.price;
    existingProduct.description = req.body.description;
    existingProduct.category = req.body.category;
    existingProduct.image = imagePath;

    const updatedProduct = await existingProduct.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred");
  }
};
  
  exports.deleteProduct = async (req, res) => {
    console.log(req.params.productId,"iiiiieddddddd");
      try {
        const existingProduct = await Products.findByIdAndDelete(req.params.productId);
        res.status(200).send("Product Deleted Succesfully")  
      } catch (err) {
        console.log(err);
        res.status(500).send("error occured");
      }
    };



