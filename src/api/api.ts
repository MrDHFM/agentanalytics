import axios from 'axios';
import { Product } from '../types';

const API_BASE_URL = 'http://localhost:3001';

const api = {
  fetchProducts: async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  },
  createProduct: async (product: Product) => {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  },
  updateProduct: async (product: Product) => {
    const response = await axios.put(`${API_BASE_URL}/products/${product.id}`, product);
    return response.data;
  }
};

export default api;
