import React, { useEffect, useContext, useState } from 'react';
import { Form, Icon, Input, Button, notification, Alert, Spin } from 'antd';
import noop from 'lodash/noop';
import Router from 'next/router';
import Link from 'next/link';
import { FormComponentProps } from 'antd/lib/form/Form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../stores/AuthContext';
import styles from './LoginForm.module.scss';

const LOGIN = gql`
    mutation Login($album: Int!, $password: String!) {
        login(album: $album, password: $password)
    }
`;

interface LoginFormProps extends FormComponentProps {
    name: string;
    onRedirect?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ form, onRedirect = noop }) => {
    const { getFieldDecorator, validateFields } = form;
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [login, { loading, data, error }] = useMutation(LOGIN);
    const { setAuthToken, state: authState } = useContext(AuthContext);

    useEffect(() => {
        if (data) {
            setAuthToken(data.login);
            Router.push('/reports');
            onRedirect();
            notification.success({
                message: `Witaj ${authState && authState.user ? authState.user.firstName : ''}`,
                description: 'Pomyślnie zalogowano',
            });
        }
    }, [data]);

    if (loading || data) return <Spin tip="Logowanie..." />;

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        validateFields((err, values) => {
            if (!err) {
                login({
                    variables: {
                        album: parseInt(values.userName, 10),
                        password: values.password,
                    },
                });
            }
            return setIsSubmitDisabled(false);
        });
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.root} style={{ margin: '0 auto', maxWidth: 300 }}>
            {error && (
                <Alert
                    message="Nieudane logowanie"
                    description={error.message.replace('GraphQL error: ', '')}
                    closable
                    type="error"
                    showIcon
                />
            )}
            <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Podaj numer albumu' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Numer albumu"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Podaj hasło' }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Hasło"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.formButton} disabled={isSubmitDisabled}>
                    Zaloguj się
                </Button>
                <Link href="/reset-password">
                    <a onClick={onRedirect} className={styles.formForgot}>
                        Przypomnij hasło
                    </a>
                </Link>{' '}
                lub{' '}
                <Link href="/register">
                    <a onClick={onRedirect}>zarejestruj się!</a>
                </Link>
            </Form.Item>
        </Form>
    );
};

const WrappedLoginForm = Form.create<LoginFormProps>()(LoginForm);

export default WrappedLoginForm;
