import {MedAction, MedActionEnum, MedState} from "./types";

const defaultState: MedState = {
    medList: [],
    codeError: '',
    loading: false,
    oneMedApi: {},
    searchList: []
}

export const MedReducer = (state = defaultState, action: MedAction): MedState => {
    switch (action.type) {
        case MedActionEnum.SET_MEDLIST: {
            return {...state, medList: [...state.medList, action.payload]}
        }
        case MedActionEnum.SET_NULL_MEDLIST: {
            return {...state, medList: action.payload}
        }
        case MedActionEnum.SET_CODE_ERROR: {
            return {...state, codeError: action.payload}
        }
        case MedActionEnum.SET_LOADING_MED: {
            return {...state, loading: action.payload}
        }
        case MedActionEnum.SET_ONEMEDAPI: {
            return {...state, oneMedApi: action.payload}
        }
        case MedActionEnum.SET_SEARCH_LIST: {
            return {...state, searchList: action.payload}
        }
        case MedActionEnum.SET_NULL_SEARCH_LIST: {
            return {...state, searchList: []}
        }
        default:
            return state;
    }
}

export const medActionMedList = (payload) => {
    return {
        type: MedActionEnum.SET_MEDLIST,
        payload
    }
}

export const medActionNullMedList = (payload) => {
    return {
        type: MedActionEnum.SET_NULL_MEDLIST,
        payload
    }
}

export const medActionCodeError = (payload) => {
    return {
        type: MedActionEnum.SET_CODE_ERROR,
        payload
    }
}

export const medActionLoading = (payload) => {
    return {
        type: MedActionEnum.SET_LOADING_MED,
        payload
    }
}

export const medActionOneMedApi = (payload) => {
    return {
        type: MedActionEnum.SET_ONEMEDAPI,
        payload
    }
}

export const medActionSearchList = (payload) => {
    return {
        type: MedActionEnum.SET_SEARCH_LIST,
        payload
    }
}

export const medActionNullSearchList = (payload) => {
    return {
        type: MedActionEnum.SET_NULL_SEARCH_LIST,
        payload
    }
}