import React, {FC, useEffect, useRef, useState} from 'react';
import './pictureSearch.scss'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {barcodeMed, searchMed} from "../../store/actions/medActions";
import {useAppSelector} from "../../hooks/useAppSelector";
import MiniLoader from "../MiniLoader/MiniLoader";
import {medActionOneMedApi} from "../../store/reducers/medReducer/medReducer";
import SearchList from "../SearchList/SearchList";

const SearchInHeader: FC = () => {
    const input = useRef<HTMLInputElement>();
    const search = useRef<SVGSVGElement>();
    const tail = useRef<SVGSVGElement>();
    const imgCont = useRef<HTMLDivElement>();
    const refError = useRef<HTMLDivElement>();
    const cross = useRef<SVGSVGElement>();

    const dispatch = useAppDispatch();
    const {codeError, loading, oneMedApi, searchList} = useAppSelector(state => state.med);

    const refPopUpMed = useRef<HTMLDivElement>()
    const refPopUpBodyMed = useRef<HTMLDivElement>();

    const firstInfo = useRef<HTMLDivElement>();
    const secondInfo = useRef<HTMLDivElement>();
    const thirdInfo = useRef<HTMLDivElement>();
    const fourthInfo = useRef<HTMLDivElement>();
    const fifthInfo = useRef<HTMLDivElement>();
    const sixInfo = useRef<HTMLDivElement>();
    const sevenInfo = useRef<HTMLDivElement>();
    const eightInfo = useRef<HTMLDivElement>();
    const nineInfo = useRef<HTMLDivElement>();

    const searchListRef = useRef<HTMLDivElement>();
    const borderInput = useRef<HTMLInputElement>();

    const [searchStr, setSearchStr] = useState('');

    const showInput = () => {
        input.current.classList.remove('input-hidden');
        search.current.classList.remove('search-icon-active');
        cross.current.classList.add('cross-icon-active');
    }

    const hideInput = () => {
        input.current.classList.add('input-hidden');
        search.current.classList.add('search-icon-active');
        cross.current.classList.remove('cross-icon-active');
    }

    const openPopUpImg = () => {
        imgCont.current.classList.toggle('cont-hidden')
        tail.current.classList.toggle('cont-hidden')
    }
    const uploadImg = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('file', e.target.files[0]);

        const res = await dispatch(barcodeMed(formData));
    }

    const closePopUpMed = (e) => {
        document.body.style.overflowY = 'visible';
        e.preventDefault();

        refPopUpMed.current.classList.remove('popUp-container-active');
        refPopUpBodyMed.current.classList.remove('popUp-active');
    }

    useEffect(() => {
        if (oneMedApi.hasOwnProperty('id')) {
            console.log(1)

            refPopUpMed.current.classList.add('popUp-container-active');
            refPopUpBodyMed.current.classList.add('popUp-active');

            imgCont.current.classList.add('cont-hidden')
            tail.current.classList.add('cont-hidden')

            firstInfo.current.innerHTML = oneMedApi.composition;
            secondInfo.current.innerHTML = oneMedApi.document.phInfluence;
            thirdInfo.current.innerHTML = oneMedApi.document.indication;
            fourthInfo.current.innerHTML = oneMedApi.document.dosage;
            fifthInfo.current.innerHTML = oneMedApi.document.contraIndication;
            sixInfo.current.innerHTML = oneMedApi.document.childInsuf;
            if (oneMedApi.document.overDosage === null) {
                sevenInfo.current.innerHTML = 'Нет указаний'
            } else {
                sevenInfo.current.innerHTML = oneMedApi.document.overDosage;
            }
            if (oneMedApi.document.interaction === null) {
                eightInfo.current.innerHTML = 'Нет указаний'
            } else {
                eightInfo.current.innerHTML = oneMedApi.document.interaction;
            }
            if (oneMedApi.document.storageCondition === null) {
                nineInfo.current.innerHTML = 'Нет указаний'
            } else {
                nineInfo.current.innerHTML = oneMedApi.document.storageCondition;
            }
        }
    }, [oneMedApi])

    useEffect(() => {
        return () => {
            dispatch(medActionOneMedApi({}))
        }
    }, [])

    const searchChange = async (e) => {
        setSearchStr(e.target.value);

        if (e.target.value === '') {
            searchListRef.current.classList.add('list-search-cont-hidden');

            return;
        }

        searchListRef.current.classList.remove('list-search-cont-hidden');
        const res = dispatch(searchMed((e.target.value).trim()));
    }

    const clickSearchItem = (id) => {
        const clickItem = searchList.filter((item) => {
            if (item.id === id) {
                return item;
            }
        });

        searchListRef.current.classList.add('list-search-cont-hidden');
        setSearchStr('')

        dispatch(medActionOneMedApi({}));
        dispatch(medActionOneMedApi(clickItem[0]));
    }

    return (
        <>
            <div className='search'>
                <div ref={input} className='input-container input-hidden'>
                    <input ref={borderInput} value={searchStr} onChange={(e) => searchChange(e)} placeholder='Поиск всех лекарств по совпадениям' className='search-input '/>
                    <svg onClick={openPopUpImg} className='photo-search' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="gray" d="M3.464 3.464c-.974.974-1.3 2.342-1.41 4.536h1.963c.047-1.554.22-2.48.861-3.122.642-.641 1.568-.814 3.122-.861V2.055c-2.194.109-3.562.435-4.536 1.409zm0 17.071c-.974-.974-1.3-2.342-1.41-4.535h1.963c.047 1.553.22 2.48.861 3.12.642.642 1.568.816 3.122.862v1.963c-2.194-.11-3.562-.436-4.536-1.41zM16 21.945v-1.963c1.553-.046 2.48-.22 3.12-.861.642-.641.816-1.568.862-3.121h1.963c-.11 2.193-.436 3.561-1.41 4.535-.974.974-2.342 1.3-4.535 1.41zM21.945 8h-1.963c-.046-1.554-.22-2.48-.861-3.122-.641-.641-1.568-.814-3.121-.861V2.055c2.193.109 3.561.435 4.535 1.409.974.974 1.3 2.342 1.41 4.536z"/><circle cx="12" cy="12" r="3" fill="none" stroke="gray" strokeWidth="2"/></svg>
                    <div ref={searchListRef} className='list-search-cont list-search-cont-hidden'>
                        {
                            searchList.length === 0
                                ?
                                <div className='list-search-not-found'>Ничего не найдено</div>
                                :
                                searchList.map((item) => {
                                    return <SearchList key={item.id} click={clickSearchItem} id={item.id} name={item.rusName}></SearchList>
                                })

                        }
                    </div>
                    <div ref={imgCont} className='cont-hidden search-img-container'>
                        <div className='search-img-text'> Загрузите фотографию штрих-кода с упаковки лекарства</div>
                        <div className='error error-active'> {codeError} </div>
                        <input onChange={(e) => uploadImg(e)} className='photo-input-med' type='file' id='barcode' accept='mage/png, image/jpg'/>
                        <label className='med-photo-button addmed-btn' htmlFor='barcode'> {
                            loading
                                ?
                                <MiniLoader/>
                                :
                                'Загрузить фото'
                        } </label>
                        <div className='search-img-text-under'> После этого вам сразу откроют страницу конкретного лекарства</div>
                    </div>
                    <svg ref={tail} viewBox="0 0 24 24" className="tail cont-hidden">
                        <path className="" d="M12 16C15 16 18 24 24 24H0C6 24 9 16 12 16Z"
                              fill="white"></path>
                        <path className=""
                              d="M8.05888 18.9807C6.77697 20.3966 5.32977 21.9951 3.57172 23H0C2.53449 23 4.52121 21.3153 6.39546 19.3161C6.68742 19.0046 6.98315 18.6782 7.27806 18.3526L7.27807 18.3526C7.87384 17.6949 8.46631 17.0408 9.01776 16.5218C9.82327 15.7637 10.827 15 12 15C13.173 15 14.1767 15.7637 14.9822 16.5218C15.5337 17.0408 16.1262 17.6949 16.7219 18.3526L16.7219 18.3526L16.7222 18.3529C17.017 18.6783 17.3127 19.0047 17.6045 19.3161C19.4788 21.3153 21.4655 23 24 23H20.4283C18.6702 21.9951 17.223 20.3966 15.9411 18.9807C14.4853 17.3726 13.2426 16 12 16C10.7574 16 9.51472 17.3726 8.05888 18.9807Z"
                              fill="white"></path>
                    </svg>
                </div>
                <svg ref={search} onClick={showInput} className='search-icon search-icon-active' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M17 17L21 21" stroke="#B36FF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#B36FF7" strokeWidth="2"/>
                </svg>
                <svg onClick={hideInput} ref={cross} className='cross-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8L8 16M8 8L16 16" stroke="#B36FF7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
            <div ref={refPopUpMed} className='popUp-container-med'>
                <div ref={refPopUpBodyMed} className='popUp-med'>
                    {
                        oneMedApi.hasOwnProperty('id') &&
                        <>
                            <div className='name-med'>
                                {
                                    oneMedApi.rusName.indexOf('<') !== -1
                                        ?
                                        <>
                                            {oneMedApi.rusName.slice(0, oneMedApi.rusName.indexOf('<'))}
                                        </>
                                        :
                                        <>
                                            {oneMedApi.rusName}
                                        </>
                                }
                            </div>
                            {
                                oneMedApi.images.length === 0
                                    ?
                                        <img src={'/styles/medPhoto.webp'} className='first-section-med-photo'></img>
                                    :
                                        <img src={`http://www.vidal.ru/${oneMedApi.images[0]}`} className='first-section-med-photo'></img>
                            }
                            <div className='info-upper'>Форма выпуска, упаковка и состав препарата</div>
                            <div ref={firstInfo} className='info-text'></div>
                            <div className='info-upper'>Фармакологическое действие</div>
                            <div ref={secondInfo} className='info-text'></div>
                            <div className='info-upper'>Показание препарата</div>
                            <div ref={thirdInfo} className='info-text'></div>
                            <div className='info-upper'>Режим дозирования</div>
                            <div ref={fourthInfo} className='info-text'></div>
                            <div className='info-upper'>Противопоказания к применению</div>
                            <div ref={fifthInfo} className='info-text'></div>
                            <div className='info-upper'>Применение у детей</div>
                            <div ref={sixInfo} className='info-text'></div>
                            <div className='info-upper'>Передозировка</div>
                            <div ref={sevenInfo} className='info-text'></div>
                            <div className='info-upper'>Лекарственное взаимодействие</div>
                            <div ref={eightInfo} className='info-text'></div>
                            <div className='info-upper'>Условия хранения препарата</div>
                            <div ref={nineInfo} className='info-text'></div>
                        </>
                    }
                    <svg onClick={closePopUpMed} className='cross-icon-med' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                        <path d="M16 8L8 16M8 8L16 16" stroke="rgb(225, 61, 61)" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        </>
    );
};

export default SearchInHeader;