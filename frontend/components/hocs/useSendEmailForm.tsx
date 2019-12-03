import { Modal, notification } from 'antd';
import gql from 'graphql-tag';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import WrappedEmailForm, { EmailFormValues } from '../shared/email-form';

type SendEmailTo = 'user' | 'group';

const SEND_USER_EMAIL = gql`
    mutation SendUserEmail($id: Int!, $message: String!, $title: String) {
        sendUserEmail(id: $id, message: $message, title: $title)
    }
`;

const SEND_GROUP_EMAIL = gql`
    mutation SendGroupEmail($id: Int!, $message: String!, $title: String) {
        sendGroupEmail(id: $id, message: $message, title: $title)
    }
`;

const useSendEmailForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [emailTitle, setEmailTitle] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [id, setId] = useState(null);
    const [sendEmailTo, setSendEmailTo] = useState(null);
    const [sendUserEmail, { data, error, loading }] = useMutation(SEND_USER_EMAIL);
    const [sendGroupEmail, { data: groupData, error: groupError, loading: groupLoading }] = useMutation(
        SEND_GROUP_EMAIL,
    );

    useEffect(() => {
        if (data || groupData) {
            const msg = (data && data.sendUserEmail) || (groupData && groupData.sendGroupEmail)
            notification.success({
                message: msg,
            });
            hideModal();
        }
    }, [data, groupData]);

    const showEmailModal = (id: number, sendEmailTo: SendEmailTo = 'user', emailTitle?: string, emailMessage?: string) => {
        setId(id);
        setSendEmailTo(sendEmailTo);
        if (emailTitle) {
            setEmailTitle(emailTitle);
        }
        if (emailMessage) {
            setEmailMessage(emailMessage);
        }
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setId(null);
        setSendEmailTo(null);
        setEmailTitle('');
        setEmailMessage('');
    };

    const handleFormSubmit = (email: EmailFormValues) => {
        setEmailMessage(email.message);
        if (sendEmailTo === 'user') {
            sendUserEmail({ variables: { id, title: email.title, message: email.message } });
        } else {
            sendGroupEmail({ variables: { id, title: email.title, message: email.message } });
        }
    };

    const renderEmailModal = (): React.ReactNode => (
        <Modal visible={isModalVisible} title="Wyślij wiadomość email" footer={[]} onCancel={hideModal}>
            <WrappedEmailForm
                initialValues={{ title: emailTitle, message: emailMessage }}
                onSubmit={handleFormSubmit}
                data={data || groupData}
                loading={loading || groupLoading}
                error={error || groupError}
            />
        </Modal>
    );

    return { renderEmailModal, showEmailModal, hideEmailModal: hideModal };
};

export default useSendEmailForm;
