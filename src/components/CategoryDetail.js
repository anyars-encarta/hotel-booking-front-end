import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory } from '../redux/categories/categorySlice';
import { listRooms } from '../redux/rooms/roomSlice';
import w from '../images/w.jpg';

const CategoryDetail = () => {
  const { id } = useParams();
  const categories = useSelector((state) => state.category.categories);
  const cat = categories.find((category) => category.id === parseInt(id, 10));
  const rooms = useSelector((state) => state.rooms.rooms);
  const room = rooms.filter((r) => r.category_id === parseInt(id, 10));
  const loading = useSelector((state) => state.category.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory(id));
    dispatch(listRooms());
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="center-container">
        <h3 className="text-center text-info text-wrap">loading ...</h3>
      </div>
    );
  }

  return (
    <>
      <div className="container d-flex-center">
        <div className="row d-flex justify-content-between">
          <h2 className="text-center mb-3">
            {cat.name}
            {' '}
            Category
          </h2>
          <p className="text-center mb-4 opacity-50">. . . . . . . . . . . . . . . . . . . .</p>

          <div className="col-md-4 div-border mb-3">
            <p className="text-center">
              List of Rooms in
              {' '}
              { cat.name }
            </p>
            <table className="table table-striped table-hover">
              <tbody>
                { room.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td><button type="button" className="btn btn-success btn-sm float-end"> Reserve Room </button></td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          <div className="col-md-4 mb-3">
            <img src={cat.image} className="img-fluid" alt="Ful" />
            <div className="paragraph-container">
              <p className="card-text text-center div-border mt-4">{ cat.description }</p>
            </div>
          </div>
          <div className="col-md-3">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <td>Price: </td>
                  <td>
                    $
                    {cat.price}
                    /Night
                  </td>
                </tr>
                <tr>
                  <td>Available Rooms:</td>
                  <td className="text-center">
                    {cat.number_of_rooms - cat.number_reserved}
                  </td>
                </tr>
                <tr>
                  <td>Reserved Rooms:</td>
                  <td className="text-center">
                    {cat.number_reserved}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-grid color-wheel ">
              <img src={w} className="img-fluid" alt="Ful" />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default CategoryDetail;
