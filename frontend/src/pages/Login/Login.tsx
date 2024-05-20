import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import Logo from "../../images/Logo";
import "./login.css";

interface LoginFormProps {
  onLogin: (values: any) => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, isLoading }) => {
  const onFinish = (values: any) => {
    onLogin(values);
  };

  return (
    <Form className="login-form" name="login" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
        hasFeedback
      >
        <Input
          className="login-form-input"
          prefix={<UserOutlined />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          className="login-form-input"
          prefix={<LockOutlined />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <div className="login-form-function">
          <Link to={"/forgotPassword"} className="login-form-function-item">
            Forgot password?
          </Link>
          <Link to={"/register"} className="login-form-function-item">
            Create account
          </Link>
        </div>
        <button className="login-form-submit" type="submit">
          Login
        </button>
      </Form.Item>
    </Form>
  );
};

const Login: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const isAuthenticated = localStorage.getItem("token") !== null;
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const handleLogin = (values: any) => {
    if (!isLoading) {
      // dispatch(loginStart());
      // HandleLogin({ email: values.email, password: values.password })
      //     .then((res: any) => {
      //         localStorage.setItem("token", res.data.token.access_token);
      //         openNotificationSuccess();
      //         dispatch(loginSuccess());
      //         dispatch(removePost());
      //         setTimeout(() => {
      //             if (state && state.returnPath) {
      //                 navigate(state.returnPath, {
      //                     state: { isReload: true },
      //                 });
      //             } else {
      //                 navigate("/");
      //             }
      //         }, 2000);
      //     })
      //     .catch((error) => {
      //         FetchingErrorHandler(error, openNotificationFailure);
      //         dispatch(loginFailure());
      //     });
    }
  };

  // const handleGoogleLogin = useGoogleLogin({
  //     onSuccess: async (tokenResponse) => {
  //         console.log(tokenResponse.access_token);
  //         // getGoogleAccountInfo(tokenResponse.access_token)
  //         //     .then((res) => {
  //         //         console.log(res);
  //         //     })
  //         //     .catch((error: AxiosError) => {
  //         //         FetchingErrorHandler(error, openNotificationFailure);
  //         //     });
  //     },
  // });

  const handleFacebookLogin = () => {
    message.info("Facebook login clicked");
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotificationSuccess = () => {
    api.info({
      message: `Notification`,
      description: "Login successful",
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

  return (
    <div className={`login ${theme}`}>
      {contextHolder}
      <div className="login-container">
        <div className="login-logo">
          <Logo />
        </div>
        <h5 className="login-title">Login Odotaus</h5>
        <LoginForm onLogin={handleLogin} isLoading={isLoading} />
        <div className="login-other">
          <hr />
          <span className="mx-3">Sign in with</span>
          <hr />
        </div>
        <div className="login-other-function">
          <button
            className="login-other-function-item"
            // onClick={() => handleGoogleLogin()}
          >
            <FaGoogle style={{ color: "#e94820" }} />
            <span>Google</span>
          </button>
          <div className="login-other-function-devider"></div>
          <button
            className="login-other-function-item"
            onClick={handleFacebookLogin}
          >
            <FaFacebook style={{ color: "#3b5998" }} />
            <span>Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
