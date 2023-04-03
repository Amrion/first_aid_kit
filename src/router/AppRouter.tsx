import React, {FC} from 'react';
import {privateRoutes, publicRoutes} from "./router";
import {Route, Routes} from "react-router-dom";
import {useAppSelector} from "../hooks/useAppSelector";

const AppRouter: FC = () => {
    const { isAuth } = useAppSelector(state => state.auth);

    return (
        isAuth
            ?
            <Routes>
                {
                    privateRoutes.map((route, index) =>
                        <Route key={index} path={route.path} element={route.component}/>
                    )
                }
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map((route, index) =>
                        <Route key={index} path={route.path} element={route.component}/>
                    )
                }
            </Routes>
    );
};

export default AppRouter;