import React, { Suspense, useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Menus from "./components/Menus";
import { LoggedInRoutes, LoggedOutRoutes } from "./Routes";
import { Context as AuthContext } from "./context/AuthContext";

const App = () => {
    const {
        state: { user, isLoadingInAuth },
        getUser,
    } = useContext(AuthContext);
    useEffect(
        () =>
            (async () => {
                await getUser();
            })(),
        []
    );
    return (
        <>
            <Router>
                <Menus />
                {!isLoadingInAuth && (
                    <Suspense
                        fallback={<div className="center">Loading...</div>}
                    >
                        {user ? <LoggedInRoutes /> : <LoggedOutRoutes />}
                    </Suspense>
                )}
            </Router>
        </>
    );
};

export default App;
