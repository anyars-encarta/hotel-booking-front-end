import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    setToken: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    /* eslint-disable no-use-before-define */
    clearToken: (state) => {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(clearToken());
      return {};
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
