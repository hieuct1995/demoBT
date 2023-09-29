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

    const nameField = useField({
        value: data.name,
        validates: [notEmpty('Name is required')],
    });

    const emailField = useField({
        value: data.email,
        validates: [
            notEmpty('Email is required'),
            (value) => {
                if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                    return 'Email không hợp lệ';
                }
            },
        ],
    });

    const emptyNewAddress = () => ({
        address: '',
        city: '',
    });
    const { fields: addresses, addItem } = useDynamicList(data.addresses, emptyNewAddress);

    const { fields, submit, submitting } =
        useForm({
            fields: {
                name: nameField,
                email: emailField,
            },

            onSubmit: async (form) => {
                const formData = {
                    name: form.name,
                    email: form.email,
                    addresses: addresses.map(address => ({
                        address: address.address.value,
                        city: address.city.value
                    }))
                };
                onSubmitForm(formData)
                return { status: 'true'};
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
                                {addresses.map((address, index) => (
                                    <FormLayout key={index}>
                                        <TextField
                                            label={`Address(${index + 1})`}
                                            {...address.address}
                                            placeholder='your address'
                                        />
                                        <TextField
                                            label="City"
                                            {...address.city}
                                            placeholder='your city'
                                        />
                                    </FormLayout>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5rem' }}>
                                    <Button onClick={() => addItem()}>New Address</Button>
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

