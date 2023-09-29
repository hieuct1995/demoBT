import {
    Card,
    Layout,
    Page,
    VerticalStack,
    Text,
    Divider
} from '@shopify/polaris';
import { useState, useEffect, Fragment } from 'react';

export function AddressComponent({ data }) {
    const [address, setAddress] = useState([])
    useEffect(() => {
        let dataAddress = [
            { address1: data.address1, city1: data.city1 },
            { address2: data.address2, city2: data.city2 },
        ];
        setAddress(dataAddress)
    }, [data]);
    return (
        <Page title="My Address">
            <Layout>
                <Layout.AnnotatedSection
                    title="Address detail"
                    description="You can click account menu to edit address."
                >
                    <Card>
                        <VerticalStack gap="300">
                            <div style={{ display: 'flex', padding: '0 0.5rem' }}>
                                <div style={{ flexBasis: '50%' }}>
                                    <Text variant="headingXs" >
                                        Address
                                    </Text>
                                </div>
                                <div style={{ flexBasis: '50%' }}>
                                    <Text variant="headingXs">
                                        City
                                    </Text>
                                </div>
                            </div>
                            {address.length > 0 &&
                                address.map((data, index) => (
                                    <Fragment key={index}>
                                        <Divider />
                                        <div style={{ display: 'flex', padding: '0 0.5rem' }}>
                                            <div style={{ flexBasis: '50%' }}>
                                                <Text variant="headingXs" >
                                                    {data[`address${index + 1}`]}
                                                </Text>
                                            </div>
                                            <div style={{ flexBasis: '50%' }}>
                                                <Text variant="headingXs">
                                                    {data[`city${index + 1}`]}
                                                </Text>
                                            </div>
                                        </div>
                                    </Fragment>
                                ))
                            }
                        </VerticalStack>
                    </Card>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}

