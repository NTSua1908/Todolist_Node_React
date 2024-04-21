// LoginPage.tsx
import { Form, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../images/Logo";
import "./forgotPassword.css";
import { useTheme } from "../../hooks/ThemeContext";

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const handleForgot = (values: any) => {
        setLoading(true);
        // SendEmailResetPassword(values.email)
        //     .then((res) => {
        //         openNotificationSuccess("Sent successfully");
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
    };

    const state = useLocation().state ?? { returnPath: null, id: null };

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

    return (
        <div className={`forgot-password ${theme}`}>
            {contextHolder}
            <div className='forgot-password-container'>
                <div className='forgot-password-logo'>
                    <Logo />
                </div>
                <h5 className='forgot-password-title'>Forgot password</h5>
                <p className='forgot-password-description'>
                    Don't worry! Please provide us with the email you used to
                    register your Odotaus account. We will send you a link to
                    reset your password through that email.
                </p>
                <Form
                    className='forgot-password-form'
                    name='forgot-password'
                    onFinish={handleForgot}
                >
                    <label htmlFor='password'>Your email</label>
                    <Form.Item
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input className='forgot-password-form-input' />
                    </Form.Item>

                    <Form.Item>
                        <div className='forgot-password-form-function'>
                            <Link
                                to={"/login"}
                                state={{ returnPath: state.returnPath }}
                                className='forgot-password-form-function-item'
                            >
                                Back to login
                            </Link>
                            <Link
                                to={"/register"}
                                state={{ returnPath: state.returnPath }}
                                className='forgot-password-form-function-item'
                            >
                                Create account
                            </Link>
                        </div>
                        <button
                            className='forgot-password-form-submit'
                            type='submit'
                        >
                            Send me an email
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
