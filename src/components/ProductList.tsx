import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, selectAllProducts } from '../features/product/productSlice';
import { RootState, AppDispatch } from '../store'; 
import { Product } from '../features/product/types';

import '../styles/ProductList.css'

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); 
  const products = useSelector((state: RootState) => state.product.products) || [];
  const status = useSelector((state: RootState) => state.product.status);
  const error = useSelector((state: RootState) => state.product.error);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <div className='top-bar'>
      <input
      className='search-box'
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Link className='create-product-btn' to='create'>Create Product</Link>
      
     
      </div>
        
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>{error}</div>}
      <div className='products'>
      
        {filteredProducts.map(product =>{ return (
          
           
              
            <div className='product'>
            
              <h2 className='product-name'>{product.name}</h2>
            <p className='product-price'>{product.price}</p>
            <p className='product-description'>{product.description}</p>
            <Link className='view-details-btn' to={`/product/${product.id}`}>View Details</Link>
            
            </div>
            
           
            
          
        )})}
      
      </div>
      
    
    </div>
  );
};

export default ProductList;
