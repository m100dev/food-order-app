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
      // Sum up the total cost of items in the cart
      const updatedTotalCost = prevState.totalCost + (action.payload.price * action.payload.quantity);

      // Used to check if there is an existing item with the same id. If so increase the quantity value of that item
      const existingCartItemIndex = prevState.items.findIndex(item => item.id === action.payload.id);

      // Save the existing cart item data into a variable to udpdate its quantity
      const existingCartItem = prevState.items[existingCartItemIndex];
      let newUpdatedItems;

      // If there is an existing cartItem, update its quantity by the amount addded in the cart of that same item
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + action.payload.quantity
        };

        // Creates a copy of the previous state items and updates the item of increasing quantity
        newUpdatedItems = [...prevState.items];
        newUpdatedItems[existingCartItemIndex] = updatedItem;
      } else {
        newUpdatedItems = prevState.items.concat(action.payload);
      }

      return { items: newUpdatedItems, totalCost: updatedTotalCost };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCartHandler = (itemId) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', payload: itemId });
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
