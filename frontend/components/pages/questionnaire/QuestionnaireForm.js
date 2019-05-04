import React from 'react'
import { Form, Select, Button, Input } from 'antd'
import styles from './QuestionnaireForm.module.scss'

const { Option } = Select

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Przesłano wartości: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.root}>
        <Form.Item label="Wrażenie ogólne">
          <Select
            value="5"
            onChange={() => null}
          >
            <Option value="5">5</Option>
            <Option value="4.5">4.5</Option>
            <Option value="4">4</Option>
            <Option value="3.5">3.5</Option>
            <Option value="3">3</Option>
            <Option value="2">2</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tempo powinno być">
          <Select
            value="jest ok"
            onChange={() => null}
          >
            <Option value="zdecydowanie wolniejsze">zdecydowanie wolniejsze</Option>
            <Option value="trochę wolniejsze">trochę wolniejsze</Option>
            <Option value="jest ok">jest ok</Option>
            <Option value="trochę szybsze">trochę szybsze</Option>
            <Option value="zdecydowanie szybsze">zdecydowanie szybsze</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Czy dowiedziałeś się czegoś ważnego?">
          <Select
            value="zdecydowanie tak"
            onChange={() => null}
          >
            <Option value="zdecydowanie tak">zdecydowanie tak</Option>
            <Option value="raczej tak">raczej tak</Option>
            <Option value="trudno powiedzieć">trudno powiedzieć</Option>
            <Option value="raczej nie">raczej nie</Option>
            <Option value="zdecydowanie nie">zdecydowanie nie</Option>
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
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'questionnaire' })(NormalLoginForm);

export default WrappedNormalLoginForm;