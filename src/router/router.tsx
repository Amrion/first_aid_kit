import React from "react";
import {Navigate} from "react-router-dom";
import RegPage from "../pages/RegPage/RegPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import InfoPage from "../pages/InfoPage/InfoPage";
import AddMedPage from "../pages/AddMedPage/AddMedPage";
import ListPage from "../pages/ListPage/ListPage";
import OneMedPage from "../pages/OneMedPage/OneMedPage";
import NotifyPage from "../pages/NotifyPage/NotifyPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

export interface IRoutes {
    path: string;
    component: JSX.Element;
}

export enum RoutesNames {
    LOGIN = '/login',
    REG = '/reg',
    MAIN = '/',
    INFO = '/info',
    ADDMED = '/addmed',
    LIST = '/list',
    NOTIFY = '/notify',
    ONEMED = '/list/:id',
    PROFILE = '/profile',
    ERROR = '*',
}

export const publicRoutes: IRoutes[] = [
    {path: RoutesNames.INFO, component: <InfoPage/>},
    {path: RoutesNames.LOGIN, component: <LoginPage/>},
    {path: RoutesNames.REG, component: <RegPage/>},
    {path: RoutesNames.MAIN, component: <MainPage/>},
    {path: RoutesNames.ADDMED, component: <AddMedPage/>},
    {path: RoutesNames.LIST, component: <ListPage/>},
    {path: RoutesNames.ONEMED, component: <OneMedPage/>},
    {path: RoutesNames.NOTIFY, component: <NotifyPage/>},
    {path: RoutesNames.PROFILE, component: <ProfilePage/>},
    {path: RoutesNames.ERROR, component: <ErrorPage/>},

    {path: RoutesNames.ERROR, component: <Navigate to={RoutesNames.ERROR} replace />}
];

export const privateRoutes: IRoutes[] = [
    {path: RoutesNames.MAIN, component: <MainPage/>},
    {path: RoutesNames.ADDMED, component: <AddMedPage/>},
    {path: RoutesNames.LIST, component: <ListPage/>},
    {path: RoutesNames.ONEMED, component: <OneMedPage/>},
    {path: RoutesNames.NOTIFY, component: <NotifyPage/>},
    {path: RoutesNames.PROFILE, component: <ProfilePage/>},
    {path: RoutesNames.ERROR, component: <ErrorPage/>},

    {path: RoutesNames.INFO, component: <Navigate to={RoutesNames.MAIN} replace />},
    {path: RoutesNames.REG, component:  <Navigate to={RoutesNames.MAIN} replace />},
    {path: RoutesNames.LOGIN, component:  <Navigate to={RoutesNames.MAIN} replace />},

    {path: RoutesNames.ERROR, component: <Navigate to={RoutesNames.ERROR} replace />}
];