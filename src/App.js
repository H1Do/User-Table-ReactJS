import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import CustomTable from './UI/table/CustomTable';

function App() {
  const URL = 'https://dummyjson.com/users'
  const [data, setData] = useState([]);


  function getData(url) {
    fetch(url)
      .then(res => res.json())
      .then(result => {
        setData(result.users);
        console.log(result);
      })
  }

  function toArrayData(objectsArray) {
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

  const tableHeaders = ["ФИО", "Возраст", "Пол", "Номер телефона", "Адрес"]
  const tableRows = toArrayData(data)

  useEffect(() => {
    getData(URL);
  }, []);


  return (
    <div className="App">
      <CustomTable tableHeaders={tableHeaders} tableRows={tableRows} />
    </div>
  );
}

export default App;
