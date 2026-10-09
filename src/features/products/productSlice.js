
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/products.json');

      if (!response.ok) {
        throw new Error(`Product data request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('products.json must contain a JSON array.');
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Unable to load products.'
      );
    }
  },
  {
    // Allow the initial request and retries, but prevent duplicates.
    condition: (_, { getState }) =>
      getState().products.status !== 'loading',
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.meta.condition) return;

        state.status = 'failed';
        state.error =
          action.payload ||
          action.error.message ||
          'Unable to load products.';
      });
  },
});

export default productSlice.reducer;