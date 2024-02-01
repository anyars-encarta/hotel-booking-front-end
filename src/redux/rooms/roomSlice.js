// roomSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'https://hotel-booking-5vj9.onrender.com/api/rooms';

const initialState = {
  isLoading: false,
  rooms: [],
  deletedRoom: {},
  createdRoom: {},
  error: undefined,
};

// create room

const createRoom = createAsyncThunk('rooms/createRoom', async (formData) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error creating room: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
});

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

// delete room

const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting room: ${response.statusText}`);
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
      })
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deletedRoom = action.payload;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdRoom = action.payload;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export { listRooms, deleteRoom, createRoom };
export default roomsSlice.reducer;
