import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://127.0.0.1:4000/api/rooms';

const initialState = {
  isLoading: false,
  rooms: [],
  error: undefined,
};

// list rooms
const listRooms = createAsyncThunk('rooms/listRooms', async () => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching rooms: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(listRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(listRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export { listRooms };
export default roomsSlice.reducer;
