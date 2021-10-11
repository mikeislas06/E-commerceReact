import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";

//Context
import UserContext from "../../context/UserContext";

//Styles
import "./LogInForm.styles.css";
import { Button } from "react-bootstrap";

const auth = {
    name: "Test",
    email: "test@test.com",
    password: "Test1234",
    jwt: "abcdef1234567890",
};

const LogInForm = () => {
    const { dispatch } = useContext(UserContext);

    const history = useHistory();

    const [initialValues, setInitialValues] = useState({
        email: "",
        password: "",
    });

    const handleFormValidate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }

        return errors;
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        if (values.email === auth.email && values.password === auth.password) {
            localStorage.setItem("user_info", JSON.stringify(auth));
            dispatch({ type: "SUCCESS", payload: auth });
            history.push("/");
        } else {
            alert("Wrong credentials!");
        }
        // try {
        //     const response = await axios.post(
        //         "http://localhost:1337/auth/local",
        //         {
        //             identifier: values.email,
        //             password: values.password,
        //         }
        //     );

        //     if (response.data) {
        //         localStorage.setItem(
        //             "user_info",
        //             JSON.stringify(response.data)
        //         );
        //         dispatch({ type: "SUCCESS", payload: response.data });
        //         history.push("/");
        //     }
        // } catch (err) {
        //     alert("Wrong credentials!");
        // }
    };

    return (
        <div className='login-container'>
            <Formik
                initialValues={initialValues}
                validate={handleFormValidate}
                onSubmit={handleSubmit}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className='login-form'>
                        <div className='sigin-title'>
                            <FontAwesomeIcon
                                icon={faFingerprint}
                                size={"6x"}
                                color={"rgba(31, 78, 78, 0.9)"}
                                style={{ marginBottom: 30 }}
                            />
                            <h4>Sign in</h4>
                        </div>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email*'
                        />

                        {errors.email && touched.email && errors.email}

                        <input
                            type='password'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder='Password*'
                        />

                        {errors.password && touched.password && errors.password}

                        <Button type='submit' disabled={isSubmitting}>
                            Sign in
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default LogInForm;
