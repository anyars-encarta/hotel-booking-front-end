// NewRoom.js
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveCategoriesData } from '../redux/actions';

const NewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newCategoryDetails, setNewCategoryDetails] = useState({
    name: '',
    description: '',
    image: '',
    number_of_rooms: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Access the existing categories data from the Redux state
  const categories = useSelector((state) => state.categories);

  const handleSaveCategory = async () => {
    const catName = newCategoryDetails.name;
    const catDesc = newCategoryDetails.description;
    const catImage = newCategoryDetails.image;
    const catNumRooms = newCategoryDetails.number_of_rooms;

    if (!catName || !catDesc || !catImage || !catNumRooms) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Check if the category already exists
    const categoryExists = categories.some(
      (category) => (
        category.name.toLowerCase() === newCategoryDetails.name.toLowerCase()
      ),
    );

    if (categoryExists) {
      setErrorMessage(`There is already a Category named "${newCategoryDetails.name}".`);
      return;
    }

    try {
      dispatch(saveCategoriesData(newCategoryDetails));
      setNewCategoryDetails({
        name: '',
        description: '',
        image: '',
        number_of_rooms: '',
      });

      setSuccessMessage('New Category created successfully');
      setErrorMessage('');

      navigate('/');
    } catch (error) {
      navigate('/');
    }
  };

  return (
    <div className="new-form">
      <h1>Add a New Category</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {/* Add error message display */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Render form inputs for each field (name, description, image, number_of_rooms) */}
      <input
        type="text"
        placeholder="Name"
        value={newCategoryDetails.name}
        onChange={(e) => setNewCategoryDetails({
          ...newCategoryDetails, name: e.target.value,
        })}
      />

      <button type="button" onClick={handleSaveCategory}>
        Add Category
      </button>
    </div>
  );
};

// NewCategory.propTypes = {
//   categories: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//   })).isRequired,
//   // handleFormSubmit: PropTypes.func.isRequired,
// };

export default NewCategory;
