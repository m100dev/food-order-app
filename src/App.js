import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  // Cart modal state
  const [showCart, setShowCart] = useState(false);

  // This handler will be used to retrieve cart state data from its child components. It is passed as a prop
  // to the components which will use it to open and close the cart.
  const updateShowCartState = (state) => setShowCart(state);

  // The cart is conditionally rendered based on the showCart state value
  return (
    <CartProvider>
      {showCart && <Cart onUpdateShowCartState={updateShowCartState} />}
      <Header onUpdateShowCartState={updateShowCartState} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
