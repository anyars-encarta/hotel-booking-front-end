import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';
import Category from '../components/Category';

const mockStore = configureStore([]);

describe('Category component', () => {
  it('renders correctly when loading is true', () => {
    const store = mockStore({
      category: {
        categories: [],
        loading: true,
        error: null,
      },
    });

    const component = renderer.create(
      <Provider store={store}>
        <Category />
      </Provider>,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when error is present', () => {
  });
});
