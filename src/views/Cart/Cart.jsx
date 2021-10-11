import React, { useContext } from "react";

//Context
import CartContext from "../../context/CartContext";

//Bootstrap
import { Button } from "react-bootstrap";

//Layout
import TableCart from "../../layouts/TableCart";

//Styles
import "./Cart.styles.css";

const Cart = () => {
    const { state, dispatch } = useContext(CartContext);
    const { cart } = state;

    const handleAddStock = (id) => {
        let prodPrice = 0;
        const newCart = cart.map((product) => {
            if (product.id === id) {
                prodPrice = product.price;
                return {
                    ...product,
                    stock: product.stock + 1,
                };
            } else {
                return product;
            }
        });
        dispatch({
            type: "ADD_STOCK",
            payload: newCart,
            addPrice: prodPrice,
        });
    };

    const handleSubStock = (id) => {
        let prodPrice = 0;
        const newCart = cart.map((product) => {
            if (product.id === id) {
                prodPrice = product.price;
                return {
                    ...product,
                    stock: product.stock - 1,
                };
            } else {
                return product;
            }
        });
        dispatch({
            type: "SUB_STOCK",
            payload: newCart,
            subPrice: prodPrice,
        });
    };

    return (
        <>
            <TableCart>
                {cart.length > 0 &&
                    cart.map((product, index) => (
                        <tr key={index} style={{ verticalAlign: "middle" }}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td style={{ textAlign: "center" }}>
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    style={{ maxWidth: "40%" }}
                                />
                            </td>
                            <td>$ {product.price}</td>
                            <td>
                                <div className='stock-container'>
                                    <Button
                                        disabled={
                                            product.stock < 2 ? true : false
                                        }
                                        variant='danger'
                                        size='sm'
                                        onClick={() =>
                                            handleSubStock(product.id)
                                        }>
                                        -
                                    </Button>
                                    {product.stock}
                                    <Button
                                        variant='success'
                                        size='sm'
                                        onClick={() =>
                                            handleAddStock(product.id)
                                        }>
                                        +
                                    </Button>
                                </div>
                            </td>
                            <td>
                                <Button
                                    variant='danger'
                                    onClick={() =>
                                        dispatch({
                                            type: "REMOVE",
                                            payload: product,
                                        })
                                    }>
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
            </TableCart>
        </>
    );
};

export default Cart;
