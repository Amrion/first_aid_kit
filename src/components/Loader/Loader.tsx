import React, {FC} from 'react';
import './loader.scss'

interface LoaderProps {
    add?: string,
}

const Loader: FC<LoaderProps> = ({add}) => {
    return (
        <div className={[`preloader`, add].join(' ')}>
            <div className="preloader__row">
                <div className="preloader__item"></div>
                <div className="preloader__item"></div>
            </div>
        </div>
    );
};

export default Loader;