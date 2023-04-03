import React, {FC} from 'react';

interface FamilyPersonProps {
    src: string,
    name: string,
    role: string,
    open: () => void;
}

const FamilyPerson: FC<FamilyPersonProps> = ({open, role, name, src}) => {
    return (
        <div className='person-profile'>
            <div className='person-photo' style={{backgroundImage: `url(${src})`}}/>
            <div className='person-info'>
                <div className='person-name'>
                    {name}
                </div>
                <div className='person-role'>
                    {role}
                </div>
            </div>
            <svg onClick={open} className="delete-profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="none">
                <path d="M16 8L8 16M8 8L16 16" stroke="rgb(225, 61, 61)" strokeWidth="2" strokeLinecap="round"></path>
            </svg>
        </div>
    );
};

export default FamilyPerson;