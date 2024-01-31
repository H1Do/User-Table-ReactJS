import React from 'react';
import styles from './CustomTable.module.scss'

const CustomTable = ({ tableHeaders, tableRows, ...props }) => {
  return (
    <table {...props} className={styles.customTable}>
      <thead>
        <tr>
          {
            tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          tableRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
            {
              row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  {cell}
                </td>
              ))
            }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default CustomTable;
