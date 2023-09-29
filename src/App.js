// import './App.css';
import { useState, useCallback } from 'react';
import { Frame } from '@shopify/polaris';
import { HeaderBar } from './components/Header';
import { SideBar } from './components/SideBar';
import { AccountComponent } from './features/Account';
import { AddressComponent } from './features/Address';

const logo = {
  width: 124,
  topBarSource:
    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
  url: '#',
  accessibilityLabel: 'Jaded Pixel',
};

function App() {
  const [currentPage, setCurrentPage] = useState('account');
  const accountInfoJSON = localStorage.getItem('accountInfo');
  const accountInfo = JSON.parse(accountInfoJSON);
  const [defaultState, setDefaultState] = useState({
    nameFieldValue: accountInfo ? accountInfo.name : 'Nguyễn Văn A',
    emailFieldValue: accountInfo ? accountInfo.email : 'anguyen@bsscomerce.com',
    address1: accountInfo ? accountInfo.address1 : '',
    city1: accountInfo ? accountInfo.city1 : '',
    address2: accountInfo ? accountInfo.address2 : '',
    city2: accountInfo ? accountInfo.city2 : '',
  });

  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleMobileNavigationActive = useCallback(() =>
    setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive,
    ),
    [],
  );
  const toggleIsLoading = (value) => {
    setCurrentPage(value);
  };
  const handleSubmitForm = (form) => {
    localStorage.setItem('accountInfo', JSON.stringify(
      {
        name: form.name,
        email: form.email,
        address1: form.address1,
        city1: form.city1,
        address2: form.address2,
        city2: form.city2
      }
    ));
    setDefaultState({
      nameFieldValue: form.name,
      emailFieldValue: form.email,
      address1: form.address1,
      city1: form.city1,
      address2: form.address2,
      city2: form.city2
    });
  }

  return (
    <Frame
      logo={logo}
      topBar={
        <HeaderBar
          name={defaultState.nameFieldValue}
          toggleMobileNavigationActive={toggleMobileNavigationActive}
        />
      }
      navigation={
        <SideBar toggleIsLoading={toggleIsLoading} />
      }
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {currentPage === 'account' && <AccountComponent data={defaultState} onSubmitForm={handleSubmitForm} />}
      {currentPage === 'address' && <AddressComponent data={defaultState} />}
    </Frame>
  );
}

export default App;
