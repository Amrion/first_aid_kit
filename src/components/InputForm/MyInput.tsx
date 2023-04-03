import React, {FC, MutableRefObject, ReactElement} from 'react';

interface MyInputProps {
    placeholder: string,
    type: string,
    elem: MutableRefObject<HTMLDivElement>,
    blur: (value) => void
    focus: () => void
    children: ReactElement<HTMLElement, string>,
    error: string,
    active: string,
    min?: string,
    value?: string,
    max?: string,
}

const MyInput: FC<MyInputProps> = ({placeholder,
                                       type,
                                       elem,
                                       blur,
                                       focus,
                                       children,
                                       error,
                                       active,
                                       min,
                                       value,
                                       max}) => {
    return (
        <div className='papa'>
            <div ref={elem} className='element'>
                {children}
                <input autoComplete="new-password" max={max} min={min} value={value} className='log-input' onBlur={e => blur(e.target.value)} onFocus={focus} placeholder={placeholder} type={type} required/>
            </div>
            <div className={['error', `${active}`].join(' ')}>{error}</div>
        </div>
    );
};

export default MyInput;