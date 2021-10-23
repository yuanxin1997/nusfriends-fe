import { Col, Row, Menu, Dropdown, message } from "antd";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../resources/Logo.png";
import { UserOutlined, LogoutOutlined, BellFilled } from "@ant-design/icons";

function Navbar() {
    const [user, setUser] = useState(null);
    const history = useHistory();

    const onClick = ({ key }) => {
        if (key == 0) {
            message.info("profile");
            history.push("/user");
        } else if (key == 1) {
            // TODO: update logout - should remove localstorage deets
            message.info("logout");
            history.push("/login");
        }
    };

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="0" icon={<UserOutlined />}>
                Profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1" icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Nb>
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    height: "50px",
                    alignItems: "center",
                }}
            >
                <Link to="/">
                    <img
                        src={logo}
                        alt="logo"
                        style={{ marginRight: "16px" }}
                    />
                </Link>
                <Link to="/explore">Explore</Link>
                <Link to="/my-circles">My Circles</Link>
                <Link to="/my-inbox">My Inbox</Link>
            </div>

            <Row align="middle" gutter={[16, 0]}>
                <Col>
                    <Search
                        placeholder="Search"
                        allowClear
                        // onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </Col>
                <Col>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <ProfileCard>
                            {/* Right Side */}
                            {/* temp holder for profile pic */}
                            <div
                                style={{
                                    display: "flex",
                                    backgroundColor: "var(--accent-lightpink)",
                                    borderRadius: "var(--br-sm)",
                                    height: "40px",
                                    width: "40px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "16px",
                                }}
                                className="profilepicture"
                            >
                                J
                            </div>

                            {/* to input profile details */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    textAlign: "left",
                                }}
                                className="profileitems"
                            >
                                <ProfileName className="profilename">
                                    John Doe
                                </ProfileName>
                                <ProfileInfo className="profileinfo">
                                    Y3 Information Systems
                                </ProfileInfo>
                            </div>
                        </ProfileCard>
                    </Dropdown>
                </Col>
            </Row>
        </Nb>
    );
}

const Nb = styled.nav`
    margin-left: auto;
    margin-right: auto;
    padding: 8px 24px;
    display: flex;
    box-shadow: var(--shadow);
    align-items: center;
    justify-content: space-between;
`;

const ProfileCard = styled.div`
    min-width: 200px;
    display: flex;
    flex-direction: row;

    &:hover {
        cursor: pointer;
        text-shadow: 1px 1px 10px var(--accent-lightpink);
        .profilename {
            color: var(--accent-darkpink);
        }
        .profileinfo {
            color: var(--accent-lightpink);
        }
        .profilepicture {
            box-shadow: var(--shadow);
        }
    }
`;

const ProfileName = styled.span`
    font-size: var(--fs-b4);
    color: var(--base-100);
`;

const ProfileInfo = styled.span`
    font-size: var(--fs-b3);
    color: var(--base-20);
`;

export default Navbar;
