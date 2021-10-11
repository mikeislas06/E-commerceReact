import React, { useContext } from "react";
import { Link } from "react-router-dom";

//Context
import UserContext from "../../context/UserContext";

//Component
import Product from "../../components/Home/Product/Product";

//Bootstrap
import { Button } from "react-bootstrap";

//Styles
import "./MyAccount.styles.css";

const MyAccount = () => {
    const { state } = useContext(UserContext);
    const { user, wishlist } = state;

    return (
        <div>
            <h1
                style={{
                    textAlign: "center",
                    marginTop: 50,
                    marginBottom: 50,
                }}>
                Welcome {user.name}
            </h1>

            {wishlist.length > 0 ? (
                <>
                    <h2 style={{ textAlign: "center", marginBottom: 30 }}>
                        My Wishlist
                    </h2>
                    <div className='wishlist-wrapper'>
                        {wishlist.map((product) => (
                            <Product
                                name={product.name}
                                price={product.price}
                                img={product.img}
                                id={product.id}
                                description={product.description}
                                status='wish-list'
                                key={product.id}
                            />
                        ))}
                    </div>
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
                        Add some items to your wishlist.
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

export default MyAccount;
