import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

function Usehook() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios
        .get("/api/product")
        .then((response) => setProducts(response.data.data))
        .catch((error) => console.error(error));

        console.log(products);
    },[])
    
   


    return {products}
    

}
export default Usehook
