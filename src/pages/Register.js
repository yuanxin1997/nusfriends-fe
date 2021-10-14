import { Button, Col, Input, Row, Form, Space } from "antd";
import Password from "antd/lib/input/Password";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const onFinish = (values) => {
        setEmail(values.email);
        setName(values.name);
        setPassword(values.password);

        const user = {
            email: values.email,
            password: values.password,
            name: values.name,
            description: "",
        };

        axios
            .post(`http://localhost:8080/users/register`, { user })
            .then((res) => console.log(res))
            .catch((err) => setError(err));
    };

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
                <h1>Be a NUSFriend today!</h1>
            </div>

            <LoginCard>
                <Form
                    name="register"
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
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                        style={{ marginBottom: "32px" }}
                    >
                        <Input
                            placeholder="Enter your name"
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
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </LoginCard>
            {error && <div>{error}</div>}
        </div>
    );
}

const LoginCard = styled.div`
    background-color: var(--base-0);
    border-radius: var(--br-lg);
    min-width: 500px;
    box-shadow: var(--shadow);
    margin-bottom: 20%;
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

export default Register;
