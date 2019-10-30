import React from "react";
import { Form, Icon, Input, Button, notification } from "antd";
import Router from "next/router";
import Link from "next/link";
import { AuthConsumer } from "../../stores/AuthContext";
import styles from "./LoginForm.module.scss";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Przesłano wartości: ", values);
      }
    });
  };

  handleLogIn = handler => {
    handler({ id: 117328, name: "Mateusz", surname: "Roth" });
    Router.push("/account");
    notification.success({
      message: `Witaj Mateusz`,
      description: "Pomyślnie zalogowano"
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <AuthConsumer>
        {({ logIn }) => (
          <Form onSubmit={this.handleSubmit} className={styles.root}>
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "Podaj numer albumu" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Numer albumu"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Podaj hasło" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Hasło"
                />
              )}
            </Form.Item>
            <Form.Item>
              {/* TODO 
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Zapamiętaj mnie</Checkbox>
              )}
              <a className={styles.formForgot} href="/forgotpassword">Przypomnij hasło</a> */}
              <Button
                type="primary"
                htmlType="submit"
                className={styles.formButton}
                onClick={() => this.handleLogIn(logIn)}
              >
                Zaloguj się
              </Button>
              lub{" "}
              <Link href="/register">
                <a>zarejestruj się!</a>
              </Link>
            </Form.Item>
          </Form>
        )}
      </AuthConsumer>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "login" })(NormalLoginForm);

export default WrappedNormalLoginForm;
