import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import { Form, Icon, Input, Button, Alert, Result, notification } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FormComponentProps } from 'antd/lib/form/Form';
import { AuthContext } from '../../stores/AuthContext';
import useNotLoggedInRedirection from '../../hocs/useNotLoggedInRedirection';
import styles from './ChangePasswordForm.module.scss';

const CHANGE_PASSWORD = gql`
    mutation ChangePassword($album: Int!, $password: String!) {
        changePassword(album: $album, password: $password)
    }
`;

interface ChangePasswordFormProps extends FormComponentProps {
    name?: string;
}

const RegisterForm: React.FC<ChangePasswordFormProps> = ({ form }) => {
    useNotLoggedInRedirection();
    const { getFieldDecorator, validateFields } = form;
    const [changePassword, { data, error }] = useMutation(CHANGE_PASSWORD);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [isRepeatPasswordDirty, setIsRepeatPasswordDirty] = useState(false);
    const { setAuthToken, state: authState } = useContext(AuthContext);

    useEffect(() => {
        if (data) {
            setAuthToken(data.changePassword);
            setTimeout(() => Router.push('/account'), 3000);
            notification.success({
                message: 'Zmieniono hasło',
            });
        }
    }, [data]);

    const handleConfirmBlur = e => {
        const { value } = e.target;
        setIsRepeatPasswordDirty(isRepeatPasswordDirty || !!value);
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('Hasła nie są takie same');
        } else {
            callback();
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        if (value && isRepeatPasswordDirty) {
            form.validateFields(['repeatPassword'], { force: true });
        }
        callback();
    };

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        validateFields((err, values) => {
            if (!err) {
                changePassword({
                    variables: {
                        album: authState.album,
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
                    message="Nieudana zmiana hasła"
                    description={error.message.replace('GraphQL error: ', '')}
                    closable
                    type="error"
                    showIcon
                />
            )}
            {data && (
                <Result
                    title="Zmieniono hasło"
                    subTitle="Pomyślnie zmieniono hasło"
                    status="success"
                    extra={
                        <Button type="primary" onClick={() => Router.push('/account')}>
                            Wróc do Twojego konta
                        </Button>
                    }
                />
            )}
            {!data && (
                <>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Podaj hasło' },
                                {
                                    validator: validateToNextPassword,
                                },
                            ],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Hasło"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('repeatPassword', {
                            rules: [
                                { required: true, message: 'Powtórz hasło' },
                                {
                                    validator: compareToFirstPassword,
                                },
                            ],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Powtórz hasło"
                                onBlur={handleConfirmBlur}
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
                            Zmień hasło
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form>
    );
};

const WrappedChangePasswordForm = Form.create<ChangePasswordFormProps>()(RegisterForm);

export default WrappedChangePasswordForm;
