import React, { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const desiredNumberOfItemsRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const numberOfItems = Number(desiredNumberOfItemsRef.current.value.trim());

    if (numberOfItems.length === 0 || numberOfItems < 1 || numberOfItems > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(numberOfItems);
  };

  return (
    <form
      className={classes.form}
      onSubmit={submitHandler}>
      <Input
        ref={desiredNumberOfItemsRef}
        label="Amount"
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
