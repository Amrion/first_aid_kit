import React, {FC} from 'react';
import './listElement.scss'
import {useAppSelector} from "../../hooks/useAppSelector";

interface ListElementProps {
    photo: string,
    name: string,
    familyId?: number,
    medId?: number,
    user?: boolean,
    selectMed?:  (e, id) => void,
    selectProf?:  (e, id, user) => void,
}

const ListElement: FC<ListElementProps> = ({user, medId, familyId, selectMed, selectProf, photo, name}) => {
    const {id} = useAppSelector(state => state.user)

    return (
        user !== undefined
            ?
                <>
                    <li onClick={(e) => selectProf(e, familyId, user)} className='list-element'>
                        <div className='elem-photo' style={{backgroundImage: `url(${photo})`}}></div>
                        {
                            id === familyId
                                ?
                                user === true
                                    ?
                                    <div className='elem-name'>{name + ' (Я)'}</div>
                                    :
                                    <div className='elem-name'>{name}</div>
                                :
                                <div className='elem-name'>{name}</div>
                        }
                    </li>
                </>
            :
                <>
                    <li onClick={(e) => selectMed(e, medId)} className='list-element'>
                        <div className='elem-photo' style={{backgroundImage: `url(${photo})`}}></div>
                        <div className='elem-name'>{name}</div>
                    </li>
                </>

    );
};

export default ListElement;