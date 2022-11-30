import React, { useContext } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  // Gets the totalCost state from context to display as a string
  const totalCost = `$${cartCtx.totalCost.toFixed(2)}`;
  const isCartEmpty = cartCtx.items.length > 0;

  // The add and remove handlers are passed to each meal in the Cart from the 
  // Cart Context which will dispatch an action when called.

  // 'ADD_ITEM' action
  const cartItemRemoveHandler = (id, price) => {
    cartCtx.removeItem({ id, quantity: 1, price: price });
  };

  // 'REMOVE_ITEM' action
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  // For each item in the cart a CartItem component is created. The data
  // needed for the handler is pre-added to it so when the function runs, its targets the correct meal.
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id, item.price)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // Handler that lifts state up to the Cart Component which causes the cart to close.
  const handleCartClose = () => props.onUpdateShowCartState(false);

  const handleCartOrder = () => console.log('Ordering...');

  // Cart modal which is portaled.
  return (
    <Modal showModal={props.onUpdateShowCartState}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalCost}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={handleCartClose}>
          Close
        </button>
        {isCartEmpty && (
          <button
            className={classes.button}
            onClick={handleCartOrder}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
