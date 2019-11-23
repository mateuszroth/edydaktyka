import React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form/Form';

interface FormValues {
    name?: string;
}

interface ClassFormProps extends FormComponentProps {
    initialValues?: FormValues;
    handleSubmit: () => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ initialValues, handleSubmit }) => {
    return <Form>Hi!</Form>;
};

const WrappedClassForm = Form.create<ClassFormProps>()(ClassForm);

export default WrappedClassForm;
