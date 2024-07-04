// src/components/CreateProduct.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { createProduct } from '../features/product/productSlice';
import { Product } from '../features/product/types';

import "../styles/CreateProduct.css"

const CreateProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: `${Date.now()}`, // Use a unique ID for the product
      name,
      price,
      description,
    };

    try {
      const resultAction = await dispatch(createProduct(newProduct));
      if (createProduct.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        console.error('Failed to create product:', resultAction.payload);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className='form-container'>
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div className='form-group'>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button className='create-btn' type="submit">Create Product</button>
    </form>
    </div>
    
  );
};

export default CreateProduct;
