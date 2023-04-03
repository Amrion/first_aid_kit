import {AuthAction, AuthActionEnum, AuthState} from "./types";

const defaultState: AuthState = {
    isAuth: false,
    isLoading: false,
    isError: '',
}

export const AuthReducer = (state = defaultState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH: {
            return {...state, isAuth: action.payload}
        }
        case AuthActionEnum.SET_LOADING: {
            return {...state, isLoading: action.payload}
        }
        case AuthActionEnum.SET_ERROR: {
            return {...state, isError: action.payload}
        }
        default:
            return state;
    }
}

export const authActionAuth = (payload) => {
    return {
        type: AuthActionEnum.SET_AUTH,
        payload
    }
}

export const authActionLoading = (payload) => {
    return {
        type: AuthActionEnum.SET_LOADING,
        payload
    }
}

export const authActionError = (payload) => {
    return {
        type: AuthActionEnum.SET_ERROR,
        payload
    }
}
