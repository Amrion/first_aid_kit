import React, {FC} from 'react';
import './listElement.scss'

interface ListElementProps {
    photo: string,
    name: string,
    select:  (e) => void,
}

const ListElement: FC<ListElementProps> = ({select, photo, name}) => {
    return (
        <li onClick={(e) => select(e)} className='list-element'>
            <div className='elem-photo' style={{backgroundImage: `url(${photo})`}}></div>
            <div className='elem-name'>{name}</div>
        </li>
    );
};

export default ListElement;