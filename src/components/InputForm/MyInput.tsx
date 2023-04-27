import React, {FC, MutableRefObject, ReactElement} from 'react';

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
                    </div>
            }
            <div className={['error', `${active}`].join(' ')}>{error}</div>
        </div>
    );
};

export default MyInput;