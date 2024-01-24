import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listRooms, deleteRoom } from '../redux/rooms/roomSlice';

function DeleteRoom() {
  const rooms = useSelector((state) => state.rooms.rooms);
  const categories = useSelector((state) => state.category.categories);

  const roomss = rooms.map((r) => ({
    ...r,
    category_name: categories.find((c) => c.id === r.category_id).name,
    price: categories.find((c) => c.id === r.category_id).price,
  }));

  const dispatch = useDispatch();

  const handleDelete = (id) => () => {
    dispatch(deleteRoom(id)).then(() => {
      dispatch(listRooms());
    });
  };

  return (
    <div className="container-fluid mt-5">
      <div className="table-responsive col-md-8 offset-md-2">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Room</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            { roomss.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.price}</td>
                <td>{room.category_name}</td>
                <td><button type="button" onClick={handleDelete(room.id)} className="btn btn-danger btn-sm"> Delete </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeleteRoom;
