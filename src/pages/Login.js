import { Button, Col, Input, Row, Form, message } from "antd";
import Password from "antd/lib/input/Password";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Url } from "../constants/global";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Login(props) {
    const history = useHistory();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    // login function
    const onFinish = async (values) => {
        const user = {
            email: values.email.toLowerCase(),
            password: values.password,
        };

        setPending(true);

        await axios
            .post(`${Url}/users/login`, { user })
            .then((res) => {
                console.log(res);
                setPending(false);
                var jwt = res.data.jwtToken;
                var userId = jwt_decode(jwt).user.userId;
                localStorage.setItem("jwt", jwt);
                localStorage.setItem("userId", userId);
                props.onUpdate(userId);
                history.push("/");
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    setError(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                    setError(error.request.data);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                    setError(error.message);
                }
                setPending(false);
                console.log(error.config);
            });
    };

    // check if user is already logged in
    useEffect(() => {
        if (localStorage.jwt === undefined) {
            return "";
        } else {
            history.push("/");
            message.success("Logged in!");
        }
    }, []);

    return (
        <div
            style={{
                backgroundColor: "var(--accent-bg)",
                position: "fixed",
                width: "100%",
                height: "100%",
                overflowX: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <div style={{ marginBottom: "24px" }}>
                <h1>Login</h1>
            </div>

            <LoginCard>
                <Form
                    name="login"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="left"
                    style={{ padding: "24px" }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                        style={{ marginBottom: "32px" }}
                    >
                        <Input
                            placeholder="Enter your email"
                            style={{
                                padding: "8px",
                                borderRadius: "var(--br-md)",
                            }}
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        style={{ marginBottom: "32px" }}
                    >
                        <Password
                            placeholder="Enter your password"
                            style={{
                                padding: "8px",
                                borderRadius: "var(--br-md)",
                            }}
                        ></Password>
                    </Form.Item>
                    <Form.Item justify="center">
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            style={{ padding: "0px 36px" }}
                            loading={pending}
                        >
                            Login
                        </Button>
                    </Form.Item>
                    {error && (
                        <Form.Item
                            justify="center"
                            style={{
                                color: "var(--error-main)",
                                fontWeight: "700",
                            }}
                        >
                            {error}
                        </Form.Item>
                    )}
                </Form>
            </LoginCard>
            <div style={{ marginBottom: "10%" }}>
                Don't have an account?{" "}
                <Link to={"register"}>
                    <SignUp>Sign up here!</SignUp>
                </Link>
            </div>
        </div>
    );
}

const LoginCard = styled.div`
    background-color: var(--base-0);
    border-radius: var(--br-lg);
    min-width: 500px;
    box-shadow: var(--shadow);
    margin-bottom: 36px;
    padding: 16px;
`;

const SignUp = styled.span`
    color: var(--accent-darkpink);
    transition: var(--transition);
    font-weight: 400;

    &:hover {
        text-decoration: underline;
        font-weight: 700;
    }
`;

export default Login;
