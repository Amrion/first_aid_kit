export interface Notifications {
    id: number,
    id_to_user: number,
    is_accepted: boolean,
    is_tablets: boolean,
    name_medicine: string,
    name_to: string,
    time: string,
}

export interface NotifyState {
    notList: Array<Notifications>
    time: any,
}

export enum NotifyActionEnum {
    SET_NOTIFYLIST = 'SET_NOTIFYLIST',
    SET_NOTIFYNULLLIST = 'SET_NOTIFYNULLLIST',
    SET_TIME = 'SET_TIME',
}

export interface SetNotifyListAction {
    type: NotifyActionEnum.SET_NOTIFYLIST,
    payload: Array<Notifications>
}

export interface SetNotifyListNullAction {
    type: NotifyActionEnum.SET_NOTIFYNULLLIST,
    payload: [],
}

export interface SetTimeAction {
    type: NotifyActionEnum.SET_TIME,
    payload: any,
}

export type NotifyAction = SetNotifyListAction | SetNotifyListNullAction | SetTimeAction