import React, { useState, useMemo } from "react";
import styles from "./CustomTable.module.scss";
import CustomButton from "../button/CustomButton";

const CustomTable = ({
  tableHeaders = [],
  tableRows = [],
  headersToSort = [],
  onRowClick,
  ...props
}) => {
  const [sortParameters, setSortParameters] = useState({
    sortBy: "",
    sortOrder: null,
    indexOfSort: null,
  });

  const handleSort = (header) => {
    if (sortParameters.sortBy === header) {
      setSortParameters({
        ...sortParameters,
        sortOrder:
          sortParameters.sortOrder === "inc"
            ? "dec"
            : sortParameters.sortOrder === "dec"
            ? null
            : "inc",
      });
    } else {
      setSortParameters({
        sortBy: header,
        sortOrder: "inc",
        indexOfSort: tableHeaders.indexOf(header),
      });
    }
  };

  function compareCells(firstCell, secondCell, order) {
    return typeof firstCell === "string"
      ? order * firstCell.localeCompare(secondCell)
      : order * (firstCell - secondCell);
  }

  const sortedRows = useMemo(
    () =>
      sortParameters.sortOrder !== null
        ? [...tableRows].sort((firstCell, SecondCell) => {
            return compareCells(
              firstCell[sortParameters.indexOfSort],
              SecondCell[sortParameters.indexOfSort],
              sortParameters.sortOrder === "inc" ? 1 : -1
            );
          })
        : tableRows,
    [sortParameters, tableRows]
  );

  return (
    <table {...props} className={styles.customTable}>
      <thead>
        <tr className={styles.headerRow}>
          {tableHeaders.map((header, index) => (
            <th key={index}>
              <div className={styles.tableCellInner}>
                {header}
                {headersToSort.includes(header) ? (
                  <CustomButton onClick={() => handleSort(header)}>
                    {(sortParameters.sortBy === header) ?
                    sortParameters.sortOrder === "inc"
                      ? "Сортировка по возрастанию"
                      : sortParameters.sortOrder === "dec"
                      ? "Сортировка по убыванию"
                      : "Без сортировки"
                    : "Без сортировки"}
                  </CustomButton>
                ) : null}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            id={rowIndex}
            onClick={(e) => {
              onRowClick(e.target.closest("tr").firstChild.textContent);
            }}
          >
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
