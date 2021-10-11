import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

//Context
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
    <UserProvider>
        <ProductsProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </ProductsProvider>
    </UserProvider>,
    document.getElementById("root")
);
