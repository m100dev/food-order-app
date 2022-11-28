/* eslint-disable */
import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalCost: 0,
  addItem: () => { },
  removeItem: (id) => { }
});

export default CartContext;
