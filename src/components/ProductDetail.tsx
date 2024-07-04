import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, updateProductAsync } from '../features/product/productSlice';
import { useParams,useNavigate } from 'react-router-dom';
import { RootState,AppDispatch } from '../store';
import api from '../api/api';
//import { updateProduct } from '../api';

import "../styles/ProductDetail.css"

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ProductDetail: React.FC =  () => {
  const [clickUpdate,setClickUpdate] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.product.products.find(product => product.id === (id || ''))
  );
  const products = useSelector((state: RootState) => state.product.products);
  const selectedProduct = products.find(product => product.id === (id || ''));


  const [editedProduct, setEditedProduct] = useState<Product>({
    id: selectedProduct?.id || '',
    name: selectedProduct?.name || '',
    price: selectedProduct?.price || 0,
    description: selectedProduct?.description || '',
  });

  useEffect(() => {
    if (selectedProduct) {
      setEditedProduct(selectedProduct);
    }
  }, [selectedProduct]);

  const handleUpdate = () => {
    if (product) {
        setClickUpdate(true);
    //   dispatch(updateProduct({ ...product, name: 'Updated Name',price:20,description:"new" }));
    //   navigate('/');
    }
  };




 
console.log(selectedProduct)

 

//console.log(editedProduct)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditedProduct({
        ...editedProduct,
        [name]: name === 'price' ? parseFloat(value) : value,
      });
  };

  const handleUpdateProduct = async () => {
    const up = await api.updateProduct(editedProduct)
    dispatch(updateProductAsync(editedProduct));
    console.log(editedProduct)
   
   navigate("/")
  };

  return (
    <div>
      {product ? (
        <div >
            <div className='product-details-container'>
          <h1 className='product-name'>{product.name}</h1>
          <p className='product-price'>{product.price}</p>
          <p className='product-description'>{product.description}</p>
          <button className='edit-product-btn' onClick={handleUpdate}>Edit Product</button>
          </div>
          {
            clickUpdate ? (
                <div className='form-container'>
                <h2>Edit Product</h2>
                <form>
                  <div className='form-group'>
                    <label>Product Name:</label>
                    <input type="text" name="name" value={editedProduct.name} onChange={handleInputChange} />
                  </div>
                  <div className='form-group'>
                    <label>Price:</label>
                    <input type="number" name="price" value={editedProduct.price.toString()} onChange={handleInputChange} />
                  </div>
                  <div className='form-group'> 
                    <label>Description:</label>
                    <textarea name="description" value={editedProduct.description} onChange={handleInputChange} />
                  </div>
                  <button className='create-product-btn' type="button" onClick={handleUpdateProduct}>Update Product</button>
                </form>
              </div>
            ) : " "
          }
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
