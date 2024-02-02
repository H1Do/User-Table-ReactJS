import React, { useState } from "react";
import styles from "../styles/SearchForm.module.scss";
import CustomSelect from "./UI/select/CustomSelect";
import CustomInput from "./UI/input/CustomInput";
import CustomButton from "./UI/button/CustomButton";

const SearchForm = ({
  setValue,
  selectOptions = [{ text: "", value: "" }],
  ...props
}) => {
  const [searchOption, setSearchOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function searchFunction() {
    if (searchOption && searchQuery) {
      setValue(`/filter?key=${searchOption}&value=${searchQuery}`);
    } else {
      setValue("");
    }
  }

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        searchFunction();
      }}
      className={styles.searchForm}
    >
      <label htmlFor="searchInput">Искать по</label>
      <CustomSelect
        id="searchInput"
        option={searchOption}
        options={selectOptions}
        setOption={setSearchOption}
      />
      <CustomInput
        text={searchQuery}
        setText={setSearchQuery}
        placeholder="Введите запрос (Регистры учитываются)"
      />
      <CustomButton onClick={searchFunction}>Поиск</CustomButton>
    </form>
  );
};

export default SearchForm;
