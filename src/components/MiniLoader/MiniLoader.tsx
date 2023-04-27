import React, {FC} from 'react';
import './miniLoader.scss'

interface DeleteProps {
    deleteCheck?: boolean
}

const MiniLoader: FC<DeleteProps> = ({deleteCheck = false}) => {
    return (
        deleteCheck
            ?
                <div className="showbox">
                    <div className="loader">
                        <svg className="circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="5"
                                    strokeMiterlimit="10"/>
                        </svg>
                    </div>
                </div>
            :
                <div className="showbox">
                    <div style={{width: 28}} className="loader">
                        <svg className="circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="5"
                                    strokeMiterlimit="10"/>
                        </svg>
                    </div>
                </div>
    );
};

export default MiniLoader;