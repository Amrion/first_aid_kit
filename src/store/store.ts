import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {AuthReducer} from "./reducers/authReducer/authReducer";
import {UserReducer} from "./reducers/userReducer/userReducer";
import {MedReducer} from "./reducers/medReducer/medReducer";
import {NotifyReducer} from "./reducers/notifyReducer/notifyReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    med: MedReducer,
    notify: NotifyReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const apiUrl = 'http://95.163.250.125:1323/api/v1';
export const localUrl = 'http://localhost:1323/api/v1';