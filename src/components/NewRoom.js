import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createRoom, listRooms } from '../redux/rooms/roomSlice';

function NewRoom() {
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
      <div className="div-center">
        <h3 className="text-center text-primary text-wrap">loading ...</h3>
      </div>
    );
  }

  return (
    <div className="col-md-8 offset-md-2 mt-5">
      <h1 className="mb-5 text-center">Add New Room</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <input type="text" value={room} onChange={(e) => handleRoomChange(e)} className="form-control" placeholder="Room Name" id="room" />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            value={category}
            onChange={(e) => catChange(e)}
          >
            <option value="">Open this select menu</option>
            {cat.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default NewRoom;
