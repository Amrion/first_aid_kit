import {NotifyAction, NotifyActionEnum, NotifyState} from "./types";

const defaultState: NotifyState = {
    notList: [],
    time: '',
}

export const NotifyReducer = (state = defaultState, action: NotifyAction): NotifyState => {
    switch (action.type) {
        case NotifyActionEnum.SET_NOTIFYLIST: {
            return {...state, notList: action.payload}
        }
        case NotifyActionEnum.SET_NOTIFYNULLLIST: {
            return {...state, notList: action.payload}
        }
        case NotifyActionEnum.SET_TIME: {
            return {...state, time: action.payload}
        }
        default:
            return state;
    }
}

export const notifyActionNotList = (payload) => {
    return {
        type: NotifyActionEnum.SET_NOTIFYLIST,
        payload
    }
}

export const notifyActionNullNotList = (payload) => {
    return {
        type: NotifyActionEnum.SET_NOTIFYNULLLIST,
        payload
    }
}

export const notifyActionTime = (payload) => {
    return {
        type: NotifyActionEnum.SET_TIME,
        payload
    }
}