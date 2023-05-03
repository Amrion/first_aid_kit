import React, {FC, useEffect, useRef, useState} from 'react';
import './notifyList.scss'
import {regExp} from "../InputForm/utils/regExp";
import {log} from "util";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {acceptNotify, removeNotify} from "../../store/actions/notifyActions";

interface NotifyListProps {
    name: string,
    med: string,
    time: string,
    allow: boolean,
    id: number,
    is_accepted: boolean,
    is_tablets: boolean,
    value: any
}

const NotifyList: FC<NotifyListProps> = ({value, id, is_accepted, is_tablets, name, med, time, allow}) => {
    const refNot = useRef<HTMLDivElement>();
    const refTime = useRef<HTMLDivElement>();
    const refMed = useRef<HTMLDivElement>();
    const refAcceptCont = useRef<HTMLDivElement>();
    const refBtn = useRef<HTMLButtonElement>();
    const refInput = useRef<HTMLInputElement>();

    const [valueKol, setValueKol] = useState('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (is_accepted === true) {
            refTime.current.classList.add('accept-container');
            refMed.current.classList.add('accept-container');
            refBtn.current.classList.add('accept-input-hidden');

            return ;
        }

        if (allow === true && is_accepted === false) {
            refBtn.current.classList.remove('accept-input-hidden');
            refTime.current.classList.add('remain-container');
            refMed.current.classList.add('remain-container');

            return;
        }

        refTime.current.classList.remove('remain-container');
        refMed.current.classList.remove('remain-container');
        refTime.current.classList.remove('accept-container');
        refMed.current.classList.remove('accept-container');
        refBtn.current.classList.add('accept-input-hidden');
        refInput.current.classList.add('accept-input-hidden');

        return () => {
            if (refBtn.current !== null) {
                refBtn.current.classList.add('accept-input-hidden');
                refTime.current.classList.remove('remain-container');
                refMed.current.classList.remove('remain-container');
            }
        }
    }, [value])

    const accept = () => {
        if (allow === true && is_accepted === false && is_tablets === true) {
            refInput.current.classList.remove('accept-input-hidden');
            refBtn.current.classList.add('accept-input-hidden');
        }

        if (is_tablets === false) {
            dispatch(acceptNotify({
                id,
                count: 0
            }));

            refTime.current.classList.remove('remain-container');
            refMed.current.classList.remove('remain-container');
            refTime.current.classList.add('accept-container');
            refMed.current.classList.add('accept-container');
            refBtn.current.classList.add('accept-input-hidden');
            refInput.current.classList.add('accept-input-hidden');
        }
    }

    const changeValue = (e) => {
        if ((Number(e.target.value) > 0 && regExp.checkKolMed.test(e.target.value)) || e.target.value === '') {
            setValueKol(e.target.value)
        }
    }

    const submit = () => {
        if (valueKol === '') {
            refBtn.current.classList.remove('accept-input-hidden');
            refInput.current.classList.add('accept-input-hidden');

            return
        }

        if (valueKol !== '') {
            refTime.current.classList.remove('remain-container');
            refMed.current.classList.remove('remain-container');
            refTime.current.classList.add('accept-container');
            refMed.current.classList.add('accept-container');
            refBtn.current.classList.add('accept-input-hidden');
            refInput.current.classList.add('accept-input-hidden');

            dispatch(acceptNotify({
                id,
                count: Number(valueKol)
            }))
        }
    }

    const deleteNot = () => {
        dispatch(removeNotify(id))
    }

    return (
        <div ref={refNot} className='not-list-container'>
            <div className='first-item-list'>
                <div ref={refMed} className='not-list-med'>{med}</div>
                <div className='not-list-name'>{name}</div>
                <div ref={refTime} className='not-list-time'>{time}</div>
            </div>
            <div ref={refAcceptCont} className='not-list-button'>
                <button onClick={accept} ref={refBtn} className='accept-med'>Принять</button>
                <input onBlur={submit} ref={refInput} placeholder='Кол-во таблеток' className='accept-input accept-input-hidden' type='text' onChange={changeValue} value={valueKol}/>
            </div>
            {
                !is_accepted &&
                <svg onClick={deleteNot} className='cross-icon-notify' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8L8 16M8 8L16 16" stroke="rgb(225, 61, 61)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            }
        </div>
    );
};

export default NotifyList;