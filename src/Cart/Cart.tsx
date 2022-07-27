import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store.hooks';
import { getCartProducts, getTotalPrice, removeFromCart } from './cart.slice';

const Cart: React.FC = () => {

    const cartProducts = useAppSelector(getCartProducts);
    const totalPrice = useAppSelector(getTotalPrice);
    const dispatch = useDispatch()

    const handleremove = (productId: string) => dispatch(removeFromCart(productId))

    return (
        <>
            <h2>Cart</h2>
            <h5>{totalPrice}</h5>
            {cartProducts.map(product =>
                <div key={product.id}>
                    <span>{product.title}</span>
                    <span>{product.amount}</span>
                    <button onClick={() => handleremove(product.id)}>Remove From Cart</button>
                </div>
            )}
        </>
    );
};

export default Cart;
