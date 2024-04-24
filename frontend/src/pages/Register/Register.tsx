import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, message, notification } from "antd";
import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    validateDisplayName,
    validatePassword,
    validateUsername,
} from "../../helper/InformationValidater";
import { useTheme } from "../../hooks/ThemeContext";
import Logo from "../../images/Logo";
import "./register.css";

interface RegisterFormProps {
    onRegister: (values: any) => void;
    returnPath?: string;
    loading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    onRegister,
    returnPath,
    loading,
}) => {
    const onFinish = (values: any) => {
        onRegister(values);
    };

    return (
        <Form className='register-form' name='register' onFinish={onFinish}>
            <label htmlFor='fullName'>Full name</label>
            <Form.Item
                name='fullName'
                rules={[
                    { required: true, message: "Please input your fullname!" },
                    { validator: validateDisplayName },
                ]}
                hasFeedback
            >
                <Input
                    className='register-form-input'
                    prefix={<UserOutlined />}
                    placeholder='Full name'
                />
            </Form.Item>
            <label htmlFor='userName'>Username</label>
            <Form.Item
                name='userName'
                rules={[
                    { required: true, message: "Please input your username!" },
                    { validator: validateUsername },
                ]}
                hasFeedback
            >
                <Input
                    className='register-form-input'
                    prefix={<UserOutlined />}
                    placeholder='Username'
                />
            </Form.Item>
            <label htmlFor='email'>Email</label>
            <Form.Item
                name='email'
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
                    className='register-form-input'
                    prefix={<MailOutlined />}
                    placeholder='Email'
                />
            </Form.Item>
            <label htmlFor='password'>Password</label>
            <Form.Item
                name='password'
                rules={[
                    { required: true, message: "Please input your password!" },
                    { validator: validatePassword },
                ]}
                hasFeedback
            >
                <Input.Password
                    className='register-form-input'
                    prefix={<LockOutlined />}
                    placeholder='Password'
                />
            </Form.Item>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <Form.Item
                name='confirmPassword'
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
                                new Error(
                                    "The new password that you entered do not match!"
                                )
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    className='register-form-input'
                    prefix={<LockOutlined />}
                    placeholder='Confirm password'
                />
            </Form.Item>
            <Form.Item>
                <div className='register-form-function'>
                    <Link
                        to={"/login"}
                        state={{ returnPath }}
                        className='register-form-function-item'
                    >
                        Already have account?
                    </Link>
                </div>
                <button className='register-form-submit' type='submit'>
                    Register
                </button>
            </Form.Item>
        </Form>
    );
};

const Register: React.FC = () => {
    const [isLoading, setLoading] = useState(false);
    const { theme } = useTheme();

    const handleRegister = (values: any) => {
        if (!isLoading) {
            setLoading(true);
            // RegisterAccount(values)
            //     .then((res) => {
            //         openNotificationSuccess();
            //         setTimeout(() => {
            //             navigate("/CheckEmail/", {
            //                 state: { email: values.email },
            //             });
            //         }, 2000);
            //     })
            //     .catch((error: AxiosError) => {
            //         const errors = (error.response?.data as any).errors;
            //         const errorMessage = errors.join("\n") as string;
            //         openNotificationFailure(errorMessage);
            //     })
            //     .finally(() => {
            //         setLoading(false);
            //     });
        }
    };

    const handleGoogleLogin = () => {
        message.info("Google register clicked");
    };

    const handleFacebookLogin = () => {
        message.info("Google register clicked");
    };

    const state = useLocation().state ?? { returnPath: null, id: null };

    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationSuccess = () => {
        api.info({
            message: `Notification`,
            description: "Register successfully",
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
        <div className={`register ${theme}`}>
            {contextHolder}
            <div className='register-container'>
                <div className='register-logo'>
                    <Logo />
                </div>
                <h5 className='register-title'>Register Odotaus</h5>
                <RegisterForm
                    onRegister={handleRegister}
                    returnPath={state.returnPath}
                    loading={isLoading}
                />
                <div className='register-other'>
                    <hr />
                    <span className='mx-3'>Sign in with</span>
                    <hr />
                </div>
                <div className='register-other-function'>
                    <button
                        className='register-other-function-item google'
                        onClick={handleGoogleLogin}
                    >
                        <FaGoogle style={{ color: "#e94820" }} />
                        <span>Google</span>
                    </button>
                    <div className='register-other-function-devider'></div>
                    <button
                        className='register-other-function-item facebook'
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

export default Register;
