import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import { Form, Button, Alert, Checkbox, Row, Spin, Result } from 'antd';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FormComponentProps } from 'antd/lib/form/Form';
import sortBy from 'lodash/sortBy';
import { AuthContext } from '../../stores/AuthContext';
import useNotLoggedInRedirection from '../../hocs/useNotLoggedInRedirection';
import { getLongGroupName } from '../../../helpers/groups';
import styles from './GroupRegisterForm.module.scss';

const GET_GROUPS = gql`
    {
        groups(isActive: true) {
            id
            modeOfStudy
            fieldOfStudy
            groupNumber
            groupHalf
            courseName
        }
    }
`;

const ASSIGN_USER_TO_GROUPS = gql`
    mutation AssignUserToGroups($groupIds: [Int!]!) {
        assignUserToGroups(groupIds: $groupIds)
    }
`;

interface GroupRegisterFormProps extends FormComponentProps {
    name?: string;
}

const GroupRegisterForm: React.FC<GroupRegisterFormProps> = ({ form }) => {
    useNotLoggedInRedirection();
    const { loading: groupsLoading, error: groupsError, data: groupsData } = useQuery(GET_GROUPS);
    const { getFieldDecorator, validateFields } = form;
    const [assignUserToGroups, { data, error }] = useMutation(ASSIGN_USER_TO_GROUPS);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const { getCurrentUser, state: authState } = useContext(AuthContext);

    useEffect(() => {
        if (data) {
            getCurrentUser();
            setTimeout(() => Router.push('/account'), 3000);
        }
    }, [data]);

    if (groupsLoading || !authState.user) return <Spin tip="Ładowanie..." />;
    if (groupsError) return <Result status="error" title="Wystąpił błąd!" subTitle={groupsError.message} />;

    const userGroupIds =
        (authState.user && authState.user.groups && authState.user.groups.map(group => group.id)) || [];
    const notAssignedGroups =
        groupsData &&
        groupsData.groups &&
        groupsData.groups.map(group => (!userGroupIds.includes(group.id) ? group : null)).filter(exists => !!exists);

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmitDisabled(true);
        validateFields((err, values) => {
            if (!err) {
                const groups = (values.groups || []).map(v => parseInt(v, 10)) || [0];
                assignUserToGroups({
                    variables: {
                        groupIds: groups,
                    },
                });
            }
            return setIsSubmitDisabled(false);
        });
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.root} style={{ margin: '0 auto', maxWidth: 600 }}>
            {error && (
                <Alert
                    message="Nieudana edycja"
                    description={error.message.replace('GraphQL error: ', '')}
                    closable
                    type="error"
                    showIcon
                />
            )}
            {data && (
                <Result
                    status="success"
                    title="Przypisano do grup"
                    subTitle="Pomyślnie przypisano do grup. Zaraz nastąpi przekierowanie do strony Twojego konta."
                />
            )}
            {!data && notAssignedGroups && !!notAssignedGroups.length && (
                <>
                    <Form.Item label="Grupy zajęciowe:">
                        {getFieldDecorator('groups', {
                            rules: [{ required: true, message: 'Wybierz chociaż jedną grupę' }],
                        })(
                            <Checkbox.Group style={{ width: '100%' }}>
                                {sortBy(notAssignedGroups, [
                                    'courseName',
                                    'fieldOfStudy',
                                    'groupNumber',
                                    'groupHalf',
                                ]).map(group => {
                                    return (
                                        <Row key={group.id}>
                                            <Checkbox value={group.id}>{getLongGroupName(group)}</Checkbox>
                                        </Row>
                                    );
                                })}
                            </Checkbox.Group>,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className={styles.formButton}
                            disabled={isSubmitDisabled}
                        >
                            Zapisz się
                        </Button>
                    </Form.Item>
                </>
            )}
            {!data && notAssignedGroups && !notAssignedGroups.length && (
                <Result
                    title="Brak dostępnych grup"
                    subTitle="Nie ma obecnie więcej grup, do których możesz być przypisany."
                    extra={
                        <Button type="primary" onClick={() => Router.push('/account')}>
                            Wróc do Twojego konta
                        </Button>
                    }
                />
            )}
        </Form>
    );
};

const WrappedGroupRegisterForm = Form.create<GroupRegisterFormProps>()(GroupRegisterForm);

export default WrappedGroupRegisterForm;
