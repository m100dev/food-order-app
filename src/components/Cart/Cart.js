import React, { useContext } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalCost = `$${cartCtx.totalCost.toFixed(2)}`;
  const isCartEmpty = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    console.log(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const handleCartClose = () => props.onUpdateShowCartState(false);

  const handleCartOrder = () => console.log('Ordering...');

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
