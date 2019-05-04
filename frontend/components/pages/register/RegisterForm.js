import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from './RegisterForm.module.scss'

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
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Podaj numer albumu' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Numer albumu" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Podaj imię' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Imię" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('surname', {
            rules: [{ required: true, message: 'Podaj nazwisko' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nazwisko" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Podaj email' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Podaj hasło' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Hasło" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('repeatPassword', {
            rules: [{ required: true, message: 'Powtórz hasło' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Powtórz hasło" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.formButton}>
            Zarejestruj się
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'register' })(NormalLoginForm);

export default WrappedNormalLoginForm;