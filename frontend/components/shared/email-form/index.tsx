import { Alert, Button, Input, Spin } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import React, { useEffect } from 'react';

export interface EmailFormValues {
    title?: string;
    message?: string;
}

interface EmailFormProps extends FormComponentProps {
    initialValues?: EmailFormValues;
    onSubmit?: (email: EmailFormValues) => void;
    loading?: boolean;
    error?: any;
    data?: any;
}

const EmailForm: React.FC<EmailFormProps> = ({ form, initialValues, onSubmit, data, loading, error }) => {
    const { getFieldDecorator, validateFields } = form;

    const handleSubmit = event => {
        event.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                onSubmit(values);
            }
        });
    };

    useEffect(() => {
        form.resetFields();
    }, [data, initialValues]);

    return (
        <Form onSubmit={handleSubmit}>
            {error && (
                <Alert
                    message="Niepowodzenie wysyłki wiadomości"
                    description={error.message.replace('GraphQL error: ', '')}
                    closable
                    type="error"
                    showIcon
                />
            )}
            {loading && <Spin size="large" />}

            <Form.Item label="Tytuł wiadomości">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Podaj tytuł wiadomości' }],
                    initialValue: initialValues ? initialValues.title : null,
                })(<Input />)}
            </Form.Item>

            <Form.Item label="Treść">
                {getFieldDecorator('message', {
                    rules: [{ required: true, message: 'Podaj treść wiadomości' }],
                    initialValue: initialValues ? initialValues.message : null,
                })(<Input.TextArea />)}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={loading}>
                    Wyślij
                </Button>
            </Form.Item>
        </Form>
    );
};

const WrappedEmailForm = Form.create<EmailFormProps>()(EmailForm);

export default WrappedEmailForm;
