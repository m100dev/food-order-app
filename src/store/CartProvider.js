/* eslint-disable */
import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalCost: 0
};

const cartReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const updatedItems = prevState.items.concat(action.payload);
      const updatedTotalCost = prevState.totalCost + (action.payload.price * action.payload.quantity);
      console.log(updatedItems);
      console.log(updatedTotalCost);

      return { items: updatedItems, totalCost: updatedTotalCost };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', payload: item })
  };

  const removeItemFromCartHandler = (itemId) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', payload: itemId })
  };

  const cartContext = {
    items: cartState.items,
    totalCost: cartState.totalCost,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
