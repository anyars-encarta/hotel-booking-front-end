// NewCategory.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveCategoriesData } from '../redux/rooms/actions';

const NewCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newCategoryDetails, setNewCategoryDetails] = useState({
    name: '',
    description: '',
    image: '',
    price: 0,
    number_of_rooms: 0,
    number_reserved: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Access the existing categories data from the Redux state
  const categories = useSelector((state) => state.categories);

  const handleSaveCategory = async () => {
    const {
      name, description, image, price,
    } = newCategoryDetails;

    if (!name || !description || !image || !price) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Check if the category already exists
    const categoryExists = categories.some(
      (category) => (
        category.name.toLowerCase() === name.toLowerCase()
      ),
    );

    if (categoryExists) {
      setErrorMessage(`There is already a Category named "${name}".`);
      return;
    }

    try {
      dispatch(saveCategoriesData(newCategoryDetails));
      setNewCategoryDetails({
        name: '',
        description: '',
        image: '',
        price: 0,
        number_of_rooms: 0,
        number_reserved: 0,
      });

      setSuccessMessage('New Category created successfully');
      setErrorMessage('');

      navigate('/');
    } catch (error) {
      // console.error('Error saving category:', error);
      setErrorMessage('Error saving category. Please try again.');
    }
  };

  return (
    <div className="new-form">
      <h1>Add a New Category</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <label htmlFor="categoryName">
        Name:
        <input
          id="categoryName"
          type="text"
          value={newCategoryDetails.name}
          onChange={(e) => setNewCategoryDetails({ ...newCategoryDetails, name: e.target.value })}
        />
      </label>

      <label htmlFor="categoryDescription">
        Description:
        <textarea
          id="categoryDescription"
          value={newCategoryDetails.description}
          onChange={(e) => setNewCategoryDetails({
            ...newCategoryDetails, description: e.target.value,
          })}
        />
      </label>

      <label htmlFor="categoryPrice">
        Price:
        <input
          id="categoryPrice"
          type="number"
          value={newCategoryDetails.price}
          onChange={(e) => setNewCategoryDetails({
            ...newCategoryDetails, price: e.target.value,
          })}
        />
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.onload = (event) => {
            const imageDataUrl = event.target.result;
            setNewCategoryDetails({
              ...newCategoryDetails,
              image: imageDataUrl,
            });
          };

          reader.readAsDataURL(file);
        }}
      />

      <button type="button" onClick={handleSaveCategory}>
        Add Category
      </button>
    </div>
  );
};

export default NewCategory;
