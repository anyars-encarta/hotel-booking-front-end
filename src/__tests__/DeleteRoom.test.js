import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import { useSelector, useDispatch } from 'react-redux';
import DeleteRoom from '../components/DeleteRoom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('Tests DeleteRoom component', () => {
  it('should render loading spinner when loading is true', () => {
    const loading = true;
    const error = null;
    const dispatchMock = jest.fn();

    useSelector.mockImplementation((selector) => selector({
      rooms: { rooms: [], loading, error },
      category: { categories: [] },
    }));

    useDispatch.mockReturnValue(dispatchMock);

    const DeleteRoomComponent = renderer.create(<DeleteRoom />);
    expect(DeleteRoomComponent.toJSON()).toMatchSnapshot();
  });

  it('should render error message when error is present', () => {
    const loading = false;
    const error = 'Something went wrong!';
    const dispatchMock = jest.fn();

    useSelector.mockImplementation((selector) => selector({
      rooms: { rooms: [], loading, error },
      category: { categories: [] },
    }));

    useDispatch.mockReturnValue(dispatchMock);

    const DeleteRoomComponent = renderer.create(<DeleteRoom />);
    expect(DeleteRoomComponent.toJSON()).toMatchSnapshot();
  });

  it('should render table with room data when rooms and categories are present', () => {
    const rooms = [
      { id: 1, name: 'Room 1', category_id: 1 },
      { id: 2, name: 'Room 2', category_id: 2 },
    ];
    const categories = [
      { id: 1, name: 'Category 1', price: 100 },
      { id: 2, name: 'Category 2', price: 200 },
    ];
    const loading = false;
    const error = null;
    const dispatchMock = jest.fn();

    useSelector.mockImplementation((selector) => selector({
      rooms: { rooms, loading, error },
      category: { categories },
    }));

    useDispatch.mockReturnValue(dispatchMock);

    const DeleteRoomComponent = renderer.create(<DeleteRoom />);
    expect(DeleteRoomComponent.toJSON()).toMatchSnapshot();
  });

  it('should render no rooms available message when rooms is empty', () => {
    const rooms = [];
    const categories = [
      { id: 1, name: 'Category 1', price: 100 },
      { id: 2, name: 'Category 2', price: 200 },
    ];
    const loading = false;
    const error = null;
    const dispatchMock = jest.fn();

    useSelector.mockImplementation((selector) => selector({
      rooms: { rooms, loading, error },
      category: { categories },
    }));

    useDispatch.mockReturnValue(dispatchMock);

    const DeleteRoomComponent = renderer.create(<DeleteRoom />);
    expect(DeleteRoomComponent.toJSON()).toMatchSnapshot();
  });
});
