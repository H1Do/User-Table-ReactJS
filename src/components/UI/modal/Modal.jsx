import React from "react";
import styles from "./Modal.module.scss";
import CustomButton from "../button/CustomButton";

const Modal = ({ children, visible, setVisible, ...props }) => {
  const rootClasses = [styles.customModal];
  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div
      className={rootClasses.join(" ")}
      {...props}
      onClick={() => setVisible(false)}
    >
      <div
        className={styles.customModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <CustomButton onClick={() => setVisible(false)}>✕</CustomButton>
        {children}
      </div>
    </div>
  );
};

export default Modal;
