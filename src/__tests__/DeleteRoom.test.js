import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DeleteRoom from '../components/DeleteRoom';

const mockStore = configureStore([]);

describe('DeleteRoom component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      rooms: {
        rooms: [
          { id: 1, name: 'Room 1', category_id: 1 },
          { id: 2, name: 'Room 2', category_id: 2 },
        ],
        loading: false,
        error: null,
      },
      category: {
        categories: [
          { id: 1, name: 'Category 1', price: 100 },
          { id: 2, name: 'Category 2', price: 150 },
        ],
        loading: false,
        error: null,
      },
    });
  });

  it('renders correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <DeleteRoom />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('dispatches delete action on button click', async () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <DeleteRoom />
      </Provider>,
    );

    // Mock dispatch
    store.dispatch = jest.fn();

    // Find the delete button within the first row (for example)
    const deleteButtons = getAllByText(/Delete/i);

    const deleteButton = deleteButtons[0];
    // Simulate delete button click
    fireEvent.click(deleteButton);

    // Wait for dispatch and listRooms to be called
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(2); // deleteRoom + listRooms
    });
  });
});
