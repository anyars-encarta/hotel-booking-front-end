import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import NewCategory from '../components/NewCategory';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockedUseSelector = useSelector;
const mockedUseDispatch = useDispatch;

describe('Tests NewCategory component', () => {
  beforeEach(() => {
    mockedUseSelector.mockClear();
    mockedUseDispatch.mockClear();
  });

  it('should render the new category form', () => {
    render(<NewCategory />);

    const categoryInput = screen.getByPlaceholderText('Category Name');
    const descriptionInput = screen.getByPlaceholderText('Category Description...');
    const priceInput = screen.getByPlaceholderText('Price');
    const createButton = screen.getByRole('button', { name: 'Create' });

    expect(categoryInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  it('should handle category, description, and price changes', () => {
    render(<NewCategory />);

    const categoryInput = screen.getByPlaceholderText('Category Name');
    const descriptionInput = screen.getByPlaceholderText('Category Description...');
    const priceInput = screen.getByPlaceholderText('Price');

    fireEvent.change(categoryInput, { target: { value: 'New Category' } });
    fireEvent.change(descriptionInput, { target: { value: 'Category Description' } });
    fireEvent.change(priceInput, { target: { value: '10.99' } });

    expect(categoryInput.value).toBe('New Category');
    expect(descriptionInput.value).toBe('Category Description');
    expect(priceInput.value).toBe('10.99');
  });

  it('should display loading spinner while loading', () => {
    mockedUseSelector.mockReturnValueOnce(true);

    render(<NewCategory />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('should display error message if there is an error', () => {
    const errorMessage = 'Something went wrong.';
    mockedUseSelector.mockReturnValueOnce(false);
    mockedUseSelector.mockReturnValueOnce(errorMessage);

    render(<NewCategory />);

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
  });
});
