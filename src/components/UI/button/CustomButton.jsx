import React from "react";
import styles from "./CustomButton.module.scss";

const CustomButton = ({ children, ...props }) => {
  return (
    <button className={styles.customButton} type="button" {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
