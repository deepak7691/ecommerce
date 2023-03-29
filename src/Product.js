import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProduct } from './redux/actions/productActions';

const Product = () => {
  const temp = useParams();
  const {id} = temp
  const dispatch = useDispatch();

  console.log('id in products page- ', id);

  const product = useSelector((state) => state.products.selectedProduct);
  const products = useSelector((state) => state.products.listProducts);

  console.log('-----------------product data-------------');
  console.log(product);
  console.log('-----------------products hompage data-------------');
  console.log(products);

  const [loading, setloading] = useState(true); // loading dikhane ke liye state

  const callApi = async (id) => {
    
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);//id use ki particular product k liye
    const data = await response.json();
    console.log(data);
    // setProducts(data);
    dispatch(setSelectedProduct(data));
    setloading(false); // data aagaya to loading false
  }

  useEffect(() => {
    callApi(id);
  }, [id])
  
  if (loading) {
    return <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' alt='Loading'/>
  }

  return (
    <div className='row'>
        <div className='col-6'>
            <img src={product.image} alt="Product Pic" className='img-fluid'/>
        </div>
        <div className='col-6'>
            <h1>{product.title}</h1>
            <h2>Price - {product.price}</h2>
            <div>{product.description}</div>
            <h4>Rating - {product.rating.rate} - Liked By {product.rating.count}</h4>
            <button>Add to Cart</button>
        </div>
    </div>
  )
}

export default Product;
