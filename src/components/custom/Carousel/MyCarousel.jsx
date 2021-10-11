import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

//Styles
import "./MyCarousel.styles.css";

const MyCarousel = ({ products }) => (
    <Carousel plugins={["arrows"]}>
        {products.map((product) => (
            <img src={product.img} alt={product.name} key={product.id} />
        ))}
    </Carousel>
);

export default MyCarousel;
