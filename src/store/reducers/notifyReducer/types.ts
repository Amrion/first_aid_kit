export interface OneMed {
    id: number,
    image: string,
    name: string,
    is_tablets: boolean,
    count: number,
}

export interface MedState {
    medList: Array<OneMed>,
    codeError: string,
    loading: boolean,
    oneMedApi: any,
    searchList: Array<any>,
}

export enum MedActionEnum {
    SET_MEDLIST = 'SET_MEDLIST',
    SET_NULL_MEDLIST = 'SET_NULL_MEDLIST',
    SET_CODE_ERROR = 'SET_CODE_ERROR',
    SET_LOADING_MED = 'SET_LOADING_MED',
    SET_ONEMEDAPI = 'SET_ONEMEDAPI',
    SET_SEARCH_LIST = 'SET_SEARCH_LIST',
    SET_NULL_SEARCH_LIST = 'SET_NULL_SEARCH_LIST',
}

export interface SetMedListAction {
    type: MedActionEnum.SET_MEDLIST,
    payload: OneMed,
}

export interface SetNullMedListAction {
    type: MedActionEnum.SET_NULL_MEDLIST,
    payload: [],
}

export interface SetCodeErrorAction {
    type: MedActionEnum.SET_CODE_ERROR,
    payload: string,
}

export interface SetLoadingAction {
    type: MedActionEnum.SET_LOADING_MED,
    payload: boolean,
}

export interface SetOneMedApiAction {
    type: MedActionEnum.SET_ONEMEDAPI,
    payload: any,
}

export interface SetSearchListAction {
    type: MedActionEnum.SET_SEARCH_LIST,
    payload: Array<any>,
}

export interface SetNullSearchListAction {
    type: MedActionEnum.SET_NULL_SEARCH_LIST,
    payload: [],
}


export type MedAction = SetMedListAction | SetNullMedListAction | SetCodeErrorAction | SetLoadingAction | SetOneMedApiAction | SetSearchListAction | SetNullSearchListAction