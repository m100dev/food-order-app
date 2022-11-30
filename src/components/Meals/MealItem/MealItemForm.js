import React, { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  // Setting state that check the quantity to ensure it is between 1-5.
  const [amountIsValid, setAmountIsValid] = useState(true);

  // We use a reference to retrieve that value of the quantity and store it in a constant
  const desiredNumberOfItemsRef = useRef();

  // Validates the user input before passing the total number of meals that should be added to the cart.
  const submitHandler = (event) => {
    event.preventDefault();

    const numberOfItems = Number(desiredNumberOfItemsRef.current.value.trim());

    if (numberOfItems.length === 0 || numberOfItems < 1 || numberOfItems > 5) {
      setAmountIsValid(false);
      return;
    }

    // Function used to lift the quantity value up to the parent component.
    props.onAddToCart(numberOfItems);
  };

  return (
    <form
      className={classes.form}
      onSubmit={submitHandler}>
      <Input
        ref={desiredNumberOfItemsRef}
        label="Quantity"
        input={{
          id: `amount_${props.id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
