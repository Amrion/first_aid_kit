import React, {FC, useEffect, useState} from 'react';
import './listPage.scss'
import Medicine from "../../components/Medicine/Medicine";

import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loadingProfile} from "../../store/actions/userActions";
import Error500Page from "../Error500Page/Error500Page";
import {title} from "../../models/Title/Title";
import Loader from "../../components/Loader/Loader";
import {getListMed} from "../../store/actions/medActions";

const ListPage: FC = () => {
    const nav = useNavigate();

    const {isAuth, isLoading} = useAppSelector(state => state.auth);
    const {medList} = useAppSelector(state => state.med);
    const dispatch = useAppDispatch();

    const [error500, setError500] = useState(false);

    useEffect(() => {
        title.innerText = 'Список лекарств';

        if (!isAuth) {
            dispatch(loadingProfile())
                .then((res) => {
                    if (res === 401) {
                        nav('/login');
                    }

                    if (res === 500) {
                        setError500(true);
                    }
                });
        }

        if (medList.length === 0) {
            dispatch(getListMed());
        }

        return () => {
            title.innerText = 'My Aid Kit';
        }
    }, [])

    return (
        isLoading
            ?
            <Loader/>
            :
        !error500
            ?
            <div className='list-page'>
                <div className="addmed-h1">Список ваших лекарств</div>
                <div className='list-container'>
                    {
                        medList.length === 0
                            ?
                                <div className='under-profile'>Добавляйте лекарства из вашей домашней аптечки <Link className='link-list' to='/addmed'>здесь</Link></div>
                            :
                                medList.map((item) => {
                                    return <Medicine key={item.id} id={item.id} src={item.image} name={item.name} kol={item.count}/>
                                })
                    }
                </div>
            </div>
            :
            <Error500Page/>
    );
};

export default ListPage;