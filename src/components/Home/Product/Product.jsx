import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

//Context
import CartContext from "../../../context/CartContext";
import UserContext from "../../../context/UserContext";

//Bootstrap
import { Card, Button, Modal } from "react-bootstrap";

//Styles
import "./Product.styles.css";
import { Link } from "react-router-dom";

const MyVerticallyCenteredModal = (props) => {
    return (
        <Modal
            {...props}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
            <Modal.Body>
                <h4>Item already in cart.</h4>
                <p>
                    The item you selected is already in your cart. Please select
                    another one or go to your shopping cart to verify the
                    information.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button as={Link} to='/shop-cart'>
                    Go to Cart
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const Product = ({ name, description, price, img, id, status, stock }) => {
    const { state: cartState, dispatch: cartDispatch } =
        useContext(CartContext);
    const { state: userState, dispatch: userDispatch } =
        useContext(UserContext);

    const history = useHistory();

    const [payload, setPayload] = useState({});

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setPayload({
            name,
            description,
            price,
            id,
            img,
            stock,
            status,
        });
    }, [name, description, price, id, img, stock, status]);

    const handleDispatch = (payload) => {
        if (userState.user.jwt) {
            const cartFound = cartState.cart.find(
                (product) => product.id === payload.id
            );
            if (cartFound) {
                setModalShow(true);
            } else {
                localStorage.setItem("cart", JSON.stringify(payload));
                cartDispatch({ type: "ADD", payload });
            }
        } else {
            history.push("/login");
        }
    };

    const handleDispatchList = (payload) => {
        if (userState.user.jwt) {
            if (status !== "wish-list") {
                const wishFound = userState.wishlist.find(
                    (product) => product.id === payload.id
                );
                if (wishFound) {
                    userDispatch({ type: "REMOVE_FROM_WISHLIST", payload });
                } else {
                    userDispatch({ type: "ADD_TO_WISHLIST", payload });
                }
            } else {
                userDispatch({ type: "REMOVE_FROM_WISHLIST", payload });
            }
        } else {
            history.push("/login");
        }
    };

    return (
        <>
            <Card
                style={{
                    width: "18rem",
                    marginBottom: "1.5rem",
                    marginRight: 30,
                }}>
                <Card.Img variant='top' src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>$ {price}</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            width: "50%",
                        }}>
                        <div className='cart-btn-wrapper'>
                            <Button
                                className='cart-btn'
                                onClick={() => {
                                    handleDispatch({ ...payload });
                                }}>
                                🛒
                            </Button>

                            {cartState.cart.find(
                                (product) => product.id === payload.id
                            ) ? (
                                <div className='cart-number-icon'>1</div>
                            ) : (
                                <></>
                            )}
                        </div>

                        {userState.wishlist.find(
                            (product) => product.id === payload.id
                        ) ? (
                            <Button
                                variant='warning'
                                onClick={() =>
                                    handleDispatchList({ ...payload })
                                }>
                                {"❤"}
                            </Button>
                        ) : (
                            <Button
                                variant='warning'
                                onClick={() =>
                                    handleDispatchList({ ...payload })
                                }>
                                {"🤍"}
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default Product;
