import React, { useEffect } from 'react';
import { Form, Select, Button, Input, Spin, Alert } from 'antd';
import styles from './QuestionnaireForm.module.scss';
import { FormComponentProps } from 'antd/lib/form';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

const { Option } = Select;

const ADD_QUESTIONNAIRE = gql`
    mutation AddQuestionnaire($grade: Int!, $speed: Int!, $value: Int!, $comments: String, $groupId: Int) {
        addQuestionnaire(grade: $grade, speed: $speed, value: $value, comments: $comments, groupId: $groupId) {
            id
        }
    }
`;

interface QuestionnaireFormProps extends FormComponentProps {}

const BaseQuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ form }) => {
    const { validateFields, getFieldDecorator, resetFields } = form;
    const [addQuestionnaire, { data, error, loading }] = useMutation(ADD_QUESTIONNAIRE);

    useEffect(() => {
        if (data && data.addQuestionnaire) {
            resetFields();
        }
    }, [data]);

    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                const variables = {
                    grade: parseInt(values.grade, 10),
                    speed: parseInt(values.speed, 10),
                    value: parseInt(values.valueField, 10),
                    groupId: values.groupId ? parseInt(values.groupId, 10) : null,
                    comments: values.comments ? values.comments : null,
                };
                console.log('Przesłano wartości: ', variables);
                addQuestionnaire({ variables });
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.root}>
            {data && (
                <Alert
                    message="Przesłano ankietę"
                    closable
                    type="success"
                    showIcon
                />
            )}
            {error && (
                <Alert
                    message="Niepowodzenie przesłania ankiety"
                    description={error.message.replace('GraphQL error: ', '')}
                    closable
                    type="error"
                    showIcon
                />
            )}
            {loading && <Spin size="large" />}
            <Form.Item label="Wrażenie ogólne">
                {getFieldDecorator('grade', {
                    rules: [{ required: true }],
                })(
                    <Select>
                        <Option value="50">5</Option>
                        <Option value="45">4.5</Option>
                        <Option value="40">4</Option>
                        <Option value="35">3.5</Option>
                        <Option value="30">3</Option>
                        <Option value="20">2</Option>
                    </Select>,
                )}
            </Form.Item>
            <Form.Item label="Tempo powinno być">
                {getFieldDecorator('speed', {
                    rules: [{ required: true }],
                })(
                    <Select>
                        <Option value="-2">zdecydowanie wolniejsze</Option>
                        <Option value="-1">trochę wolniejsze</Option>
                        <Option value="0">jest ok</Option>
                        <Option value="1">trochę szybsze</Option>
                        <Option value="2">zdecydowanie szybsze</Option>
                    </Select>,
                )}
            </Form.Item>
            <Form.Item label="Czy dowiedziałeś się czegoś ważnego?">
                {getFieldDecorator('valueField', {
                    rules: [{ required: true }],
                })(
                    <Select>
                        <Option value="2">zdecydowanie tak</Option>
                        <Option value="1">raczej tak</Option>
                        <Option value="0">trudno powiedzieć</Option>
                        <Option value="-1">raczej nie</Option>
                        <Option value="-2">zdecydowanie nie</Option>
                    </Select>,
                )}
            </Form.Item>
            <Form.Item label="Proszę o sugestie treści i formy wykładów">
                {getFieldDecorator('comments', {
                    rules: [{ required: false }],
                })(<Input.TextArea autosize={{ minRows: 4, maxRows: 16 }} />)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.formButton} disabled={loading}>
                    Prześlij
                </Button>
            </Form.Item>
        </Form>
    );
};

const QuestionnaireForm = Form.create()(BaseQuestionnaireForm);

export default QuestionnaireForm;
