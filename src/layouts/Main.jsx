import React, { useContext } from "react";

//Context
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";

//Components
import Header from "../components/custom/Header/Header";

const Main = ({ children }) => {
    const { state: cartState } = useContext(CartContext);
    const { state: userState, dispatch } = useContext(UserContext);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user_info");
        localStorage.removeItem("cart");
    };

    return (
        <>
            <Header
                cart={cartState.cart}
                total={cartState.totalPrice}
                session={userState}
                handleLogout={handleLogout}
            />
            {children}
        </>
    );
};

export default Main;
