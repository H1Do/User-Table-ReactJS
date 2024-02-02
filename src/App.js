import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import CustomTable from './components/UI/table/CustomTable';
import SearchForm from './components/SearchForm';

function App() {
  const [data, setData] = useState([]);
  const [parameters, setParameters] = useState("");

  const URL = 'https://dummyjson.com/users';
  const headersToSort = ["ФИО", "Возраст", "Пол", "Адрес"];
  const tableHeaders = ["ФИО", "Возраст", "Пол", "Номер телефона", "Адрес"];
  const tableRows = ObjectsToArrays(data);
  const selectOptions = [
    { text: "Фамилии", value: "lastName", },
    { text: "Имени", value: "firstName", },
    { text: "Отчеству", value: "maidenName", },
    { text: "Возрасту", value: "age", },
    { text: "Полу", value: "gender", },
    { text: "Городу", value: "address.city", },
    { text: "Адресу", value: "address.address", },
  ];


  function getData(url, parameters) {
    fetch(url + parameters)
      .then(res => res.json())
      .then(result => {
        if (result.users) {
          setData(result.users);
        }
      })
      .catch(error => { throw error })
  }

  function ObjectsToArrays(objectsArray) {
    return objectsArray.map(user =>
      [
        user.lastName + ' ' + user.firstName + ' ' + user.maidenName,
        user.age,
        user.gender,
        user.phone,
        user.address.city + ' ' + user.address.address,
      ]
    )
  }

  useEffect(() => {
    getData(URL, parameters);
  }, [parameters]);

  return (
    <div className="App">
      <SearchForm setValue={setParameters} selectOptions={selectOptions} />
      {
        tableRows.length
          ?
          <CustomTable tableHeaders={tableHeaders} tableRows={tableRows} headersToSort={headersToSort} />
          :
          <h1>Ничего не найдено</h1>
      }
    </div>
  );
}

export default App;
