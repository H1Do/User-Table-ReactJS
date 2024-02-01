import React from 'react';
import styles from './CustomSelect.module.scss'

const CustomSelect = ({ setOption, options, ...props }) => {
  return (
    <select className={styles.customSelect} {...props} onChange={(e) => {
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
