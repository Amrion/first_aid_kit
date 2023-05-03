import React, {FC, useEffect, useRef, useState} from 'react';
import './notifyList.scss'
import {regExp} from "../InputForm/utils/regExp";

interface NotifyListProps {
    name: string,
    med: string,
    time: string,
    nowTime: string,
}

const NotifyList: FC<NotifyListProps> = ({name, med, time, nowTime}) => {
    const refNot = useRef<HTMLDivElement>();
    const refTime = useRef<HTMLDivElement>();
    const refMed = useRef<HTMLDivElement>();
    const refAcceptCont = useRef<HTMLDivElement>();
    const refBtn = useRef<HTMLButtonElement>();
    const refInput = useRef<HTMLInputElement>();

    const [value, setValue] = useState('');

    useEffect(() => {
        if (Number(nowTime) >= Number(time.slice(0, 2))) {
            refTime.current.classList.add('remain-container');
            refMed.current.classList.add('remain-container');
            refBtn.current.classList.add('accept-input-hidden');
        }
    }, [])

    const accept = () => {
        if (Number(nowTime) >= Number(time.slice(0, 2))) {
            refInput.current.classList.remove('accept-input-hidden');
            refBtn.current.classList.add('accept-input-hidden');
        }
    }

    const changeValue = (e) => {
        if ((Number(e.target.value) > 0 && regExp.checkKolMed.test(e.target.value)) || e.target.value === '') {
            setValue(e.target.value)
        }
    }

    const submit = () => {
        if (value === '') {
            return
        }

        if (value !== '') {
            refTime.current.classList.remove('remain-container');
            refMed.current.classList.remove('remain-container');
            refTime.current.classList.add('accept-container');
            refMed.current.classList.add('accept-container');
            refInput.current.disabled = true
        }
    }

    const closeInput = (e) => {
        if (e.target !== refAcceptCont.current.children[0] && e.target !== refAcceptCont.current.children[1] && value === '') {
            refInput.current.classList.add('accept-input-hidden');
            refBtn.current.classList.remove('accept-input-hidden');
        }
    }

    return (
        <div onClick={closeInput} ref={refNot} className='not-list-container'>
            <div className='first-item-list'>
                <div ref={refMed} className='not-list-med'>{med}</div>
                <div className='not-list-name'>{name}</div>
                <div ref={refTime} className='not-list-time'>{time}</div>
            </div>
            <div ref={refAcceptCont} className='not-list-button'>
                <button onClick={accept} ref={refBtn} className='accept-med'>Принять</button>
                <input onBlur={submit} ref={refInput} placeholder='Кол-во таблеток' className='accept-input accept-input-hidden' type='text' onChange={changeValue} value={value}/>
            </div>
            <svg className='cross-icon-notify' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path d="M16 8L8 16M8 8L16 16" stroke="rgb(225, 61, 61)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </div>
    );
};

export default NotifyList;