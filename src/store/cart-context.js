/* eslint-disable */
import React from 'react';

// Setting the cart context shape and state
const CartContext = React.createContext({
  items: [],
  totalCost: 0,
  addItem: (item) => { },
  removeItem: (id, price) => { }
});

export default CartContext;


/* Remember that useContext() always looks for the closest 
  provider above the component that calls it. It searches 
  upwards and does not consider providers in the component 
  from which you’re calling useContext()
*/
