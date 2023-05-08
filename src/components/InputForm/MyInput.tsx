import React, {FC, MutableRefObject, ReactElement, useRef} from 'react';

interface MyInputProps {
    placeholder: string,
    type: string,
    elem: MutableRefObject<HTMLDivElement>,
    blur: () => void
    focus: () => void
    children: ReactElement<HTMLElement, string>,
    error: string,
    disable?: boolean
    active: string,
    min?: string,
    value?: string,
    change?: (value) => void;
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
                                       max,
                                       change,
                                       disable = false}) => {
    const refOpen = useRef<HTMLDivElement>();
    const refClose = useRef<HTMLDivElement>();

    const openPassword = (e) => {
        e.target.previousSibling.type = 'text';
        refOpen.current.classList.add('close-password-hidden');
        refClose.current.classList.remove('close-password-hidden')
    }

    const closePassword = (e) => {
        e.target.previousSibling.previousSibling.type = 'password';
        refOpen.current.classList.remove('close-password-hidden');
        refClose.current.classList.add('close-password-hidden')
    }

    return (
        <div className='papa'>
            {
                disable
                ?
                    <div style={{backgroundColor: 'lightgray', border: 0}} ref={elem} className='element'>
                        {children}
                        <input autoComplete="new-password"
                               disabled={disable}
                               onChange={e => change(e.target.value)}
                               max={max}
                               min={min}
                               value={value}
                               className='log-input'
                               onBlur={blur}
                               onFocus={focus}
                               placeholder={placeholder}
                               type={type}
                               required/>
                    </div>
                :
                    <div ref={elem} className='element'>
                        {children}
                        <input autoComplete="new-password"
                               disabled={disable}
                               onChange={e => change(e.target.value)}
                               max={max}
                               min={min}
                               value={value}
                               className='log-input'
                               onBlur={blur}
                               onFocus={focus}
                               placeholder={placeholder}
                               type={type}
                               required/>
                        {
                            type === 'password' &&
                                <>
                                    <div ref={refOpen} onClick={openPassword} className='see-password'></div>
                                    <div ref={refClose} onClick={closePassword} className='close-password close-password-hidden'></div>
                                </>
                        }
                    </div>
            }
            <div className={['error', `${active}`].join(' ')}>{error}</div>
        </div>
    );
};

export default MyInput;