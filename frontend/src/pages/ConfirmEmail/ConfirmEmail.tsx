import React, { useState } from "react";
import EmailPNG from "../../images/email.png";
import "./confirmEmail.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { validateEmail } from "../../helper/InformationValidater";
import { AxiosError } from "axios";
import { Spin, notification } from "antd";
import { useTheme } from "../../hooks/ThemeContext";

function ConfirmEmail() {
    const { email } = useParams();
    const { token } = useParams();

    const isValid = email && validateEmail(email) && token && token.length > 0;
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const navigate = useNavigate();

    const handleVerifyEmail = () => {
        if (isValid) {
            // setLoading(true);
            // VerifyEmail(email, token)
            //     .then((res) => {
            //         openNotificationSuccess("Email verification successful");
            //         setTimeout(() => {
            //             navigate("/login");
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
        <div className={`confirmEmail ${theme}`}>
            {contextHolder}
            <div className='confirmEmail-container'>
                <div className='confirmEmail-content'>
                    {isValid && (
                        <>
                            <div className='confirmEmail-img'>
                                <img src={EmailPNG} alt='' />
                            </div>
                            <div className='confirmEmail-title'>
                                Verify your email address
                            </div>
                            <div className='confirmEmail-message'>
                                <p>
                                    You've entered <span>{email}</span> as the
                                    email address for your account.
                                    <br />
                                    Please verify this email address by clicking
                                    button below
                                </p>
                            </div>
                            <div className='confirmEmail-button'>
                                <button onClick={handleVerifyEmail}>
                                    Verify your email{" "}
                                    {loading && (
                                        <Spin className='confirmEmail-button-spin' />
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                    {!isValid && (
                        <div className='confirmEmail-invalid'>
                            Invalid activation link
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConfirmEmail;
