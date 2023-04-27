export interface ListFamily {
    id: number,
    name: string,
    avatar: string,
    adult: boolean,
    user: boolean,
}

export interface UserState {
    id: number,
    name: string,
    surname: string,
    email: string,
    age: string,
    photo: string,
    main: boolean,
    adult: boolean,
    profileLoading: boolean,
    listFamily: Array<ListFamily>,
}

export enum UserActionEnum {
    SET_ID = 'SET_ID',
    SET_NAME = 'SET_NAME',
    SET_SURNAME = 'SET_SURNAME',
    SET_EMAIL = 'SET_EMAIL',
    SET_AGE = 'SET_AGE',
    SET_PHOTO = 'SET_PHOTO',
    SET_MAIN = 'SET_MAIN',
    SET_ADULT = 'SET_ADULT',
    SET_LIST = 'SET_LIST',
    SET_PROFLOADING = 'SET_PROFLOADING',
    SET_NULL_LIST = 'SET_NULL_LIST',
}

export interface SetIDAction {
    type: UserActionEnum.SET_ID,
    payload: number,
}

export interface SetProfLoadingAction {
    type: UserActionEnum.SET_PROFLOADING,
    payload: boolean,
}

export interface SetMainAction {
    type: UserActionEnum.SET_MAIN,
    payload: boolean,
}

export interface SetAdultAction {
    type: UserActionEnum.SET_ADULT,
    payload: boolean,
}

export interface SetListAction {
    type: UserActionEnum.SET_LIST,
    payload: ListFamily,
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

export interface SetPhotoAction {
    type: UserActionEnum.SET_PHOTO,
    payload: string,
}

export interface SetNullListAction {
    type: UserActionEnum.SET_NULL_LIST,
    payload: [],
}


export type UserActions = SetProfLoadingAction | SetNullListAction | SetEmailAction | SetAgeAction | SetNameAction | SetPhotoAction | SetSurnameAction | SetIDAction | SetAdultAction | SetListAction | SetMainAction;