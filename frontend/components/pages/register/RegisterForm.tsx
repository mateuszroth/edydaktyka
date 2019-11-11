import React, { useState, useContext, useEffect } from "react";
import Router from "next/router";
import {
  Form,
  Icon,
  Input,
  Button,
  Alert,
  Checkbox,
  Row,
  Spin,
  Result,
  notification
} from "antd";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FormComponentProps } from "antd/lib/form/Form";
import sortBy from "lodash/sortBy";
import { AuthContext } from "../../stores/AuthContext";
import useLoggedInRedirection from "../../hocs/useLoggedInRedirection";
import { getLongGroupName } from "../../../helpers/groups";
import styles from "./RegisterForm.module.scss";

const GET_GROUPS = gql`
  {
    groups(isActive: true) {
      id
      modeOfStudy
      fieldOfStudy
      groupNumber
      groupHalf
      courseName
    }
  }
`;

const REGISTER = gql`
  mutation Register(
    $album: Int!
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
    $groupIds: [Int!]!
  ) {
    register(
      album: $album
      firstName: $firstName
      lastName: $lastName
      password: $password
      email: $email
      groupIds: $groupIds
    )
  }
`;

interface RegisterFormProps extends FormComponentProps {
  name: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ form }) => {
  useLoggedInRedirection();
  const {
    loading: groupsLoading,
    error: groupsError,
    data: groupsData
  } = useQuery(GET_GROUPS);
  const { getFieldDecorator, validateFields } = form;
  const [register, { data, error }] = useMutation(REGISTER);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isRepeatPasswordDirty, setIsRepeatPasswordDirty] = useState(false);
  const { setAuthToken, state: authState } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      setAuthToken(data.register);
      Router.push("/account");
      notification.success({
        message: `Witaj ${
          authState && authState.user ? authState.user.firstName : ""
        }`,
        description: "Pomyślnie zalogowano"
      });
    }
  }, [data]);

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setIsRepeatPasswordDirty(isRepeatPasswordDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Hasła nie są takie same");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && isRepeatPasswordDirty) {
      form.validateFields(["repeatPassword"], { force: true });
    }
    callback();
  };

  if (groupsLoading) return <Spin tip="Ładowanie..." />;
  if (groupsError)
    return (
      <Result
        status="error"
        title="Wystąpił błąd!"
        subTitle={groupsError.message}
      />
    );

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    validateFields((err, values) => {
      if (!err) {
        register({
          variables: {
            album: parseInt(values.userName, 10),
            firstName: values.name,
            lastName: values.surname,
            password: values.password,
            email: values.email,
            groupIds: (values.groups || []).map(v => parseInt(v, 10)) || [0]
          }
        });
      }
      return setIsSubmitDisabled(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.root} style={{ margin: "0 auto", maxWidth: 600 }}>
      {error && (
        <Alert
          message="Nieudana rejestracja"
          description={error.message.replace("GraphQL error: ", "")}
          closable
          type="error"
          showIcon
        />
      )}
      <Form.Item>
        {getFieldDecorator("userName", {
          rules: [{ required: true, message: "Podaj numer albumu" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="number"
            placeholder="Numer albumu"
            min={100}
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Podaj imię" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Imię"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("surname", {
          rules: [{ required: true, message: "Podaj nazwisko" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Nazwisko"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("email", {
          rules: [{ required: true, message: "Podaj email" }]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="email"
            placeholder="Email"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [
            { required: true, message: "Podaj hasło" },
            {
              validator: validateToNextPassword
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Hasło"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("repeatPassword", {
          rules: [
            { required: true, message: "Powtórz hasło" },
            {
              validator: compareToFirstPassword
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Powtórz hasło"
            onBlur={handleConfirmBlur}
          />
        )}
      </Form.Item>
      {groupsData && groupsData.groups && (
        <Form.Item label="Grupy zajęciowe:">
          {getFieldDecorator("groups", {
            rules: [{ required: true, message: "Wybierz chociaż jedną grupę" }]
          })(
            <Checkbox.Group style={{ width: "100%" }}>
              {sortBy(groupsData.groups, [
                "courseName",
                "fieldOfStudy",
                "groupNumber",
                "groupHalf"
              ]).map(group => {
                return (
                  <Row key={group.id}>
                    <Checkbox value={group.id}>
                      {getLongGroupName(group)}
                    </Checkbox>
                  </Row>
                );
              })}
            </Checkbox.Group>
          )}
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.formButton}
          disabled={isSubmitDisabled}
        >
          Zarejestruj się
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedRegisterForm = Form.create<RegisterFormProps>()(RegisterForm);

export default WrappedRegisterForm;
