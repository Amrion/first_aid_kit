import React, {FC, useRef} from 'react';

const SearchInHeader: FC = () => {
    const input = useRef<HTMLInputElement>();
    const search = useRef<SVGSVGElement>();
    const cross = useRef<SVGSVGElement>();
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

    return (
        <div className='search'>
            <div ref={input} className='input-container input-hidden'>
                <input  placeholder='Поиск лекарств' className='search-input '/>
                <svg className='photo-search' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="gray" d="M3.464 3.464c-.974.974-1.3 2.342-1.41 4.536h1.963c.047-1.554.22-2.48.861-3.122.642-.641 1.568-.814 3.122-.861V2.055c-2.194.109-3.562.435-4.536 1.409zm0 17.071c-.974-.974-1.3-2.342-1.41-4.535h1.963c.047 1.553.22 2.48.861 3.12.642.642 1.568.816 3.122.862v1.963c-2.194-.11-3.562-.436-4.536-1.41zM16 21.945v-1.963c1.553-.046 2.48-.22 3.12-.861.642-.641.816-1.568.862-3.121h1.963c-.11 2.193-.436 3.561-1.41 4.535-.974.974-2.342 1.3-4.535 1.41zM21.945 8h-1.963c-.046-1.554-.22-2.48-.861-3.122-.641-.641-1.568-.814-3.121-.861V2.055c2.193.109 3.561.435 4.535 1.409.974.974 1.3 2.342 1.41 4.536z"/><circle cx="12" cy="12" r="3" fill="none" stroke="gray" strokeWidth="2"/></svg>
            </div>
            <svg ref={search} onClick={showInput} className='search-icon search-icon-active' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path d="M17 17L21 21" stroke="#B36FF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#B36FF7" strokeWidth="2"/>
            </svg>
            <svg onClick={hideInput} ref={cross} className='cross-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <path d="M16 8L8 16M8 8L16 16" stroke="#B36FF7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </div>
    );
};

export default SearchInHeader;