import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRoom } from '../redux/actions';

const Room = ({ room, fetchRoomAction }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRoomAction();
        setIsLoading(false);
      } catch (error) {
        throw new Error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchRoomAction]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="greeting-content">
      <h1>Selected Room</h1>
      {room.map((singleRoom) => (
        <div key={singleRoom.id}>
          <p>
            Name:
            {singleRoom.name}
          </p>
          <p>
            Room Type:
            {singleRoom.room_type}
          </p>
          <p>
            Room Details:
            {singleRoom.description}
          </p>
        </div>
      ))}
    </div>
  );
};

Room.propTypes = {
  room: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    room_type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  fetchRoomAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  room: state.room,
});

export default connect(mapStateToProps, { fetchRoomAction: fetchRoom })(Room);
