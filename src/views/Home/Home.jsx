import React, { useContext } from "react";

//Context
import ProductsContext from "../../context/ProductsContext";

//Components
import Product from "../../components/Home/Product/Product";

//Styles
import "./Home.styles.css";

const Home = () => {
    //Context del listado de productos
    const { state: listState } = useContext(ProductsContext);

    return (
        <div className='product-list'>
            {listState?.products?.length > 0 &&
                listState.products.map((product) => (
                    <Product
                        name={product.name}
                        price={product.price}
                        img={product.img}
                        id={product.id}
                        description={product.description}
                        status='add'
                        productStock={product.stock}
                        stock={1}
                        key={product.id}
                    />
                ))}
        </div>
    );
};

export default Home;
