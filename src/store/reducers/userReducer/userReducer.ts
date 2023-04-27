import {UserActionEnum, UserActions, UserState} from "./types";

const defaultState: UserState = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    age: '',
    photo: '',
    main: false,
    adult: true,
    profileLoading: false,
    listFamily: [],
}

export const UserReducer = (state = defaultState, action: UserActions): UserState => {
    switch (action.type) {
        case UserActionEnum.SET_ID: {
            return {...state, id: action.payload}
        }
        case UserActionEnum.SET_NAME: {
            return {...state, name: action.payload}
        }
        case UserActionEnum.SET_SURNAME: {
            return {...state, surname: action.payload}
        }
        case UserActionEnum.SET_EMAIL: {
            return {...state, email: action.payload}
        }
        case UserActionEnum.SET_AGE: {
            return {...state, age: action.payload}
        }
        case UserActionEnum.SET_PHOTO: {
            return {...state, photo: action.payload}
        }
        case UserActionEnum.SET_PROFLOADING: {
            return {...state, profileLoading: action.payload}
        }
        case UserActionEnum.SET_MAIN: {
            return {...state, main: action.payload}
        }
        case UserActionEnum.SET_ADULT: {
            return {...state, adult: action.payload}
        }
        case UserActionEnum.SET_LIST: {
            return {...state, listFamily: [...state.listFamily, action.payload]}
        }
        case UserActionEnum.SET_NULL_LIST: {
            return {...state, listFamily: action.payload}
        }
        default:
            return state;
    }
}

export const userActionId = (payload) => {
    return {
        type: UserActionEnum.SET_ID,
        payload
    }
}

export const userActionMain = (payload) => {
    return {
        type: UserActionEnum.SET_MAIN,
        payload
    }
}

export const userActionAdult = (payload) => {
    return {
        type: UserActionEnum.SET_ADULT,
        payload
    }
}

export const userActionList = (payload) => {
    return {
        type: UserActionEnum.SET_LIST,
        payload
    }
}

export const userActionNullList = (payload) => {
    return {
        type: UserActionEnum.SET_NULL_LIST,
        payload
    }
}

export const userActionProfLoadinglList = (payload) => {
    return {
        type: UserActionEnum.SET_PROFLOADING,
        payload
    }
}

export const userActionName = (payload) => {
    return {
        type: UserActionEnum.SET_NAME,
        payload
    }
}

export const userActionSurname = (payload) => {
    return {
        type: UserActionEnum.SET_SURNAME,
        payload
    }
}

export const userActionEmail = (payload) => {
    return {
        type: UserActionEnum.SET_EMAIL,
        payload
    }
}

export const userActionAge = (payload) => {
    return {
        type: UserActionEnum.SET_AGE,
        payload
    }
}

export const userActionPhoto = (payload) => {
    return {
        type: UserActionEnum.SET_PHOTO,
        payload
    }
}
