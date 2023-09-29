// import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountComponent } from './features/Account';
import { AddressComponent } from './features/Address';
import MyLayout from './layout';

function App() {
  const accountInfoJSON = localStorage.getItem('accountInfo');
  const accountInfo = JSON.parse(accountInfoJSON);
  const [defaultState, setDefaultState] = useState({
    name: accountInfo ? accountInfo.name : 'Nguyễn Văn A',
    email: accountInfo ? accountInfo.email : 'anguyen@bsscomerce.com',
    addresses: accountInfo ? accountInfo.addresses : [{ address: '', city: '' }]
  });


  const handleSubmitForm = (form) => {
    localStorage.setItem('accountInfo', JSON.stringify(
      {
        name: form.name,
        email: form.email,
        addresses: form.addresses
      }
    ));
    setDefaultState({
      name: form.name,
      email: form.email,
      addresses: form.addresses
    });
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MyLayout defaultState={defaultState} />}>
          <Route path='/account' element={<AccountComponent data={defaultState} onSubmitForm={handleSubmitForm} />}></Route>
          <Route path='/address' element={<AddressComponent data={defaultState.addresses} />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
