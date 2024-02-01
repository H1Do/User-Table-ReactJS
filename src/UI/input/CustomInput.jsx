import React from 'react';

const CustomInput = ({text, setText, ...props}) => {
    return (
        <input {...props} type="text" value={text} onChange={
            (e) => setText(e.target.value)
        }></input>
    );
}

export default CustomInput;
