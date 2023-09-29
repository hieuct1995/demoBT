// import './App.css';
import { useState, useCallback } from 'react';
import { Frame } from '@shopify/polaris';
import { HeaderBar } from '../components/Header';
import { SideBar } from '../components/SideBar';
import { Outlet } from "react-router-dom";

const logo = {
  width: 124,
  topBarSource:
    'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
  url: '#',
  accessibilityLabel: 'Jaded Pixel',
};

function MyLayout({ defaultState }) {

  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleMobileNavigationActive = useCallback(() =>
    setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive,
    ),
    [],
  );


  return (
    <Frame
      logo={logo}
      topBar={
        <HeaderBar
          name={defaultState.name}
          toggleMobileNavigationActive={toggleMobileNavigationActive}
        />
      }
      navigation={
        <SideBar />
      }
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      <Outlet></Outlet>
    </Frame>
  );
}

export default MyLayout;
