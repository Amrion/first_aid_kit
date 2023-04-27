import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {AuthReducer} from "./reducers/authReducer/authReducer";
import {UserReducer} from "./reducers/userReducer/userReducer";
import {MedReducer} from "./reducers/medReducer/medReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    med: MedReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const apiUrl = 'http://myaidkit.ru:1323/api/v1';
export const localUrl = 'http://localhost:1323/api/v1';