import React, { useState } from 'react';
import CustomSelect from './UI/select/CustomSelect';
import CustomInput from './UI/input/CustomInput';
import CustomButton from './UI/button/CustomButton';

const SearchForm = ({ setValue, ...props }) => {
  const [searchOption, setSearchOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function setSearch(option) {
    setSearchOption(option);
    console.log(option);
    console.log(searchQuery);
  }

  const selectOptions = [
    { text: "Фамилии", value: "lastName", },
    { text: "Имени", value: "firstName", },
    { text: "Отчеству", value: "maidenName", },
    { text: "Возрасту", value: "age", },
    { text: "Полу", value: "gender", },
    { text: "Номеру телефона", value: "number", },
    { text: "Городу", value: "address", },
    { text: "Адресу", value: "address", },
  ]

  function searchFunction() {
    if (searchOption && searchQuery) {
      setValue(`/filter?key=${searchOption}&value=${searchQuery}`);
    } else {
      setValue('');
    }
  }

  return (
    <form {...props}>
      <span>Поиск по </span>
      <CustomSelect option={searchOption} options={selectOptions} setOption={setSearch} />
      <CustomInput text={searchQuery} setText={setSearchQuery} />
      <CustomButton onClick={searchFunction}>Поиск</CustomButton>
    </form>
  );
}

export default SearchForm;
