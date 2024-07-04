import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api';
import { Product } from './types';
import { RootState } from '../../store';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await api.fetchProducts();
  return response.data;
});

export const createProduct = createAsyncThunk('product/createProduct', async (product: Product) => {
  const response = await api.createProduct(product);
  return response.data;
});

export const updateProductAsync = createAsyncThunk('product/updateProduct', async (product: Product) => {
  const response = await api.updateProduct(product);
  return response.data;
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    selectProduct(state, action: PayloadAction<number>) {
      state.selectedProduct = state.products.find(product => parseInt(product.id) == action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export const { setProducts, selectProduct } = productSlice.actions;

export const selectAllProducts = (state: RootState) => state.product.products;

export default productSlice.reducer;
