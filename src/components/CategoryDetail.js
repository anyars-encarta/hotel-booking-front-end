import { useSelector } from 'react-redux';
import w from '../images/w.jpg';
import useCreateReservation from '../hooks/useCreateReservation';
import useDeleteReservation from '../hooks/useDeleteReservation';
import useGetRooms from '../hooks/useGetCategory';

const CategoryDetail = () => {
  const { reserveRoom, isPending } = useCreateReservation();
  const { category: cat, isGettingRooms, error } = useGetRooms();

  const { deleteReserved, isDeleting } = useDeleteReservation();
  const { user } = useSelector((state) => state.auth);

  const reservedRooms = cat?.rooms.filter((r) => r.reserved === true);

  if (isGettingRooms) {
    return (
      <div className="d-flex justify-content-center">
        <div className="text-success spinner-border mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
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
    <>
      <div className="container d-flex-center">
        <div className="row d-flex justify-content-between">
          <h2 className="text-center heading mb-3">
            {cat?.name}
            {' '}
            Category
          </h2>
          <p className="text-center mb-4 opacity-50">. . . . . . . . . . . . . . . . . . . .</p>

          <div className="col-md-4 div-border mb-3 ms-3">
            <p className="text-center">
              List of Rooms in
              {' '}
              { cat?.name }
            </p>
            <table className="table table-striped table-hover">
              <tbody>
                { cat?.rooms.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>
                      {
                        r.reserved
                          ? (
                            <button
                              type="button"
                              className="btn btn-success btn-sm float-end"
                              disabled={isDeleting}
                              onClick={() => deleteReserved(r.id)}
                            >
                              {' '}
                              Reserved
                            </button>
                          )
                          : (
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm bg-blue-500 float-end"
                              disabled={isPending}
                              onClick={() => reserveRoom({ room_id: r.id, user_id: user.id })}
                            >
                              {' '}
                              Reserve Room
                            </button>
                          )
                    }
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          <div className="col-md-4 mb-3">
            <img src={cat?.image} className="img-fluid" alt="categoryImage" />
            <div className="paragraph-container">
              <p className="card-text text-center div-border mt-4">{ cat?.description }</p>
            </div>
          </div>
          <div className="col-md-3">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Price: </td>
                  <td>
                    $
                    {cat?.price}
                    /Night
                  </td>
                </tr>
                <tr>
                  <td>Available Rooms:</td>
                  <td className="text-center">
                    {cat?.number_of_rooms - reservedRooms?.length}
                  </td>
                </tr>
                <tr>
                  <td>Reserved Rooms:</td>
                  <td className="text-center">
                    {reservedRooms?.length}
                  </td>
                </tr>
                <tr>
                  <td>Total Rooms:</td>
                  <td className="text-center">
                    {cat?.number_of_rooms}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-grid color-wheel ">
              <img src={w} className="img-fluid" alt="full cycle" />
            </div>
          </div>
          <p className="text-center back-btn mt-3">
            <a className="btn btn-secondary" href="/show-rooms">Back to Rooms</a>
          </p>
        </div>
      </div>

    </>
  );
};

export default CategoryDetail;
