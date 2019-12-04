import React from 'react';
import { Form, Select, Button, Input } from 'antd';
import styles from './QuestionnaireForm.module.scss';
import { FormComponentProps } from 'antd/lib/form';
import gql from 'graphql-tag';

const { Option } = Select;

const ADD_QUESTIONNAIRE = gql`
    mutation AddQuestionnaire($grade: Int!, $speed: Int!, $value: Int!, $comments: String, $groupId: Int) {
        addQuestionnaire(grade: $grade, speed: $speed, value: $value, comments: $comments, groupId: $groupId)
    }
`;

interface QuestionnaireFormProps extends FormComponentProps {}

const BaseQuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ form }) => {
    const { validateFields, getFieldDecorator } = form;

    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                console.log('Przesłano wartości: ', values);
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.root}>
            <Form.Item label="Wrażenie ogólne">
                <Select value="5" onChange={() => null}>
                    <Option value="5">5</Option>
                    <Option value="4.5">4.5</Option>
                    <Option value="4">4</Option>
                    <Option value="3.5">3.5</Option>
                    <Option value="3">3</Option>
                    <Option value="2">2</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Tempo powinno być">
                <Select value="0" onChange={() => null}>
                    <Option value="-2">zdecydowanie wolniejsze</Option>
                    <Option value="-1">trochę wolniejsze</Option>
                    <Option value="0">jest ok</Option>
                    <Option value="1">trochę szybsze</Option>
                    <Option value="2">zdecydowanie szybsze</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Czy dowiedziałeś się czegoś ważnego?">
                <Select value="0" onChange={() => null}>
                    <Option value="2">zdecydowanie tak</Option>
                    <Option value="1">raczej tak</Option>
                    <Option value="0">trudno powiedzieć</Option>
                    <Option value="-1">raczej nie</Option>
                    <Option value="-2">zdecydowanie nie</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Proszę o sugestie treści i formy wykładów">
                <Input.TextArea autosize={{ minRows: 4, maxRows: 16 }} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className={styles.formButton}>
                    Prześlij
                </Button>
            </Form.Item>
        </Form>
    );
};

const QuestionnaireForm = Form.create()(BaseQuestionnaireForm);

export default QuestionnaireForm;
