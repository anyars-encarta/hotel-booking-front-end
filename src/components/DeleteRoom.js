import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listRooms, deleteRoom } from '../redux/rooms/roomSlice';

const DeleteRoom = () => {
  const rooms = useSelector((state) => state.rooms.rooms);
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.rooms.loading);
  const error = useSelector((state) => state.rooms.error);
  const dispatch = useDispatch();

  const roomss = rooms.map((r) => ({
    ...r,
    category_name: categories.find((c) => c.id === r.category_id).name,
    price: categories.find((c) => c.id === r.category_id).price,
  }));

  const handleDelete = (id) => () => {
    dispatch(deleteRoom(id)).then(() => {
      dispatch(listRooms());
    });
  };

  if (loading) {
    return (
      <div className="div-center">
        <h3 className="text-center text-info text-wrap">loading ...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="div-center">
        <h3 className="text-center text-danger text-wrap">
          Fix the Error:
          {error }
        </h3>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5">
      <div className="table-responsive col-md-8 offset-md-2">
        <table className="table table-striped">
          <thead className="table-danger">
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
};

export default DeleteRoom;
