export interface UserState {
    name: string,
    surname: string,
    email: string,
    age: string,
    password: string,
}

export enum UserActionEnum {
    SET_NAME = 'SET_NAME',
    SET_SURNAME = 'SET_SURNAME',
    SET_EMAIL = 'SET_EMAIL',
    SET_AGE = 'SET_AGE',
    SET_PASSWORD = 'SET_PASSWORD',
}

export interface SetNameAction {
    type: UserActionEnum.SET_NAME,
    payload: string,
}

export interface SetSurnameAction {
    type: UserActionEnum.SET_SURNAME,
    payload: string,
}

export interface SetEmailAction {
    type: UserActionEnum.SET_EMAIL,
    payload: string,
}


export interface SetAgeAction {
    type: UserActionEnum.SET_AGE,
    payload: string,
}

export interface SetPasswordAction {
    type: UserActionEnum.SET_PASSWORD,
    payload: string,
}


export type UserActions = SetEmailAction | SetAgeAction | SetNameAction | SetPasswordAction | SetSurnameAction;