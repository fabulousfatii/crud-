
const productModel = require("../model/product.model");
const path= require("path")

const getProduct = async (req, res) => {
   try {
    const data = await productModel.find();
    res.json({success: true, data: data});
   } catch (error) {
     console.error(error);
     res.status(500).send('Server Error');
    
   }
}


const createProduct= async (req, res) => {
   try {
    const {name,price,description} = req.body;
    console.log("req-file",req.file)
    const img= req.file.path
    console.log("req-file",req.file)
    //? req.file.filename || req.file.path :null; // Constructing the full path
    const product = new productModel({
        name,
        price,
        description,
img
        
         // Added to include uploaded file information
    });

    await product.save();
    res.json({success: true, data: product});
   } catch (error) {
     console.error(error);
     res.status(500).json({messeage:error.message});
    
   }
}

const updateProduct = async (req, res) => {
    try {
        const {_id}= req.params;
        const {name,price,description} = req.body;
        const product = await productModel.findOneAndUpdate({_id}, {name
            ,price,description}, {new: true});
        res.json({success: true, data: product});

    } catch (error) {
        
        res.status(500).json({message : error.message});
        
    }
}

const deleteProduct= async (req, res) => {
  try {
    const {_id}= req.params;
    await productModel.findOneAndDelete({_id});
    res.json({success: true, message: 'Product deleted'});
  } catch (error) {
    
    res.status(500).send('Server Error');
  }
}

module.exports = {getProduct, createProduct, updateProduct, deleteProduct};
