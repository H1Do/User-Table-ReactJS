import React from 'react';

const CustomButton = ({children, ...props}) => {
    return (
        <button type="button" {...props}>
            {children}
        </button>
    );
}

export default CustomButton;
