// NewRoom.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createRoom, listRooms } from '../redux/rooms/roomSlice';

const NewRoom = () => {
  const cat = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [room, setRoom] = useState('');
  const [category, setCategory] = useState('');

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const catChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createRoom({ name: room, category_id: category }));
    navigate('/');
    dispatch(listRooms());
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="text-success spinner-border mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-8 offset-md-2 mt-5">
      <h1 className="mb-5 text-center heading">Add New Room</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <input type="text" required value={room} onChange={(e) => handleRoomChange(e)} className="form-control" placeholder="Room Name" id="room" />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={category}
            onChange={(e) => catChange(e)}
          >
            <option value="">Select Category</option>
            {cat.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
      <p className="text-center mt-3">
        <a className="btn btn-secondary" href="/">Back to Home</a>
      </p>
    </div>
  );
};

export default NewRoom;
