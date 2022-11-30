import React, { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  // useContext is utilized to gain access to (consume) the CartContext
  const cartCtx = useContext(CartContext);

  // store the formated price of the meal in price variable as a string.
  const price = `$${props.price.toFixed(2)}`;

  // The user can select the quantity of meals they'd like to order, which is retrieved from the small form attached the the meal.
  const addItemToCartHandler = (quantity) => {
    // calls the addItem handler which uses the passed item object as the payload for the dispatch function.
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      quantity: quantity,
      price: props.price
    });
  };

  // Each meal is displayed as a list item, with its information and an add to cart form
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealItemForm
        id={props.id}
        onAddToCart={addItemToCartHandler}
      />
    </li>
  );
};

export default MealItem;
