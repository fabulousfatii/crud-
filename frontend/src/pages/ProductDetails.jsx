import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Usehook from '../hook/Usehook';
import axios from 'axios';

const ProductDetails = () => {

   const {products} = Usehook()
   const {id}=useParams()
  
  const [update,setUpdate]=useState(false)
  const [updateProduct,setUpdateProduct]=useState({name:"",price:"",description:"",img:null})
   const navigate = useNavigate()



const product =products.find((product)=>product._id===id)


const handleDelete = async () => {
  try {
    const response = await axios.delete(`/api/product/delete/${product?._id}`);
    if(response.data.success===true){
    navigate('/')
    }
  }
  catch(error){
        console.log(error)
  }}

  const handleUpdate = () => {
    setUpdate(!update)
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Product Updated:", updateProduct);
  try{
    const response = await axios.put(`/api/product/update/${product?._id}`,updateProduct)
  }catch{

  }

}


  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Product Image and Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={`http://localhost:3000/${product?.img}`}
            alt={product?.name}
            className="w-full max-h-96 object-contain rounded-2xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4 text-white">
          <h1 className="text-2xl font-bold text-gray-100">{product?.name}</h1>
          <p className="text-gray-300">{product?.description}</p>
          <p className="text-lg font-semibold text-green-500">${product?.price}</p>

           
          
          {/* Add to Cart Button */}
          <button
            className={`w-full py-2 px-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-200 ${
              product?.available ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!product?.available}
          >
            Add to Cart
          </button>

           <div className="flex space-x-4 mt-4">
                      <button onClick={handleUpdate}
                        className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300"
                      >
                        Update
                      </button>
            
                      <button onClick={handleDelete}
                        className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                      >
                        Delete
                      </button>
                     
                    </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
  <button onClick={handleUpdate}
    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300"
  >
    Update
  </button>
  {update && (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name"
        onChange={(e)=>setUpdateProduct({...updateProduct,name:e.target.value})}>
          Product Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          onChange={(e)=>setUpdateProduct({...updateProduct,name:e.target.value})}
          placeholder={product?.name}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Product Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          onChange={(e)=>setUpdateProduct({...updateProduct,description:e.target.value})}
          placeholder={product?.description}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price"
        
        >
          Product Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          onChange={(e)=>setUpdateProduct({...updateProduct,price:e.target.value})}
          placeholder={product?.price}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image"
        
        >
          Product image
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image"
          type="file"
          encType="multipart/form-data"
          
          onChange={(e)=>setUpdateProduct({...updateProduct,img:e.target.value})}
          placeholder={product?.img}/>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Update Product
      </button>
    </form>
  )}
</div>
    </div>
  );
};

export default ProductDetails;


