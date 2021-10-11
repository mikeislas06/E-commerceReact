import React, { createContext, useReducer, useEffect } from "react";
// import axios from "axios";

import { productsList } from "../helpers/productsList";

// import UserContext from "./UserContext";
const ProductsContext = createContext();

const initialState = {
    products: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        default:
            return state;
    }
};

const ProductsProvider = ({ children }) => {
    // const { state: userState } = useContext(UserContext);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            const response = productsList;
            // console.log(response);
            const payload = response;

            dispatch({ type: "ADD_PRODUCTS", payload });
            // try {
            //     const API = "http://localhost:1337/products";

            //     const response = await axios.get(API);
            //     const payload = response.data;

            //     dispatch({ type: "ADD_PRODUCTS", payload });
            // } catch (error) {
            //     console.error(error);
            // }
        };

        fetchData();
    }, []);

    const data = {
        state,
        dispatch,
    };

    return (
        <ProductsContext.Provider value={data}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsProvider };
export default ProductsContext;
