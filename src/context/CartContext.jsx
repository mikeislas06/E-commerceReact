import React, { createContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = {
    user: {},
    totalPrice: 0,
    cart: JSON.parse(localStorage.getItem("cart"))
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                totalPrice: state.totalPrice + action.payload.price,
                cart: [...state.cart, action.payload],
            };
        case "REMOVE":
            console.log(action.payload);
            return {
                ...state,
                totalPrice:
                    state.totalPrice -
                    action.payload.price * action.payload.stock,
                cart: state.cart.filter(
                    (product) => product.id !== action.payload.id
                ),
            };
        case "ADD_STOCK":
            return {
                ...state,
                totalPrice: state.totalPrice + action.addPrice,
                cart: action.payload,
            };
        case "SUB_STOCK":
            return {
                ...state,
                totalPrice: state.totalPrice - action.subPrice,
                cart: action.payload,
            };
        default:
            return state;
    }
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const data = {
        state,
        dispatch,
    };

    useEffect(() => {
        //actualizar local storage
        if (!JSON.parse(localStorage.getItem("cart"))) {
            localStorage.setItem("cart", JSON.stringify([]));
        } else {
            //Actualizamos localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
    }, [state]);

    return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export { CartProvider };
export default CartContext;
