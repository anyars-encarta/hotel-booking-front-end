// room.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRoom, fetchUserData, setRoom } from '../redux/rooms/actions';

const Room = ({
  rooms, fetchRoomAction, user, fetchUserDataAction,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('http://localhost:4000/api/categories');

        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.statusText}`);
        }

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        await Promise.all([fetchUserDataAction(), fetchRoomAction()]);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // throw new Error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchRoomAction, fetchUserDataAction]);

  const getCategoryById = (categoryId) => categories.find(
    (category) => category.id === categoryId,
  );

  const handleDelete = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete room: ${response.statusText}`);
      }

      await fetchRoomAction();
      setSuccessMessage('Room deleted successfully');
    } catch (error) {
      throw new Error('Error deleting room:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="room-content">
      <h1>Available Rooms</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Room Type</th>
            <th>Room Details</th>
            <th>Price</th>
            {user.isAdmin && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {rooms
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((singleRoom) => (
              <tr key={singleRoom.id}>
                <td>{singleRoom.name}</td>
                <td>{getCategoryById(singleRoom.category_id)?.name || ''}</td>
                <td>{getCategoryById(singleRoom.category_id)?.description || ''}</td>
                <td>
                  {getCategoryById(singleRoom.category_id)?.price
                    ? `$${getCategoryById(singleRoom.category_id)?.price.toFixed(2)}`
                    : ''}
                </td>
                {user.isAdmin && (
                <td>
                  <button type="button" onClick={() => handleDelete(singleRoom.id)}>
                    Delete Room
                  </button>
                </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

Room.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
  })).isRequired,
  fetchRoomAction: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
  fetchUserDataAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.rooms,
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchRoomAction: fetchRoom,
  fetchUserDataAction: fetchUserData,
  setRoomAction: setRoom,
})(Room);
