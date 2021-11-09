import { MailOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Tag } from "antd";
import PlaceholderPicture from "../components/PlaceholderPicture";

function Profile() {
    return (
        <div
            style={{
                backgroundColor: "var(--accent-bg)",
                position: "fixed",
                width: "100%",
                height: "100%",
                overflowX: "hidden",
            }}
        >
            <div
                style={{
                    maxWidth: "1000px",
                    marginTop: "36px",
                    margin: "auto",
                }}
            >
                <h1 style={{ textAlign: "left", marginBottom: "16px" }}>
                    Profile
                </h1>
                <div
                    style={{
                        width: "100%",
                        borderRadius: "var(--br-md)",
                        boxShadow: "var(--shadow)",
                        backgroundColor: "var(--base-0)",
                    }}
                >
                    <Row
                        justify="end"
                        style={{
                            padding: "16px",
                        }}
                    >
                        <Button type="primary">Edit</Button>
                    </Row>
                    <Row align="middle">
                        <Col span={8}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "8px",
                                }}
                            >
                                <PlaceholderPicture
                                    height="60px"
                                    width="60px"
                                    name="test"
                                />
                            </div>
                            <h5>John Doe</h5>
                            <span style={{ color: "var(--base-40)" }}>
                                Y3 Information Systems
                            </span>
                            {/* About Me */}
                            <div
                                style={{
                                    textAlign: "left",
                                    padding: "16px 24px",
                                }}
                            >
                                <div
                                    style={{
                                        color: "var(--base-40)",
                                        fontSize: "fs-b4",
                                        marginBottom: "8px",
                                        marginTop: "36px",
                                    }}
                                >
                                    ABOUT ME
                                </div>
                                <p>
                                    Long description about me as a person lol.
                                </p>
                            </div>
                            {/* contact deets */}
                            <div
                                style={{
                                    textAlign: "left",
                                    padding: "16px 24px",
                                }}
                            >
                                <div
                                    style={{
                                        color: "var(--base-40)",
                                        fontSize: "fs-b4",
                                        marginBottom: "8px",
                                    }}
                                >
                                    CONTACT ME
                                </div>
                                <Col>
                                    <Row align="middle" gutter={[16, 16]}>
                                        <Col>
                                            <MailOutlined />
                                        </Col>
                                        <Col>
                                            <span>john@email.com</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </div>
                        </Col>
                        <Col span={1}>
                            <Divider
                                type="vertical"
                                style={{
                                    backgroundColor: "var(--base-10)",
                                    height: "280px",
                                }}
                            />
                        </Col>
                        <Col span={15}>
                            <Row
                                justify="space-around"
                                style={{ marginBottom: "36px" }}
                            >
                                <Col>
                                    <h1>12</h1>
                                    <div style={{ color: "var(--base-20)" }}>
                                        POSTS
                                    </div>
                                </Col>
                                <Col>
                                    <h1>12</h1>
                                    <div style={{ color: "var(--base-20)" }}>
                                        LIKES
                                    </div>
                                </Col>
                                <Col>
                                    <h1>12</h1>
                                    <div style={{ color: "var(--base-20)" }}>
                                        FOLLOWERS
                                    </div>
                                </Col>
                            </Row>
                            {/* tags */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "start",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        color: "var(--base-40)",
                                        fontSize: "fs-b4",
                                        marginBottom: "8px",
                                    }}
                                >
                                    AREA OF KNOWLEDGE / INTEREST
                                </div>
                                <Row
                                    justify="space-between"
                                    style={{ width: "100%", padding: "8px" }}
                                >
                                    <Col span={4}>
                                        <Tag
                                            color="blue"
                                            style={{ padding: "2px 18px" }}
                                        >
                                            python
                                        </Tag>
                                    </Col>
                                    <Col span={4}>
                                        <Tag
                                            color="blue"
                                            style={{ padding: "2px 18px" }}
                                        >
                                            python
                                        </Tag>
                                    </Col>
                                    <Col span={4}>
                                        <Tag
                                            color="blue"
                                            style={{ padding: "2px 18px" }}
                                        >
                                            python
                                        </Tag>
                                    </Col>
                                    <Col span={4}>
                                        <Tag
                                            color="blue"
                                            style={{ padding: "2px 18px" }}
                                        >
                                            python
                                        </Tag>
                                    </Col>
                                    <Col span={4}>
                                        <Tag
                                            color="blue"
                                            style={{ padding: "2px 18px" }}
                                        >
                                            python
                                        </Tag>
                                    </Col>
                                    <Col span={4}>
                                        <Tag
                                            color="blue"
                                            style={{ padding: "2px 18px" }}
                                        >
                                            python
                                        </Tag>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Profile;
