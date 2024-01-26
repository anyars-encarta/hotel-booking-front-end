import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listRooms, deleteRoom } from '../redux/rooms/roomSlice';

// const API_URL = process.env.REACT_APP_API_URL;

// const getUser = () => {
//   const userString = localStorage.getItem('user');
//   return userString ? JSON.parse(userString) : null;
// };

const DeleteRoom = () => {
  const rooms = useSelector((state) => state.rooms.rooms);
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.rooms.loading);
  const error = useSelector((state) => state.rooms.error);
  const dispatch = useDispatch();

  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const fetchAdminStatus = async () => {
  //     const userInfo = getUser();

  //     if (userInfo && userInfo.id) {
  //       try {
  //         const response = await fetch(`${API_URL}/users/${userInfo.id}`);
  //         if (response.ok) {
  //           const userData = await response.json();

  //           setIsAdmin(userData.admin);
  //         } else {
  //           console.error('Error fetching user details');
  //         }
  //       } catch (error) {
  //         console.error('Network error while fetching user details', error);
  //       }
  //     }
  //   };

  //   fetchAdminStatus();
  // }, []);

  const roomss = rooms.map((r) => ({
    ...r,
    category_name: categories.find((c) => c.id === r.category_id)?.name || '',
    price: categories.find((c) => c.id === r.category_id)?.price || 0,
  }));

  const handleDelete = (id) => () => {
    dispatch(deleteRoom(id)).then(() => {
      dispatch(listRooms());
    });
  };

  if (loading) {
    return (
      <div className="div-center">
        <h3 className="text-center text-info text-wrap">Loading ...</h3>
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
              {/* {isAdmin && <th scope="col">Action</th>} */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            { roomss.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.price}</td>
                <td>{room.category_name}</td>
                {/* {isAdmin && ( */}
                <td>
                  <button type="button" onClick={handleDelete(room.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
                {/* )} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteRoom;
