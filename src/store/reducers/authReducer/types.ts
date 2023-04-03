export interface AuthState {
    isAuth: boolean,
    isLoading: boolean,
    isError: string
}

export enum AuthActionEnum {
    SET_AUTH = 'SET_AUTH',
    SET_LOADING = 'SET_LOADING',
    SET_ERROR = 'SET_ERROR',
}

export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH,
    payload: boolean,
}

export interface SetLoadingAction {
    type: AuthActionEnum.SET_LOADING,
    payload: boolean,
}

export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR,
    payload: string,
}

export type AuthAction = SetAuthAction | SetErrorAction | SetLoadingAction;