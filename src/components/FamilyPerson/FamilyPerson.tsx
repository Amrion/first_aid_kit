import React, {FC} from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";

interface FamilyPersonProps {
    familyId: number,
    index: number,
    src: string,
    name: string,
    role: boolean,
    user: boolean,
    open: (item) => void;
}

const FamilyPerson: FC<FamilyPersonProps> = ({index, familyId, open, role, user, name, src}) => {
    const {id, main} = useAppSelector(state => state.user);

    return (
        <div className='person-profile'>
            <div className='person-photo' style={{backgroundImage: `url(${src})`}}/>
            <div className='person-info'>
                <div className='person-name'>
                    {name}
                </div>
                <div className='person-role'>
                    {
                        index === 0
                        ?
                            'Организатор'
                        :
                            <>
                                {
                                    role
                                        ?
                                        'Взрослый'
                                        :
                                        'Ребенок'
                                }
                            </>
                    }
                </div>
            </div>
            {
                main &&
                <>
                    {
                        id !== familyId
                            ?
                            <svg onClick={open} className="delete-profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 fill="none">
                                <path d="M16 8L8 16M8 8L16 16" stroke="rgb(225, 61, 61)" strokeWidth="2" strokeLinecap="round"></path>
                            </svg>
                            :
                            user === false &&
                            <svg onClick={open} className="delete-profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 fill="none">
                                <path d="M16 8L8 16M8 8L16 16" stroke="rgb(225, 61, 61)" strokeWidth="2" strokeLinecap="round"></path>
                            </svg>
                    }
                </>
            }
        </div>
    );
};

export default FamilyPerson;