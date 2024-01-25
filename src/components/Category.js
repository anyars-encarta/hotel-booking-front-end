/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategories } from '../redux/categories/categorySlice';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/mainpage.css';

const Category = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated, user);

  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, categories.length - 3));
  };

  const showNextButton = startIndex + 3 < categories.length;
  const showPrevButton = startIndex > 0;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="div-center">
        <h3 className="text-info text-wrap">loading ...</h3>
      </div>
    );
  }
  if (categories.length === 0) {
    return (
      <div className="div-center">
        <h3 className="text-center text-info text-wrap">No Categories Available</h3>
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
    <div className="center-container">
      <h1 className="text-center text-wrap heading text-uppercase my-3">Available categories</h1>
      <p className="text-center text-wrap mb-3">Please Select Your Favorite Room in the Below Category.</p>
      <p className="text-center mb-4 opacity-50">. . . . . . . . . . . . . . . . .</p>
      <div className="setButtons">
        <button type="button" onClick={handlePrevClick} className={`arrow-btn-prev ${showPrevButton ? 'arrow-btn-prev ' : 'arrow-btn-disable'}`} disabled={!showPrevButton}>
          <i className="bi bi-caret-left" />
        </button>

        <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center">
          {categories.slice(startIndex, startIndex + 3).map((category) => (
            <div key={category.id} className="col">
              <div className="card h-100">
                <img src={category.image} className="img-fluid object-fit-cover card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title text-center category ">{category.name}</h5>
                  <p className="text-center mb-4 opacity-50">. . . . . . . . . . . . .</p>
                  <div className="paragraph-container">
                    <p className="card-text text-center truncate-paragraph">{ category.description }</p>
                  </div>
                  <div className="d-grid col-5 mx-auto">
                    <Link to={`/category_details/${category.id}`} className="btn btn-success">View Details</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className={`arrow-btn-next ${showNextButton ? 'arrow-btn-next ' : 'arrow-btn-disable'}`} onClick={handleNextClick} disabled={!showNextButton}>
          <i className="bi bi-caret-right" />
        </button>
      </div>
    </div>
  );
};

export default Category;
