import React, {FC, useEffect, useRef} from 'react';
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

interface SearchListProps {
    id: number,
    name: string,
    click: (id) => void
}

const SearchList: FC<SearchListProps> = ({id, name, click}) => {
    const itemRef = useRef<HTMLDivElement>();

    useEffect(() => {
        itemRef.current.innerHTML = name;
    }, [])

    return (
        <div ref={itemRef} onClick={() => click(id)} className='list-search-item'>

        </div>
    );
};

export default SearchList;