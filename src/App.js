import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import CustomTable from './components/UI/table/CustomTable';
import SearchForm from './components/SearchForm';
import Modal from './components/UI/modal/Modal'

function App() {
  const [data, setData] = useState([]);
  const [parameters, setParameters] = useState("");
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const URL = 'https://dummyjson.com/users';
  const headersToSort = ["ФИО", "Возраст", "Пол", "Адрес"];
  const tableHeaders = ["id", "ФИО", "Возраст", "Пол", "Номер телефона", "Адрес"];
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

  function onRowClick(id) {
    const user = data.filter(user => user.id == id)[0];

    setModalContent(
      `ФИО:           ${user.lastName + ' ' + user.firstName + ' ' + user.maidenName}
      Возраст:        ${user.age}
      Адрес:          ${user.address.city + ' ' + user.address.address}
      Рост:           ${user.height}
      Вес:            ${user.weight}
      Номер телефона: ${user.phone}
      Email-адрес:    ${user.email}
      `
    );

    setModal(true);
  }

  function getData(url, parameters) {
    fetch(url + parameters)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response wasn\'t ok')
        }
        return response.json();
      })
      .then(result => {
        if (result.users) {
          setData(result.users);
        } else {
          throw new Error('No data found');
        }
      })
      .catch(
        (error) => console.log(error.message)
      )
  }

  function ObjectsToArrays(objectsArray) {
    return objectsArray.map(user =>
      [
        user.id,
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
      <Modal visible={modal} setVisible={setModal}>
        <p style={{ whiteSpace: "pre-line" }}>
          {modalContent}
        </p>
      </Modal>
      <h1>Список пользователей</h1>
      <SearchForm setValue={setParameters} selectOptions={selectOptions} />
      {
        tableRows.length
          ?
          <CustomTable tableHeaders={tableHeaders} tableRows={tableRows} headersToSort={headersToSort} onRowClick={onRowClick} />
          :
          <h1>Ничего не найдено!</h1>
      }
    </div>
  );
}

export default App;
