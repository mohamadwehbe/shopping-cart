import './App.css';
import { Provider } from 'react-redux';
import ProductFrom from './Products/ProductForm';
import ProductsList from './Products/ProductsList';
import store from './store';
import Cart from './Cart/Cart';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductsList />
        <ProductFrom />
        <Cart/>
      </div>
    </Provider>
  );
}

export default App;
