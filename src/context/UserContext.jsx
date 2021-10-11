import React, { createContext, useReducer } from "react";

const UserContext = createContext();

const initialState = {
    user: JSON.parse(localStorage.getItem("user_info"))
        ? JSON.parse(localStorage.getItem("user_info"))
        : {},
    wishlist: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
            return {
                ...state,
                user: action.payload,
            };
        case "ADD_TO_WISHLIST":
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload],
            };
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter(
                    (user) => user.id !== action.payload.id
                ),
            };
        case "LOGOUT":
            return {
                ...state,
                user: {},
            };
        default:
            return state;
    }
};

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const data = {
        state,
        dispatch,
    };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;
