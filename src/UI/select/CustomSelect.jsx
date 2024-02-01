import React from 'react';

const CustomSelect = ({ setOption, options, ...props }) => {
  return (
    <select {...props} onChange={(e) => {
        setOption(e.target.value);
      }
    }>
      <option value="" selected disabled>Не выбрано</option>
      {
        options.map((item, itemIndex) => (
          <option value={item.value} key={itemIndex}>{item.text}</option> // key={itemIndex}
        ))
      }
    </select>
  );
}

export default CustomSelect;
