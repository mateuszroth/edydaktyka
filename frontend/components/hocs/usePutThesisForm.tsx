import { Modal } from 'antd';
import gql from 'graphql-tag';
import { useState, useEffect } from 'react';
import ThesisForm from '../pages/diplomas/ThesisForm';
import { useMutation } from 'react-apollo';
import { GET_THESES } from '../pages/diplomas/Diplomas';

const PUT_THESIS = gql`
    mutation PutThesis($input: InputThesis) {
        putThesis(input: $input) {
            id
            type
            title
            year
            graduateId
            graduateName
            consultantId
            consultantName
            usedTechnologies
            goal
            sketch
            link
            isFavourite
        }
    }
`;

const usePutThesisForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [putThesis, { loading, data, error }] = useMutation(PUT_THESIS, {
        refetchQueries: () => [{ query: GET_THESES }]
    });

    const showPutThesisModal = (initialValues, isAdmin = false) => {
        setIsAdmin(isAdmin);
        setInitialValues(initialValues);
        setIsModalVisible(true);
    }

    const hidePutThesisModal = () => {
        setIsAdmin(false);
        setInitialValues(null);
        setIsModalVisible(false);
    }

    const handleSubmit = values => {
        putThesis({ variables: { input: values } });
    }

    useEffect(() => {
        if (data && data.putThesis) {
            hidePutThesisModal();
        }
    }, [data])

    const renderPutThesisForm = (): React.ReactNode => (
        <Modal visible={isModalVisible} title="Praca dyplomowa" footer={[]} onCancel={hidePutThesisModal}>
            <ThesisForm
                isAdmin={isAdmin}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                data={data}
                loading={loading}
                error={error}
            />
        </Modal>
    );

    return { renderPutThesisForm, showPutThesisModal, hidePutThesisModal };
};

export default usePutThesisForm;
