import React, { useState } from "react";
import Usehook from "../hook/Usehook";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [product, setProduct] = useState({ name: "", price: "", description:"", img:null });
  const {products} = Usehook()
  // console.log(products)

 

  const handleInputChange = (e) => {
    const { name, value, } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleInputChangeFile=(e)=>{
    const {name,files}=e.target
    setProduct({...product,[name]:files[0]})
  }

  const handleCreate = async(e) => {
    e.preventDefault();
    console.log("Product Created:", product);
    try{
    const formData = new FormData();
    Object.keys(product).forEach(key => {
        formData.append(key, product[key]);
    });
    const response = await axios.post("/api/product/create", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

      if(response){
        console.log(response)
      }
    }catch(error){
      console.log(error)
    }
    //setProduct({ name: "", price: "",description:"", img:null }); // Clear form after submission
  };

  return (
    <div className="p-6 md:p-12 bg-gray-900 h-full max-w-screen flex flex-col justify-center items-center mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-center">Home</h1>

<div className="flex gap-8 w-full">
      {/* Create Product Form */}
      <div className="bg-black shadow-lg rounded-2xl  p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Product</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter product price"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
             Description
            </label>
            <input
              type="text-area"
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter product price"
              required
            />
          </div>
          
          <div>
            <label htmlFor="image" enctype="multipart/form-data" className="block text-sm font-medium text-gray-700">
              upload image
            </label>
            <input
              type="file"
              id="file"
              name="img"
              // value={product.img}
              onChange={(e)=>{setProduct({...product,img:e.target.files[0]})}}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter product price"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Create Product
          </button>
        </form>
      </div>

      {/* Product Card */}
      <div className="flex gap-8 flex-wrap ">
        {products?.map((product) => {
const imageUrl = `http://localhost:3000/${product?.img}`;
        return(
        
          <div className="bg-black shadow-lg rounded-2xl p-6 ">
          <h3 className="text-lg font-medium mb-2">{product?.name}</h3>
         <img src={imageUrl} alt="image" className="w-60 h-60 object-cover" />
          <p className="text-sm text-gray-600">Price: {product?.price}</p>
  
         
          <div>
              <Link to={`/products/${product._id}`}>
            <button
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300"
            >
              view deatils
            </button>
            </Link>
            </div>
          <img src={products[3]?.img} alt="" srcset="" />
        </div>
        )})}
   
      </div>
    </div>
    </div>
  );
};

export default Home;
