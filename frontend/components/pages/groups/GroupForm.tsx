import React, { useEffect } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form/Form';
import { AutoComplete, Radio, Select, Input, Button, Spin, Alert, Checkbox } from 'antd';

interface FormValues {
    id?: string;
    courseName?: string;
    fieldOfStudy?: string;
    modeOfStudy?: string;
    groupNumber?: string;
    groupHalf?: string;
    link?: string;
    description?: string;
    isActive?: boolean;
}

interface GroupFormsProps extends FormComponentProps {
    initialValues?: FormValues;
    onSubmit?: (group: any) => void;
    loading?: boolean;
    error?: any;
    data?: any;
}

const GroupForm: React.FC<GroupFormsProps> = ({ form, initialValues, onSubmit, data, loading, error }) => {
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
                    message="Niepowodzenie dodania grupy"
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

            <Form.Item label="Nazwa kursu">
                {getFieldDecorator('courseName', {
                    rules: [{ required: true, message: 'Podaj nazwę kursu' }],
                    initialValue: initialValues ? initialValues.courseName : null,
                })(
                    <AutoComplete
                        placeholder="Nazwa kursu"
                        dataSource={[
                            'Organizacja Usług Komercyjnych w Internecie',
                            'Bogate Aplikacje Internetowe',
                            'Programowanie wizualne',
                            'Algorytmy i struktury danych',
                            'Programowanie niskopoziomowe',
                            'Podstawy programowania',
                            'Programowanie obiektowe',
                        ]}
                    />,
                )}
            </Form.Item>

            <Form.Item label="Tryb studiów">
                {getFieldDecorator('modeOfStudy', {
                    rules: [{ required: true, message: 'Podaj tryb studiów' }],
                    initialValue: initialValues ? initialValues.modeOfStudy : null,
                })(
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="NST">niestacjonarne</Radio.Button>
                        <Radio.Button value="ST">stacjonarne</Radio.Button>
                    </Radio.Group>,
                )}
            </Form.Item>

            <Form.Item label="Kierunek lub specjalność">
                {getFieldDecorator('fieldOfStudy', {
                    rules: [{ required: true, message: 'Podaj kierunek lub specjalność' }],
                    initialValue: initialValues ? initialValues.fieldOfStudy : null,
                })(
                    <AutoComplete
                        placeholder="Kierunek lub specjalność"
                        dataSource={['Informatyka', 'Teleinformatyka', 'Zaawansowane Technologie Internetowe']}
                    />,
                )}
            </Form.Item>

            <Form.Item label="Grupa">
                {getFieldDecorator('groupNumber', {
                    rules: [],
                    initialValue: initialValues ? initialValues.groupNumber : '',
                })(
                    <Select placeholder="Wybierz grupę">
                        <Select.Option value="">-</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
                        <Select.Option value="4">4</Select.Option>
                        <Select.Option value="5">5</Select.Option>
                        <Select.Option value="6">6</Select.Option>
                        <Select.Option value="7">7</Select.Option>
                        <Select.Option value="8">8</Select.Option>
                        <Select.Option value="9">9</Select.Option>
                        <Select.Option value="10">10</Select.Option>
                    </Select>,
                )}
            </Form.Item>

            <Form.Item label="Podgrupa">
                {getFieldDecorator('groupHalf', {
                    rules: [],
                    initialValue: initialValues ? initialValues.groupHalf : '',
                })(
                    <Select placeholder="Wybierz podgrupę">
                        <Select.Option value="">-</Select.Option>
                        <Select.Option value="a">a</Select.Option>
                        <Select.Option value="b">b</Select.Option>
                        <Select.Option value="c">c</Select.Option>
                        <Select.Option value="d">d</Select.Option>
                    </Select>,
                )}
            </Form.Item>

            <Form.Item label="Link">
                {getFieldDecorator('link', {
                    rules: [],
                    initialValue: initialValues ? initialValues.link : null,
                })(<Input placeholder="Link" />)}
            </Form.Item>

            <Form.Item label="Opis kursu">
                {getFieldDecorator('description', {
                    rules: [],
                    initialValue: initialValues ? initialValues.description : null,
                })(<Input.TextArea placeholder="Opis kursu" />)}
            </Form.Item>

            <Form.Item>
                {getFieldDecorator('isActive', {
                    rules: [],
                    valuePropName: 'checked',
                    initialValue: initialValues ? initialValues.isActive : true,
                })(<Checkbox>Aktywuj grupę</Checkbox>)}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={loading}>
                    Zapisz
                </Button>
            </Form.Item>
        </Form>
    );
};

const WrappedGroupForm = Form.create<GroupFormsProps>()(GroupForm);

export default WrappedGroupForm;
