import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';
import NewRoom from '../components/NewRoom';

describe('NewRoom component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewRoom />
        </MemoryRouter>
      </Provider>,
    );

    expect(getByText('Add New Room')).toBeInTheDocument();
    expect(getByPlaceholderText('Room Name')).toBeInTheDocument();
    expect(getByText('Select Category')).toBeInTheDocument();
    expect(getByText('Create')).toBeInTheDocument();
    expect(getByText('Back to Home')).toBeInTheDocument();
  });

  test('form submission works correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewRoom />
        </MemoryRouter>
      </Provider>,
    );

    const roomInput = getByPlaceholderText('Room Name');
    const categorySelect = getByText('Select Category');
    const createButton = getByText('Create');

    fireEvent.change(roomInput, { target: { value: 'Test Room' } });
    fireEvent.change(categorySelect, { target: { value: '1' } });
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  test('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NewRoom />
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
