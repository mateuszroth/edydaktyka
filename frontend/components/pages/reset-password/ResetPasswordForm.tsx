import React, { useEffect, useContext, useState } from 'react';
import { Form, Icon, Input, Button, notification, Alert, Spin } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import { FormComponentProps } from 'antd/lib/form/Form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../stores/AuthContext';
import useLoggedInRedirection from '../../hocs/useLoggedInRedirection';
import styles from './ResetPasswordForm.module.scss';

const RESET_PASSWORD = gql`
    mutation ResetPassword($email: String!) {
        resetPassword(email: $email)
    }
`;

interface ResetPasswordFormProps extends FormComponentProps {
    name?: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ form }) => {
    useLoggedInRedirection();
    const { getFieldDecorator, validateFields } = form;
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [resetPassword, { loading, data, error }] = useMutation(RESET_PASSWORD);

    useEffect(() => {
        if (data) {
            notification.success({
                message: 'Resetowanie hasła',
                description: 'Sprawdź swoją skrzynkę pocztową',
            });
        }
    }, [data]);

    if (loading) return <Spin tip="Weryfikowanie..." />;

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        validateFields((err, values) => {
            if (!err) {
                resetPassword({
                    variables: {
                        email: values.email,
                    },
                });
            }
            return setIsSubmitDisabled(false);
        });
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.root} style={{ margin: '0 auto', maxWidth: 300 }}>
            {data && (
                <Alert
                    message="Resetowanie hasła"
                    description="Jeśli istnieje konto powiązane z danym adresem email, prześlemy na nie Twoje nowe hasło. Sprawdź swoją skrzynkę odbiorczą, a po zalogowaniu do naszego systemu zmień hasło."
                    type="info"
                />
            )}
            {error && (
                <Alert
                    message="Nieudane resetowanie hasła"
                    description={error.message.replace('GraphQL error: ', '')}
                    closable
                    type="error"
                    showIcon
                />
            )}
            {!data && (
                <>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Podaj adres email' }],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Adres email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.formButton}
                            disabled={isSubmitDisabled}
                        >
                            Zresetuj hasło
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form>
    );
};

const WrappedResetPasswordForm = Form.create<ResetPasswordFormProps>()(ResetPasswordForm);

export default WrappedResetPasswordForm;
