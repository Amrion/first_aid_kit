import React, {FC} from 'react';
import './myButton.scss'

interface MyButtonProps {
    width: string,
    height: string,
    fontSize: string,
    children: any,
    margin: string,
    submit?: (e) => void,
    size?: string,
}

const MyButton: FC<MyButtonProps> = ({width, height, fontSize, children, margin, submit, size}) => {
    return (
        <button onClick={(e) => submit(e)} className={['my-button', `${size}`].join(' ')} style={{width, height, fontSize, margin}}  type='submit'>
            {children}
        </button>
    );
};

export default MyButton;