import React from 'react';

import { Spinner } from 'react-bootstrap';

//Styles
import "./LoaderPage.styles.css";

const LoaderPage = () => {
    return (
        <div className="loader-page">
            <Spinner animation="grow" variant="success" />
        </div>
    );
};

export default LoaderPage;