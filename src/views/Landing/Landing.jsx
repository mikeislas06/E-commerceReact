import React, { useContext, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import MyCarousel from "../../components/custom/Carousel/MyCarousel";

//Styles
import "./Landing.styles.css";

//Context
import ProductsContext from "../../context/ProductsContext";

const Landing = () => {
    const { state } = useContext(ProductsContext);
    const { products } = state;

    const arrows = useRef(null);

    const executeScroll = () => arrows.current.scrollIntoView();

    return (
        <>
            <div className='message-wrapper'>
                <div className='message'>
                    <h2>An exciting place for the whole family to shop.</h2>
                </div>
                <svg id='more-arrows' onClick={executeScroll}>
                    <polygon
                        className='arrow-top'
                        points='37.6,27.9 1.8,1.3 3.3,0 37.6,25.3 71.9,0 73.7,1.3 '
                    />
                    <polygon
                        className='arrow-middle'
                        points='37.6,45.8 0.8,18.7 4.4,16.4 37.6,41.2 71.2,16.4 74.5,18.7 '
                    />
                    <polygon
                        className='arrow-bottom'
                        points='37.6,64 0,36.1 5.1,32.8 37.6,56.8 70.4,32.8 75.5,36.1 '
                    />
                </svg>
            </div>

            <div className='carousel-wrapper' ref={arrows}>
                <MyCarousel products={products} />
            </div>

            <div className='button-wrapper'>
                <Button as={Link} to='/shop' className='more-btn'>
                    Explore more options!
                </Button>
            </div>
        </>
    );
};

export default Landing;
