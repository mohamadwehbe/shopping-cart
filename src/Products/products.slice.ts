import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import validateProduct from "../fake.api";
import { RootState } from "../store";

export interface Product {
    title: string;
    price: number;
    id: string;
}

export enum ValidationState {
    Fullfilled,
    Pending,
    Rejected
}
interface ProductSliceState {
    products: Product[],
    validationState?: ValidationState,
    errorMessage?: string,
}

export const addProductAsync = createAsyncThunk('products/addNewProduct', async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct);
    return product;
})

const initialProducts: Product[] = [
    { title: 'Escape from Tarkov', price: 60, id: 'eft' },
    { title: 'Hunt: Showdown', price: 70, id: 'hunt' },
    { title: 'Hell Let Loose', price: 55, id: 'hll' },
]

const initialState: ProductSliceState = {
    products: initialProducts,
    validationState: undefined,
    errorMessage: undefined
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            //return [action.payload, ...state]
            state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => ({
            ...state,
            products: state.products.filter(product => product.id !== action.payload)
        })
    },
    extraReducers: builder => {
        builder.addCase(addProductAsync.fulfilled, (state, action) => ({
            ...state,
            validationState: ValidationState.Fullfilled,
            errorMessage: undefined,
            products: [...state.products,action.payload]
        }))
        builder.addCase(addProductAsync.rejected, (state, action) => ({
            ...state,
            validationState: ValidationState.Rejected,
            errorMessage: undefined,
        }))
        builder.addCase(addProductAsync.pending, (state, action) => ({
            ...state,
            validationState: ValidationState.Pending,
            errorMessage: undefined,
        }))
    }
})

export const { addProduct, removeProduct } = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products.products;

export const getErrorMessage= (state: RootState) => state.products.errorMessage;

export default productsSlice.reducer;