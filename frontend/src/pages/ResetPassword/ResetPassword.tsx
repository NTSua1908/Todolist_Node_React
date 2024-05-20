// LoginPage.tsx
import { Form, Input, Spin, notification } from "antd";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "../../helper/InformationValidater";
import { useTheme } from "../../contexts/ThemeContext";
import Logo from "../../images/Logo";
import ResetPasswordModel from "../../models/User/ResetPasswordModel";
import "./resetPassword.css";

interface ResetPasswordFormProps {
  onResetPassword: (values: any) => void;
  loading: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onResetPassword,
  loading,
}) => {
  const onFinish = (values: any) => {
    onResetPassword(values);
  };

  return (
    <Form
      className="reset-password-form"
      name="reset-password"
      onFinish={onFinish}
    >
      <label htmlFor="password">Password</label>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          { validator: validatePassword },
        ]}
        hasFeedback
      >
        <Input.Password name="password" />
      </Form.Item>

      <label htmlFor="confirm">Confirm Password</label>
      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <div className="reset-password-form-function">
          <Link to={"/login"} className="reset-password-form-function-item">
            Back to login
          </Link>
          <Link to={"/register"} className="reset-password-form-function-item">
            Create account
          </Link>
        </div>
        <button className="reset-password-form-submit" type="submit">
          Reset password{" "}
          {loading && <Spin className="reset-password-form-submit-spin" />}
        </button>
      </Form.Item>
    </Form>
  );
};

const ResetPassword: React.FC = () => {
  const { theme } = useTheme();
  const { email } = useParams();
  const { token } = useParams();
  const [isValid, setValid] = useState(
    email && validateEmail(email) && token && token.length > 0
  );

  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationSuccess = (message: string) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "topRight",
    });
  };

  const openNotificationFailure = (message: string) => {
    api.error({
      message: `Notification`,
      description: message,
      placement: "topRight",
      type: "error",
    });
  };

  const handleReset = (values: any) => {
    if (isValid) {
      setLoading(true);
      const resetData: ResetPasswordModel = {
        email: email!,
        token: token!,
        password: values.password,
      };
      // Reset(resetData)
      //     .then((res) => {
      //         openNotificationSuccess("Password reset successful.");
      //         setTimeout(() => {
      //             navigate("/login");
      //         }, 2000);
      //     })
      //     .catch((error: AxiosError) => {
      //         const errors = (error.response?.data as any).errors;
      //         if (errors) {
      //             const errorMessage = errors.join("\n") as string;
      //             openNotificationFailure(errorMessage);
      //         }
      //     })
      //     .finally(() => {
      //         setLoading(false);
      //     });
    }
  };

  return (
    <div className={`reset-password ${theme}`}>
      {contextHolder}
      <div className="reset-password-container">
        {isValid && (
          <>
            <div className="reset-password-logo">
              <Logo />
            </div>
            <h5 className="reset-password-title">Reset password</h5>
            <ResetPasswordForm
              onResetPassword={handleReset}
              loading={loading}
            />
          </>
        )}
        {!isValid && (
          <div className="registerSuccess-invalid">
            Invalid reset password link
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
