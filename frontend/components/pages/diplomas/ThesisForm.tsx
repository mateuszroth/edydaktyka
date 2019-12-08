import React, { useEffect } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import { Input, Button, Spin, Alert, Checkbox, InputNumber, Select } from 'antd';

interface FormValues {
    id?: string;
    type?: string;
    year?: number;
    graduateName?: string;
    graduateId?: number;
    consultantName?: string;
    consultantId?: number;
    title?: string;
    usedTechnologies?: string;
    goal?: string;
    sketch?: string;
    link?: string;
    isFavourite?: boolean;
}

interface ThesisFormProps extends FormComponentProps {
    initialValues?: FormValues;
    onSubmit?: (thesis: any) => void;
    loading?: boolean;
    error?: any;
    data?: any;
    isAdmin?: boolean;
}

const BaseThesisForm: React.FC<ThesisFormProps> = ({
    form,
    isAdmin = false,
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
                    message="Niepowodzenie zmiany pracy dyplomowej"
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

            <Form.Item label="Tytuł tematu">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Podaj tytuł zajęć' }],
                    initialValue: initialValues ? initialValues.title : null,
                })(<Input />)}
            </Form.Item>

            <Form.Item label="Rodzaj tematu lub pracy" style={{ display: isAdmin ? 'block' : 'none' }}>
                {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'Podaj rodzaj' }],
                    initialValue: initialValues ? initialValues.type : 'zgłoszona',
                })(
                    <Select>
                        <Select.Option value="obroniona">praca obroniona</Select.Option>
                        <Select.Option value="realizowany">praca realizowana przez studenta</Select.Option>
                        <Select.Option value="pomyślany">temat pracy do realizacji</Select.Option>
                        <Select.Option value="zgłoszona">temat zgłoszony przez studenta</Select.Option>
                    </Select>,
                )}
            </Form.Item>

            <Form.Item label="Rok" style={{ display: isAdmin ? 'block' : 'none' }}>
                {getFieldDecorator('year', {
                    rules: [],
                    initialValue: initialValues ? initialValues.year : new Date().getFullYear(),
                })(<InputNumber min={1950} max={9999} />)}
            </Form.Item>

            <Form.Item label="Cel pracy">
                {getFieldDecorator('goal', {
                    rules: [{ required: false }],
                    initialValue: initialValues ? initialValues.goal : null,
                })(<Input.TextArea />)}
            </Form.Item>

            <Form.Item label="Szkic">
                {getFieldDecorator('sketch', {
                    rules: [{ required: false }],
                    initialValue: initialValues ? initialValues.sketch : null,
                })(<Input.TextArea />)}
            </Form.Item>

            <Form.Item label="Użyte technologie">
                {getFieldDecorator('usedTechnologies', {
                    rules: [{ required: false }],
                    initialValue: initialValues ? initialValues.usedTechnologies : null,
                })(<Input.TextArea />)}
            </Form.Item>

            <Form.Item label="Linki">
                {getFieldDecorator('link', {
                    rules: [{ required: false }],
                    initialValue: initialValues ? initialValues.link : null,
                })(<Input.TextArea />)}
            </Form.Item>

            <Form.Item style={{ display: isAdmin ? 'block' : 'none' }}>
                {getFieldDecorator('isFavourite', {
                    rules: [],
                    valuePropName: 'checked',
                    initialValue: initialValues ? initialValues.isFavourite : false,
                })(<Checkbox>Czy praca należy do najciekawszych?</Checkbox>)}
            </Form.Item>

            <Form.Item label="Imię i nazwisko studenta" style={{ display: isAdmin ? 'block' : 'none' }}>
                {getFieldDecorator('graduateName', {
                    rules: [],
                    initialValue: initialValues ? initialValues.graduateName : null,
                })(<Input placeholder="Imię i nazwisko" />)}
            </Form.Item>

            <Form.Item label="Numer indeksu studenta" style={{ display: isAdmin ? 'block' : 'none' }}>
                {getFieldDecorator('graduateId', {
                    rules: [],
                    initialValue: initialValues ? initialValues.graduateId : null,
                })(<InputNumber min={1} max={999999} />)}
            </Form.Item>

            <Form.Item label="Imię i nazwisko konsultanta" style={{ display: isAdmin ? 'block' : 'none' }}>
                {getFieldDecorator('consultantName', {
                    rules: [],
                    initialValue: initialValues ? initialValues.consultantName : null,
                })(<Input placeholder="Imię i nazwisko" />)}
            </Form.Item>

            <Form.Item label="Numer indeksu konsultanta" style={{ display: isAdmin ? 'block' : 'none' }}>
                {getFieldDecorator('consultantId', {
                    rules: [],
                    initialValue: initialValues ? initialValues.consultantId : null,
                })(<InputNumber min={1} max={999999} />)}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={loading}>
                    Zapisz
                </Button>
            </Form.Item>
        </Form>
    );
};

const ThesisForm = Form.create<ThesisFormProps>()(BaseThesisForm);

export default ThesisForm;
