import React, { lazy, Suspense, useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

//Context
import UserContext from "./context/UserContext";

import LoaderPage from "./components/custom/LoaderPage/LoaderPage";
import Main from "./layouts/Main";
import Landing from "./views/Landing/Landing";

//Views
const Home = lazy(() => import("./views/Home/Home"));
const Cart = lazy(() => import("./views/Cart/Cart"));
const LogInForm = lazy(() => import("./views/LogInForm/LogInForm"));
const MyAccount = lazy(() => import("./views/MyAccount/MyAccount"));
const NotFound = lazy(() => import("./views/NotFound/NotFound"));

const App = () => {
    const { state } = useContext(UserContext);

    return (
        <Router>
            <Main>
                <Switch>
                    <Route path='/' exact>
                        <Suspense fallback={<LoaderPage />}>
                            <Landing />
                        </Suspense>
                    </Route>
                    <Route path='/shop' exact>
                        <Suspense fallback={<LoaderPage />}>
                            <Home />
                        </Suspense>
                    </Route>
                    <Route
                        path='/shop-cart'
                        exact
                        render={() =>
                            state.user.jwt ? (
                                <Suspense fallback={<LoaderPage />}>
                                    <Cart />
                                </Suspense>
                            ) : (
                                <Redirect to='/login' />
                            )
                        }></Route>
                    <Route path='/account' exact>
                        <Suspense fallback={<LoaderPage />}>
                            <MyAccount />
                        </Suspense>
                    </Route>
                    <Route path='/login' exact>
                        <Suspense fallback={<LoaderPage />}>
                            <LogInForm />
                        </Suspense>
                    </Route>
                    <Route path='*'>
                        <Suspense fallback={<LoaderPage />}>
                            <NotFound />
                        </Suspense>
                    </Route>
                </Switch>
            </Main>
        </Router>
    );
};

export default App;
