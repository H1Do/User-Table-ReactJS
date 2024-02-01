import React, { useState } from 'react';
import styles from '../styles/SearchForm.module.scss';
import CustomSelect from './UI/select/CustomSelect';
import CustomInput from './UI/input/CustomInput';
import CustomButton from './UI/button/CustomButton';

const SearchForm = ({ setValue, ...props }) => {
  const [searchOption, setSearchOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const selectOptions = [
    { text: "Фамилии", value: "lastName", },
    { text: "Имени", value: "firstName", },
    { text: "Отчеству", value: "maidenName", },
    { text: "Возрасту", value: "age", },
    { text: "Полу", value: "gender", },
    { text: "Городу", value: "address.city", },
    { text: "Адресу", value: "address.address", },
  ]

  function searchFunction() {
    if (searchOption && searchQuery) {
      setValue(`/filter?key=${searchOption}&value=${searchQuery}`);
    } else {
      setValue('');
    }
  }

  return (
    <form {...props} className={styles.searchForm}>
      <span>Искать по</span>
      <CustomSelect option={searchOption} options={selectOptions} setOption={setSearchOption} />
      <CustomInput text={searchQuery} setText={setSearchQuery} placeholder="Введите запрос"/>
      <CustomButton onClick={searchFunction}>Поиск</CustomButton>
    </form>
  );
}

export default SearchForm;
