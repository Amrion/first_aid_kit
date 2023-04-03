import React, {FC} from 'react';
import {AllRoutes} from "./router";
import {Route, Routes} from "react-router-dom";

const AppRouter: FC = () => {
    return (
        <Routes>
            {
                AllRoutes.map((route, index) =>
                    <Route key={index} path={route.path} element={route.component}/>
                )
            }
        </Routes>
    );
};

export default AppRouter;