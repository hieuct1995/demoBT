import { Navigation } from '@shopify/polaris';
import {
    ArrowLeftMinor,
    HomeFilledMinor,
    OrdersMajor,
    ConversationMinor,
} from '@shopify/polaris-icons';
import React from 'react';

export function SideBar({toggleIsLoading}) {

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
                            toggleIsLoading('account')
                        },
                    },
                    {
                        label: 'Address',
                        icon: OrdersMajor,
                        onClick: () => {
                            toggleIsLoading('address')
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