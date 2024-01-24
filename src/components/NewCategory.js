import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCategory, listCategories } from '../redux/categories/categorySlice';

const NewCategory = () => {
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createCategory({
      name: category, description, image, price,
    }));
    navigate('/');
    dispatch(listCategories());
  };

  if (loading) {
    return (
      <div className="div-center">
        <h3 className="text-center text-primary text-wrap">loading ...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="div-center">
        <h3 className="text-center text-danger text-wrap">{error}</h3>
      </div>
    );
  }

  return (
    <div className="col-md-8 offset-md-2 mt-5">
      <h1 className="mb-5 heading text-center">Add New Category</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <input type="text" required value={category} onChange={(e) => handleCategoryChange(e)} className="form-control" placeholder="Category Name" id="category" />
        </div>
        <div className="mb-3">
          <div className="form-floating">
            <textarea required className="form-control" value={description} onChange={(e) => handleDescriptionChange(e)} style={{ height: '100px' }} placeholder="Deacription Here ..." id="description" />
          </div>
        </div>

        <div className="mb-3">
          <input type="text" required value={image} onChange={(e) => handleImageChange(e)} className="form-control" placeholder="Image Link" id="image" />
        </div>
        <div className="mb-3">
          <input type="number" required value={price} onChange={(e) => handlePriceChange(e)} className="form-control" placeholder="Price" id="price" />
        </div>

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
      <p className="text-center mt-3">Image Link: https://www.eliaermouhotel.com/uploads/photos/D1024/2019/02/standardroom_1878.jpg</p>
      <p className="text-center mt-3">
        <a className="btn btn-secondary" href="/show-rooms">Back to Rooms</a>
      </p>
    </div>
  );
};

export default NewCategory;
