import React, {FC} from 'react';
import './medicine.scss'
import {Link} from "react-router-dom";

interface MedicineProps {
    id: number,
    src: string,
    name: string,
    kol?: string
}

const Medicine: FC<MedicineProps> = ({id, src, name, kol}) => {
    return (
        <div className='med-element'>
            <Link to={`/list/${id}`}>
                <div className='list-med-photo' style={{backgroundImage: `url(${src})`}}/>
            </Link>
            <div className='under-photo'>
                <div className='list-med-name'>{name}</div>
                <div className='list-med-kol'> Осталось: <span className='remain-med'>{kol}</span> </div>
            </div>
        </div>
    );
};

export default Medicine;