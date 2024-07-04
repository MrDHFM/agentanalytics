import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../store';
import ProductList from './ProductList';

test('renders Product List title', () => {
  render(
    <Provider store={store}>
      <Router>
        <ProductList />
      </Router>
    </Provider>
  );

  expect(screen.getByText(/Product List/i)).toBeInTheDocument();
});
