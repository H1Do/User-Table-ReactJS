import React from 'react';
import styles from './CustomInput.module.scss';

const CustomInput = ({text, setText, ...props}) => {
    return (
        <input className={styles.customInput} {...props} type="text" value={text} onChange={
            (e) => setText(e.target.value)
        }></input>
    );
}

export default CustomInput;
