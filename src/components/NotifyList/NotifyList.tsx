import React, {FC, useEffect, useRef} from 'react';
import './notifyList.scss'

interface NotifyListProps {
    name: string,
    med: string,
    time: string
}

const NotifyList: FC<NotifyListProps> = ({name, med, time}) => {
    const refNot = useRef<HTMLDivElement>();

    return (
        <div ref={refNot} className='not-list-container'>
            <div className='first-item-list'>
                <div className='not-list-med'>{med}</div>
                <div className='not-list-name'>{name}</div>
                <div className='not-list-time'>{time}</div>
            </div>
            <div className='not-list-button'>
                <button className='accept-med'>Принял</button>
            </div>
            <svg className='cross-icon-notify' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path d="M16 8L8 16M8 8L16 16" stroke="rgb(225, 61, 61)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </div>
    );
};

export default NotifyList;