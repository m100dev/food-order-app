/* eslint-disable */
import React, { useReducer } from 'react';
import CartContext from './cart-context';

//This custom component serves as a central state / context management component.

// setting up the default cart state
const defaultCartState = {
  items: [],
  totalCost: 0
};

const cartReducer = (prevState, action) => {
  //The action is the object we pass into the dispatch function.

  if (action.type === 'ADD_ITEM') {
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

  if (action.type === 'REMOVE_ITEM') {
    let updatedTotalCost = (prevState.totalCost - action.payload.price);
    updatedTotalCost = +updatedTotalCost.toFixed(2);

    // Get the index of the item which needs to be removed / quantity needs to be reduced.
    const existingCartItemIndex = prevState.items.findIndex(item => item.id === action.payload.id);

    const existingCartItem = prevState.items[existingCartItemIndex];
    let newUpdatedItems;

    // Debated whether this check should remain because you can only remove an item that was already in the cart. Leaving it here for now.
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - action.payload.quantity
      };

      newUpdatedItems = [...prevState.items];

      // If checks to see if that last it is being removed. If so its quantity will be 0 and will be filtered out of the current items array.
      if (updatedItem.quantity === 0) {
        newUpdatedItems = newUpdatedItems.filter((item => item.id !== action.payload.id));
        return { items: newUpdatedItems, totalCost: updatedTotalCost };
      }

      newUpdatedItems[existingCartItemIndex] = updatedItem;
      return { items: newUpdatedItems, totalCost: updatedTotalCost };
    }
  }

  // fallback state
  return defaultCartState;
};

const CartProvider = (props) => {
  // setting up initial state
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  // The item/itemId is the data / payload for each action type. Each handler dispatches a different action which the cartReducer uses to update the cartState.
  // This handles removing a cart item, it is set as the value for our addItem context
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', payload: item });
  };

  // This handles removing a cart item, it is set as the value for our removeItem context
  const removeItemFromCartHandler = (itemId) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', payload: itemId });
  };

  // When the cartReducer updates the cartState, this CartProvider function re-renders and the updated values of the items and totalCost are set in cartContext variable.
  // This is then set as the 
  const cartContext = {
    items: cartState.items,
    totalCost: cartState.totalCost,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  };

  // Wraps the Context around any child component placed in the CartProvider component. The value set to the value assigned to the cartContext variable (which updates when the cartState updates).
  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
