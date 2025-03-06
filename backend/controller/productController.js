
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
    
    const img= req.file.path
  
    const product = new productModel({
        name,
        price,
        description,
        img
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
