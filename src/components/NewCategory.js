// NewCategory.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveCategoriesData } from '../redux/rooms/actions';

// Create a custom hook for category existence check
const useCategoryExists = (categoryName) => {
  const categories = useSelector((state) => state.category);

  return categories.some(
    (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
  );
};

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
  const categoryExists = useCategoryExists(newCategoryDetails.name);

  const handleSaveCategory = async () => {
    const {
      name, description, image, price,
    } = newCategoryDetails;

    if (!name || !description || !image || !price) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      dispatch(saveCategoriesData(newCategoryDetails));

      if (categoryExists) {
        setErrorMessage(`There is already a Category named "${name}".`);
        return;
      }

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
      setErrorMessage('Error saving category. Please try again.');
    }
  };

  return (
    <div className="card text-center">
      <div className="new-form card-header">
        <h1>Add a New Category</h1>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      <div className="card-body bg-success p-2 text-dark bg-opacity-25">
        <input
          className="form-control"
          type="text"
          placeholder="Category Name"
          value={newCategoryDetails.name}
          onChange={(e) => setNewCategoryDetails({ ...newCategoryDetails, name: e.target.value })}
        />

        <textarea
          className="form-control"
          placeholder="Category description"
          value={newCategoryDetails.description}
          onChange={(e) => setNewCategoryDetails({
            ...newCategoryDetails, description: e.target.value,
          })}
        />

        <label htmlFor="categoryPrice">
          <h6>Price:</h6>
          <input
            id="categoryPrice"
            className="form-control"
            type="number"
            value={newCategoryDetails.price}
            onChange={(e) => setNewCategoryDetails({
              ...newCategoryDetails, price: e.target.value,
            })}
          />
        </label>

        <h6>Upload image</h6>
        <input
          className="form-control"
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

        <button className="btn btn-primary" type="button" onClick={handleSaveCategory}>
          Add Category
        </button>
      </div>
    </div>
  );
};

export default NewCategory;
