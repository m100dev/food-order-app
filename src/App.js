import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const updateShowCartState = (state) => setCartIsShown(state);

  return (
    <>
      {cartIsShown && <Cart onUpdateShowCartState={updateShowCartState} />}
      <Header onUpdateShowCartState={updateShowCartState} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
