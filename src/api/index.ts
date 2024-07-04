// src/api/index.ts

import axios from 'axios';
import { Product } from '../features/product/types';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchProducts = () => {
  return api.get<Product[]>('/products');
};

export const createProduct = (product: Product) => {
  return api.post<Product>('/products', product);
};

export const updateProduct = (product: Product) => {
  return api.put<Product>(`/products/${product.id}`, product);
};

export default {
  fetchProducts,
  createProduct,
  updateProduct,
};
