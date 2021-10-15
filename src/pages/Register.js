import { Button, Col, Input, Row, Form, Space } from "antd";
import Password from "antd/lib/input/Password";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Url } from "../constants/global";

function Register() {
    const history = useHistory();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        const user = {
            email: values.email,
            password: values.password,
            name: values.name,
            description: "",
        };

        setPending(true);

        await axios
            .post(`${Url}/users/register`, { user })
            .then((res) => {
                // TODO: save the returned jwt & userid
                console.log(res);
                setPending(false);
                history.push("/");
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    setError(error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
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
                <h1>Be an NUSFriend today!</h1>
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
                            loading={pending}
                        >
                            Register
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
        </div>
    );
}

const LoginCard = styled.div`
    background-color: var(--base-0);
    border-radius: var(--br-lg);
    min-width: 500px;
    box-shadow: var(--shadow);
    margin-bottom: 10%;
    padding: 16px;
`;

export default Register;
