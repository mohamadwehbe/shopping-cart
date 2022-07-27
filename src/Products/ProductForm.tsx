import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store.hooks';
import { addProductAsync, getErrorMessage, Product } from './products.slice';

const ProductFrom: React.FC = ({ }) => {

    const dispatch = useAppDispatch()
    const errorMessage = useSelector(getErrorMessage)

    const [product, setProduct] = useState<Product>({
        id: '',
        title: '',
        price: 0
    })

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => {
        (prev as any)[name] = value;
        const newValue = { ...prev }
        return newValue
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addProductAsync(product))
    }

    const { title, price, id } = product;

    return (
        <>
            <h2>Add Game To The Store</h2>
            {errorMessage && <span>error : {errorMessage}</span>}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Game Title' name='title' value={title} onChange={handleChange} />
                <input type='number' placeholder='Price' name='price' value={price} onChange={handleChange} />
                <input type='text' placeholder='Id' name='id' value={id} onChange={handleChange} />
                <button type='submit'>Add</button>
            </form>
        </>
    );
};

export default ProductFrom;
