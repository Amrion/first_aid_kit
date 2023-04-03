import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {AuthReducer} from "./reducers/authReducer/authReducer";
import {UserReducer} from "./reducers/userReducer/userReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const apiUrl = 'http://myaidkit.ru:1323/api/v1'