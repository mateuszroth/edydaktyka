import React, { useEffect } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import { Input, Button, Spin, Alert, Checkbox, InputNumber, DatePicker } from 'antd';
import moment from 'moment';

interface FormValues {
    id?: string;
    classNumber?: number;
    takenOn?: Date;
    title?: string;
    isReportRequired?: boolean;
}

interface ClassFormProps extends FormComponentProps {
    initialValues?: FormValues;
    onSubmit?: (group: any) => void;
    loading?: boolean;
    error?: any;
    data?: any;
    largestClassNumber?: number;
}

const ClassForm: React.FC<ClassFormProps> = ({
    form,
    largestClassNumber,
    initialValues,
    onSubmit,
    data,
    loading,
    error,
}) => {
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
                    message="Niepowodzenie dodania zajęć"
                    description={error.message.replace('GraphQL error: ', '')}
                    closable
                    type="error"
                    showIcon
                />
            )}
            {loading && <Spin size="large" />}
            <Form.Item>
                {getFieldDecorator('id', {
                    rules: [],
                    initialValue: initialValues ? initialValues.id : null,
                })(<Input hidden />)}
            </Form.Item>

            <Form.Item label="Numer zajęć">
                {getFieldDecorator('classNumber', {
                    rules: [],
                    initialValue: initialValues ? initialValues.classNumber : largestClassNumber + 1,
                })(<InputNumber min={0} max={30} step={1} />)}
            </Form.Item>

            <Form.Item label="Data zajęć">
                {getFieldDecorator('takenOn', {
                    rules: [],
                    initialValue: initialValues ? moment(initialValues.takenOn) : moment(new Date()),
                })(<DatePicker allowClear={false} />)}
            </Form.Item>

            <Form.Item label="Tytuł zajęć">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Podaj tytuł zajęć' }],
                    initialValue: initialValues ? initialValues.title : null,
                })(<Input />)}
            </Form.Item>

            <Form.Item>
                {getFieldDecorator('isReportRequired', {
                    rules: [],
                    valuePropName: 'checked',
                    initialValue: initialValues ? initialValues.isReportRequired : true,
                })(<Checkbox>Sprawozdania wymagane</Checkbox>)}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={loading}>
                    Zapisz
                </Button>
            </Form.Item>
        </Form>
    );
};

const WrappedClassForm = Form.create<ClassFormProps>()(ClassForm);

export default WrappedClassForm;
