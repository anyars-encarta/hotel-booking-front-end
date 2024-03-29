import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'https://hotel-booking-5vj9.onrender.com/api/categories';

const initialState = {
  categories: [],
  category: {},
  createdCategory: {},
  loading: false,
  error: undefined,
};

// list categories

const listCategories = createAsyncThunk('categories/listCategories', async () => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching error: ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
});

// get category by id

const getCategory = createAsyncThunk('categories/getCategory', async (categoryId) => {
  try {
    const response = await fetch(`${url}/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching category: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
});

// create category

const createCategory = createAsyncThunk('categories/createCategory', async (formData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error creating category: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
});

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(listCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(listCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(listCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.createdCategory = action.payload;
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export { listCategories, getCategory, createCategory };
export default categorySlice.reducer;
