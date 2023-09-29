import {
    Card,
    Layout,
    Page,
    VerticalStack,
    Text,
    Divider
} from '@shopify/polaris';
import { Fragment } from 'react';

export function AddressComponent({ data }) {
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
                            {data.length > 0 &&
                                data.map((data, index) => (
                                    <Fragment key={index}>
                                        <Divider />
                                        <div style={{ display: 'flex', padding: '0 0.5rem' }}>
                                            <div style={{ flexBasis: '50%' }}>
                                                <Text variant="headingXs" >
                                                    {data.address}
                                                </Text>
                                            </div>
                                            <div style={{ flexBasis: '50%' }}>
                                                <Text variant="headingXs">
                                                    {data.city}
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

