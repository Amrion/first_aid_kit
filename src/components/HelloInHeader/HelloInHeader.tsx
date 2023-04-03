import React, {FC, useEffect, useRef} from 'react';

const HelloInHeader: FC = () => {
    const time = useRef<HTMLDivElement>();

    useEffect(() =>{
        const date = new Date();
        if (date.getHours() >= 0 && date.getHours() < 5) {
            time.current.textContent = 'Еще не спите, ';

            return;
        }

        if (date.getHours() >= 5 && date.getHours() < 12) {
            time.current.textContent = 'Доброе утро, ';

            return
        }

        if (date.getHours() >= 12 && date.getHours() < 18) {
            time.current.textContent = 'Добрый день, ';

            return
        }

        if (date.getHours() >= 18) {
            time.current.textContent = 'Добрый вечер, ';

            return;
        }
    },[])

    return (
        <div className='hello'>
            <div ref={time} className='name'></div>
            <span className='name person'>Тарновский</span>
            <div className='wish'>Счастье - это крайняя форма здоровья</div>
        </div>
    );
};

export default HelloInHeader;