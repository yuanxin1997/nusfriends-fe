import { Button, Col, Input, Row } from "antd";
import Password from "antd/lib/input/Password";
import React, { useState } from "react";
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
            <div style={{ marginBottom: "10px" }}>
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
                                placeholder="Enter your email"
                                style={{
                                    padding: "8px",
                                    borderRadius: "var(--br-md)",
                                }}
                            ></Password>
                        </Col>
                    </Row>
                </div>

                <div style={{ margin: "50px 0px 24px 0px" }}>
                    <Button type="primary">Login</Button>
                </div>
            </LoginCard>
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

export default Login;
