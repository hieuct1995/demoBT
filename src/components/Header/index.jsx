import { TopBar, ActionList, Avatar } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import './style.css'

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function convertName(name) {
        let arr = name.split(' ')
        let nameConvert = arr[0];
        if (arr.length > 1) {
            nameConvert = `${removeDiacritics(arr[arr.length - 1])}.${removeDiacritics(arr[0])}`
        }
        return nameConvert;
}

function CustomUserMenu({ name, detail, avatarSrc, open, onToggle }) {
    return (
        <TopBar.UserMenu
            customActivator={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        source={avatarSrc}
                        accessibilityLabel="User Avatar"
                        size="medium"
                        name={name}
                    />
                    <div className='info'>
                        <div style={{ fontWeight: 'bold', textAlign: 'left' }}>{name}</div>
                        <div className='info-detail'>{detail}</div>
                    </div>
                </div>
            }
        />
    );
}

export function HeaderBar({ name, toggleMobileNavigationActive }) {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchResultsDismiss = useCallback(() => {
        setIsSearchActive(false);
        setSearchValue('');
    }, []);

    const handleSearchChange = useCallback((value) => {
        setSearchValue(value);
        setIsSearchActive(value.length > 0);
    }, []);

    const userMenuMarkup = (
        <CustomUserMenu
            name={convertName(name)}
            detail={name}
        />
    );

    const searchResultsMarkup = (
        <ActionList
            items={[{ content: 'Shopify help center' }, { content: 'Community forums' }]}
        />
    );

    const searchFieldMarkup = (
        <TopBar.SearchField
            onChange={handleSearchChange}
            value={searchValue}
            placeholder="Search"
            showFocusBorder
        />
    );

    return (
        <div style={{ height: '56px' }}>
            <TopBar
                showNavigationToggle
                userMenu={userMenuMarkup}
                searchResultsVisible={isSearchActive}
                searchField={searchFieldMarkup}
                searchResults={searchResultsMarkup}
                onSearchResultsDismiss={handleSearchResultsDismiss}
                onNavigationToggle={toggleMobileNavigationActive}
            />
        </div>
    );
}