import React, { useContext } from "react";
import { Link } from "react-router-dom";

//Context
import CartContext from "../context/CartContext";

//Bootstrap
import { Table, Button } from "react-bootstrap";

const TableCart = ({ children }) => {
    const { state } = useContext(CartContext);
    const { cart, totalPrice } = state;

    return (
        <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
            {cart.length > 0 ? (
                <>
                    <Table striped bordered hover responsive variant='dark'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Price $</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {children}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total: ${totalPrice}</td>
                                <td>
                                    <Button variant='primary'>Pay</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </>
            ) : (
                <div
                    style={{
                        height: "50vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <h2 style={{ marginBottom: 30 }}>
                        Your shopping cart 🛒 is empty now.
                    </h2>
                    <h4>
                        <Button variant='success'>
                            <Link
                                to='/shop'
                                style={{
                                    textDecoration: "none",
                                    color: "#fff",
                                }}>
                                Get some items!
                            </Link>
                        </Button>
                    </h4>
                </div>
            )}
        </div>
    );
};

export default TableCart;
