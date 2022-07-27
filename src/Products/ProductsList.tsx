import React from 'react'
import { useSelector } from 'react-redux'
import { addToCart } from '../Cart/cart.slice'
import { useAppDispatch } from '../store.hooks'
import { getProductsSelector, Product, removeProduct } from './products.slice'


const ProductsList: React.FC = () => {
    const products = useSelector(getProductsSelector)

    const dispatch = useAppDispatch()

    const remove = (id: string) => dispatch(removeProduct(id))

    const add = (product: Product) => dispatch(addToCart(product))

    return (
        <div>
            <label>Games List</label>
            {products.map(product =>
                <div key={product.id}>
                    <span>{`${product.title} : ${product.price}`}</span>
                    <button onClick={() => add(product)}>Add To Cart</button>
                    <button onClick={() => remove(product.id)}>Remove from the store</button>
                </div>
            )}
        </div>
    )
}

export default ProductsList;