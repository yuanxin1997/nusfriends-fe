import { Button, Col, Input, Row } from "antd";
import Password from "antd/lib/input/Password";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Login() {
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
                <div style={{ margin: "24px" }}>
                    <Row align="middle" gutter={[0, 12]}>
                        <Col md={9} xs={24}>
                            <h5>Email:</h5>
                        </Col>
                        <Col md={15} xs={24}>
                            <Input
                                placeholder="Enter your email"
                                style={{
                                    padding: "8px",
                                    borderRadius: "var(--br-md)",
                                }}
                            ></Input>
                        </Col>
                    </Row>
                </div>

                <div style={{ margin: "24px" }}>
                    <Row justify="center" align="middle" gutter={[0, 12]}>
                        <Col md={9} xs={24}>
                            <h5>Password:</h5>
                        </Col>
                        <Col md={15} xs={24}>
                            <Password
                                placeholder="Enter your password"
                                style={{
                                    padding: "8px",
                                    borderRadius: "var(--br-md)",
                                }}
                            ></Password>
                        </Col>
                    </Row>
                </div>

                <div style={{ margin: "50px 0px 24px 0px" }}>
                    <Button
                        type="primary"
                        size="large"
                        style={{ padding: "0px 36px" }}
                    >
                        Login
                    </Button>
                </div>
            </LoginCard>
            <div style={{ marginBottom: "20%" }}>
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
