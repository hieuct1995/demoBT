import {
    LegacyCard,
    Form,
    FormLayout,
    Layout,
    Page,
    TextField,
    Button,
} from '@shopify/polaris';
import { useField, useForm, notEmpty, useDynamicList } from '@shopify/react-form';

export function AccountComponent({ data, onSubmitForm }) {

    // const emptyAddressFactory = ({ address, city }) => ({
    //     address: address,
    //     city: city
    // });
    // const customerAddress =
    //     useDynamicList([], emptyAddressFactory);
    const nameField = useField({
        value: data.nameFieldValue,
        validates: [notEmpty('Name is required')],
    });

    const emailField = useField({
        value: data.emailFieldValue,
        validates: [
            notEmpty('Email is required'),
            (value) => {
                if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                    return 'Email không hợp lệ';
                }
            },
        ],
    });

    const { fields, submit, submitting } =
        useForm({
            fields: {
                name: nameField,
                email: emailField,
                // address1: useField(data.address1),
                // city1: useField(data.city1),
                // address2: useField(data.address2),
                // city2: useField(data.city2),

            },
            // dynamicLists: {
            //     customerAddress,
            //   },
            onSubmit: async (form) => {
                onSubmitForm(form)
                return { status: 'fail', errors: [{ message: 'bad form data' }] };
            },
        });

    return (
        <Page title="Account">
            <Layout>
                <Layout.AnnotatedSection
                    title="Account details"
                    description="Jaded Pixel will use this as your account information."
                >
                    <Form onSubmit={submit}>
                        <LegacyCard sectioned>
                            <FormLayout>
                                <TextField
                                    label="Full name"
                                    {...fields.name}
                                />
                                <TextField
                                    type='email'
                                    label="Email"
                                    {...fields.email}
                                />
                            </FormLayout>
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <FormLayout>
                                <TextField
                                    label="Address(1)"
                                    {...fields.address1}
                                    placeholder='your adress'
                                />
                                <TextField
                                    label="City"
                                    {...fields.city1}
                                    placeholder='your city'
                                />
                                <TextField
                                    label="Address(2)"
                                    {...fields.address2}
                                    placeholder='your adress'
                                />
                                <TextField
                                    label="City"
                                    {...fields.city2}
                                    placeholder='your city'
                                />
                                <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                                    <Button>New Address</Button>
                                    <Button
                                        submit
                                        primary
                                        disabled={submitting}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </FormLayout>
                        </LegacyCard>
                    </Form>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    )
}

