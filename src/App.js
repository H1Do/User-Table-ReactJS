import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import CustomTable from './components/UI/table/CustomTable';
import SearchForm from './components/SearchForm';
import Modal from './components/UI/modal/Modal'
import UserService from './API/UserService';
import Loader from './components/UI/loader/Loader';
import { useFetching } from './components/hooks/useFetching';

function App() {
  const [data, setData] = useState([]);
  const [parameters, setParameters] = useState("");
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [fetchUsers, isUsersLoading, usersError] = useFetching(async () => {
    const result = await UserService.getData(URL, parameters);
    setData(result);
  });

  const tableRows = ObjectsToArrays(data);
  const URL = 'https://dummyjson.com/users';
  const headersToSort = ["ФИО", "Возраст", "Пол", "Адрес"];
  const tableHeaders = ["id", "ФИО", "Возраст", "Пол", "Номер телефона", "Адрес"];

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

  function ObjectsToArrays(objectsArray) {
    return (Array.isArray(objectsArray)) ? objectsArray.map(user =>
      [
        user.id,
        user.lastName + ' ' + user.firstName + ' ' + user.maidenName,
        user.age,
        user.gender,
        user.phone,
        user.address.city + ' ' + user.address.address,
      ]
    ) : []
  }

  useEffect(() => {
    fetchUsers();
  }, [parameters]);

  return (
    <div className="App">
      <Modal visible={modal} setVisible={setModal}>
        <p style={{ whiteSpace: "pre-line" }}>
          {modalContent}
        </p>
      </Modal>
      <main className='content'>
        <h1>Список пользователей</h1>
        <SearchForm setValue={setParameters} selectOptions={selectOptions} />
        {
          tableRows.length
            ?
            <CustomTable tableHeaders={tableHeaders} tableRows={tableRows} headersToSort={headersToSort} onRowClick={onRowClick} />
            :
            usersError
              ?
              <>
                <h1>Произошла ошибка</h1>
                <p>{usersError}</p>
              </>
              :
              isUsersLoading
                ?
                <div className='loaderWrapper'>
                  <Loader />
                </div>
                :
                <h1>Ничего не найдено!</h1>
        }
      </main>
    </div>
  );
}

export default App;
