import React, { useContext, useEffect, useState } from 'react';

import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [shouldButtonAnimate, setShouldButtonAnimate] = useState(false);

  // Looks at the quantity of each item in the cart and sums it up to get the total number of meals in the cart
  const totalNumberOfItemsInCart = cartCtx.items.reduce(
    (NumberOfItemsInCart, item) => NumberOfItemsInCart + item.quantity,
    0
  );

  // we create a class that will dynamically load based on the animation state.
  const btnClasses = `${classes.button} ${shouldButtonAnimate ? classes.bump : ''}`;

  // Retrieves only the items array from the CartContext using object destructuring. This is then used as a dependency in useEffect
  const { items } = cartCtx;

  // Whenever an item is added to the cart, add the cart animation class to the button, then remove it.
  useEffect(() => {
    // If there are no items in the cart, exit the function
    if (items.length === 0) {
      return;
    }

    // Causes the component to re-render and adds the bump class the cart button
    setShouldButtonAnimate(true);

    // Removes the bump class after 300 millisecs
    const timer = setTimeout(() => {
      setShouldButtonAnimate(false);
    }, 300);

    // Cleans timeout function
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  // When th cart button is clicked, it runs this handler which lifts state up to App component which re-renders with a visible cart
  const handleCartOpen = () => props.onUpdateShowCartState(true);

  // When the Your Cart button is clicked, it will display the cart Modal
  return (
    <button
      className={btnClasses}
      onClick={handleCartOpen}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalNumberOfItemsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
