import { Navigation } from '@shopify/polaris';
import {
    ArrowLeftMinor,
    HomeFilledMinor,
    OrdersMajor,
    ConversationMinor,
} from '@shopify/polaris-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function SideBar() {
    const navigate = useNavigate()
    return (
        <Navigation location="/">
            <Navigation.Section
                items={[
                    {
                        label: 'Home',
                        icon: ArrowLeftMinor,
                    },
                ]}
            />
            <Navigation.Section
                separator
                title="Excercise 1"
                items={[
                    {
                        label: 'Account',
                        icon: HomeFilledMinor,
                        onClick: () => {
                            navigate('/account')
                        },
                    },
                    {
                        label: 'Address',
                        icon: OrdersMajor,
                        onClick: () => {
                            navigate('/address')
                        },
                    },
                ]}
                action={{
                    icon: ConversationMinor,
                }}
            />
        </Navigation>
    );
}