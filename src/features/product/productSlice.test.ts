// src/features/product/productSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';
import { Product } from '../../types';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
};

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await api.fetchProducts();
    return response;
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (product: Product) => {
    const response = await api.createProduct(product);
    return response;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (product: Product) => {
    const response = await api.updateProduct(product);
    return response;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.status = 'idle';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { selectProduct } = productSlice.actions;

export default productSlice.reducer;
