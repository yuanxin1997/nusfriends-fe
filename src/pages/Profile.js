import {
    InstagramOutlined,
    MailOutlined,
    MessageOutlined,
    PhoneOutlined,
    WhatsAppOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    Divider,
    Row,
    Spin,
    Tag,
    Form,
    Modal,
    Input,
    message,
    Select,
    Space,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PlaceholderPicture from "../components/PlaceholderPicture";
import { Url } from "../constants/global";

function Profile(props) {
    const profileId = props.match.params.id;
    const [userProfile, setUserProfile] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [userTags, setUserTags] = useState(null);
    const loggedInUser = localStorage.getItem("userId");
    const [owner, setOwner] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [tagVisible, setTagVisible] = useState(false);
    const [error, setError] = useState(null);
    const [tags, setTags] = useState([]);
    const [toAddTags, setToAddTags] = useState(null);
    const [messageVisible, setMessageVisible] = useState(false);

    useEffect(() => {
        loadProfileUser();
        loadUserTags();
        loadDbTags();
    }, [profileId]);

    const loadProfileUser = async () => {
        if (profileId !== null) {
            axios
                .get(`${Url}/users/${profileId}`)
                .then((res) => {
                    setUserProfile(res.data[0]);
                    if (res.data[0].userid == loggedInUser) {
                        setOwner(true);
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    //setPending(false);
                    console.log(error.config);
                });
            axios
                .get(`${Url}/users/${profileId}/stats`)
                .then((res) => {
                    setUserStats(res.data[0]);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    //setPending(false);
                    console.log(error.config);
                });
        } else {
            setUserProfile(null);
        }
    };

    const loadUserTags = async () => {
        if (profileId !== null) {
            axios
                .get(`${Url}/tags/userTags/${profileId}`)
                .then((res) => {
                    setUserTags(res.data);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    //setPending(false);
                    console.log(error.config);
                });
        } else {
            setUserProfile(null);
        }
    };

    const loadDbTags = async () => {
        const { Option } = Select;
        axios.get(`${Url}/tags`).then((res) => {
            const tags = res.data;
            const children = [];
            tags.forEach((tag) => {
                children.push(<Option key={tag.name}>{tag.name}</Option>);
            });
            setTags(children);
        });
    };

    const [form] = Form.useForm();

    const fillEditForm = () => {
        form.setFieldsValue({
            name: userProfile.name,
            email: userProfile.email,
            level: userProfile.classification,
            description: userProfile.description,
            telegram: userProfile.telegram,
            instagram: userProfile.instagram,
            phone: userProfile.phone,
        });
    };

    const EditModal = () => {
        return (
            <Modal
                visible={editVisible}
                title="Edit your profile"
                okText="Edit"
                onCancel={() => {
                    form.resetFields();
                    setEditVisible(false);
                }}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            setEditLoading(true);
                            onFinishEdit(values);
                            form.resetFields();
                        })
                        .catch((info) => {
                            console.log("Validate Failed: ", info);
                        });
                }}
                okButtonProps={{
                    type: "primary",
                    loading: editLoading ? true : false,
                }}
                cancelButtonProps={{ type: "default" }}
            >
                <Form form={form} layout="vertical" name="edit_form">
                    <h5 style={{ marginBottom: "16px" }}>ABOUT</h5>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Name cannot be empty!",
                            },
                            {
                                max: 15,
                                message: "Maximum of 15 characters only!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="level"
                        label="Level"
                        rules={[
                            {
                                max: 20,
                                message: "Maximum of 20 characters only!",
                            },
                        ]}
                    >
                        <Input placeholder="Y3 Computer Science / Economics Graduate" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="About Me"
                        tooltip="Optional, but it's good to let others learn about you!"
                        rules={[
                            {
                                max: 140,
                                message: "Maximum of 140 characters only!",
                            },
                        ]}
                        style={{ marginBottom: "16px" }}
                    >
                        <Input.TextArea
                            showCount={true}
                            maxLength="140"
                            placeholder="Write some fun facts about yourself!"
                        />
                    </Form.Item>
                    <Divider />
                    <h5 style={{ marginBottom: "16px" }}>CONTACT</h5>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Email cannot be empty!",
                            },
                            {
                                type: "email",
                                message: "Please enter a valid email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="telegram" label="Telegram">
                        <Input
                            addonBefore="@"
                            placeholder="your telegram username"
                        />
                    </Form.Item>

                    <Form.Item name="phone" label="Phone">
                        <Input addonBefore="+65" placeholder="91234567" />
                    </Form.Item>
                    <Form.Item name="instagram" label="Instagram">
                        <Input
                            addonBefore="@"
                            placeholder="your instagram profile"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const onFinishEdit = async (values) => {
        console.log(values);
        const user = {
            email: values.email.toLowerCase(),
            name: values.name,
            description: values.description ? values.description : "",
            classification: values.level ? values.level : "",
            telegram: values.telegram ? values.telegram : "",
            instagram: values.instagram ? values.instagram : "",
            phone: values.phone ? values.phone : "",
            tags: "",
        };

        await axios
            .put(`${Url}/users/${loggedInUser}`, { user })
            .then((res) => {
                if (res.status == 200) {
                    setEditLoading(false);
                    setEditVisible(false);
                    loadProfileUser();
                    props.onUpdate(null);
                    props.onUpdate(loggedInUser);
                    message.success("Profile updated successfully!");
                } else {
                    message.error("Error Code: ", res.status);
                }
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
                setEditLoading(false);
                setEditVisible(false);
                console.log(error.config);
            });
    };

    const TagModal = () => {
        var toAdd = [];
        return (
            <Modal
                visible={tagVisible}
                title="Add your interests"
                okText="Update"
                onCancel={() => {
                    setTagVisible(false);
                }}
                onOk={() => {
                    AddUserTag(toAdd);
                    //console.log(toAdd);
                }}
                okButtonProps={{
                    type: "primary",
                    //loading: editLoading ? true : false,
                }}
                cancelButtonProps={{ type: "default" }}
            >
                {userTags && (
                    <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Search for your interests and add them here!"
                        defaultValue={userTags.map((tag) => tag.name)}
                        onChange={(e) => {
                            toAdd = e;
                        }}
                    >
                        {tags}
                    </Select>
                )}
            </Modal>
        );
    };

    const AddUserTag = async (values) => {
        const user = {
            ...userProfile,
            tags: values,
        };
        console.log(user);

        await axios
            .put(`${Url}/users/${loggedInUser}`, { user })
            .then((res) => {
                if (res.status == 200) {
                    //setEditLoading(false);
                    setTagVisible(false);
                    loadProfileUser();
                    loadUserTags();
                    loadDbTags();
                    message.success("Tags updated successfully!");
                } else {
                    message.error("Error Code: ", res.status);
                }
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
                //setEditLoading(false);
                setTagVisible(false);
                console.log(error.config);
            });
    };

    const [messageForm] = Form.useForm();
    const MessageModal = () => {
        return (
            <Modal
                visible={messageVisible}
                title={`Drop ${userProfile.name} a message`}
                okText="Send"
                onCancel={() => {
                    setMessageVisible(false);
                }}
                onOk={() => {
                    messageForm
                        .validateFields()
                        .then((values) => {
                            //setEditLoading(true);
                            sendMessage(values);
                            messageForm.resetFields();
                        })
                        .catch((info) => {
                            console.log("Validate Failed: ", info);
                        });
                }}
                okButtonProps={{
                    type: "primary",
                    //loading: editLoading ? true : false,
                }}
                cancelButtonProps={{ type: "default" }}
            >
                <Form
                    form={messageForm}
                    layout="vertical"
                    name="message_form"
                    requiredMark={false}
                >
                    <Form.Item
                        name="message"
                        label="Message"
                        rules={[
                            {
                                required: true,
                                message: "Message content cannot be empty.",
                            },
                        ]}
                        style={{ marginBottom: "16px" }}
                    >
                        <Input.TextArea
                            showCount={true}
                            maxLength="500"
                            placeholder="Write your message here..."
                            rows={4}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const sendMessage = async (values) => {
        const data = {
            message: {
                content: values.message,
                receivedUserId: userProfile.userid,
            },
            user: {
                userId: parseInt(loggedInUser),
            },
        };

        console.log(data);

        await axios
            .post(
                `${Url}/messages`,
                {
                    ...data,
                },
                {
                    headers: {
                        authorization: localStorage.getItem("jwt"),
                    },
                }
            )
            .then((res) => {
                if (res.status == 200) {
                    setMessageVisible(false);
                    //setEditVisible(false);
                    message.success("Message sent!");
                } else {
                    message.error("Error Code: ", res.status);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    setError(error.response.data);
                } else if (error.request) {
                    console.log(error.request);
                    setError(error.request.data);
                } else {
                    console.log("Error", error.message);
                    setError(error.message);
                }
                //setEditLoading(false);
                setMessageVisible(false);
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
            }}
        >
            <div
                style={{
                    maxWidth: "1000px",
                    margin: "auto",
                }}
            >
                <h1
                    style={{
                        textAlign: "left",
                        marginBottom: "16px",
                        marginTop: "36px",
                    }}
                >
                    Profile
                </h1>
                {!userProfile && <Spin size="large"></Spin>}
                {userProfile && (
                    <div
                        style={{
                            width: "100%",
                            borderRadius: "var(--br-md)",
                            boxShadow: "var(--shadow)",
                            backgroundColor: "var(--base-0)",
                            padding: owner ? "0px 16px 36px 16px" : "36px 16px",
                        }}
                    >
                        {owner && (
                            <Row
                                justify="end"
                                style={{
                                    padding: "16px",
                                }}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        fillEditForm();
                                        setEditVisible(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <EditModal />
                            </Row>
                        )}
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
                                <h5>{userProfile.name}</h5>
                                {userProfile.classification && (
                                    <span style={{ color: "var(--base-40)" }}>
                                        {userProfile.classification}
                                    </span>
                                )}
                                {/* About Me */}
                                <div
                                    style={{
                                        textAlign: "left",
                                        padding: "16px 24px",
                                    }}
                                >
                                    {!owner && (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            <Button
                                                type="primary"
                                                icon={<MessageOutlined />}
                                                onClick={() =>
                                                    setMessageVisible(true)
                                                }
                                            >
                                                Message!
                                            </Button>
                                            {MessageModal()}
                                        </div>
                                    )}
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
                                    {userProfile.description && (
                                        <p>{userProfile.description}</p>
                                    )}
                                    {!userProfile.description && (
                                        <p
                                            style={{
                                                color: "var(--base-20)",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            No description added yet.
                                        </p>
                                    )}
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
                                        <Space direction="vertical">
                                            <Row
                                                align="middle"
                                                gutter={[16, 16]}
                                            >
                                                <Col>
                                                    <MailOutlined />
                                                </Col>
                                                <Col>
                                                    <span>
                                                        {userProfile.email}
                                                    </span>
                                                </Col>
                                            </Row>
                                            {userProfile && userProfile.phone && (
                                                <Row
                                                    align="middle"
                                                    gutter={[16, 16]}
                                                >
                                                    <Col>
                                                        <PhoneOutlined />
                                                    </Col>
                                                    <Col>
                                                        <span>
                                                            {userProfile.phone}
                                                        </span>
                                                    </Col>
                                                </Row>
                                            )}
                                            {userProfile &&
                                                userProfile.telegram && (
                                                    <Row
                                                        align="middle"
                                                        gutter={[16, 16]}
                                                    >
                                                        <Col>
                                                            <WhatsAppOutlined />
                                                        </Col>
                                                        <Col>
                                                            <span>
                                                                {`@${userProfile.telegram}`}
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                )}
                                            {userProfile &&
                                                userProfile.instagram && (
                                                    <Row
                                                        align="middle"
                                                        gutter={[16, 16]}
                                                    >
                                                        <Col>
                                                            <InstagramOutlined />
                                                        </Col>
                                                        <Col>
                                                            <span>
                                                                {`@${userProfile.instagram}`}
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                )}
                                        </Space>
                                    </Col>
                                </div>
                            </Col>
                            <Col span={1}>
                                {/* <Divider
                                    type="vertical"
                                    style={{
                                        backgroundColor: "var(--base-10)",
                                    }}
                                /> */}
                            </Col>
                            <Col span={15}>
                                {userStats && (
                                    <Row
                                        justify="space-around"
                                        style={{ marginBottom: "36px" }}
                                    >
                                        <Col>
                                            <h1>{userStats.no_posts}</h1>
                                            <div
                                                style={{
                                                    color: "var(--base-20)",
                                                }}
                                            >
                                                POSTS
                                            </div>
                                        </Col>
                                        <Col>
                                            <h1>{userStats.no_likes}</h1>
                                            <div
                                                style={{
                                                    color: "var(--base-20)",
                                                }}
                                            >
                                                LIKES
                                            </div>
                                        </Col>
                                        <Col>
                                            <h1>{userStats.no_followers}</h1>
                                            <div
                                                style={{
                                                    color: "var(--base-20)",
                                                }}
                                            >
                                                FOLLOWERS
                                            </div>
                                        </Col>
                                    </Row>
                                )}
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
                                        justify="start"
                                        align="middle"
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                        }}
                                        gutter={[16, 16]}
                                    >
                                        {userTags &&
                                            userTags.map((tag) => (
                                                <Col>
                                                    <Tag
                                                        color="blue"
                                                        style={{
                                                            padding: "2px 18px",
                                                        }}
                                                    >
                                                        {tag.name}
                                                    </Tag>
                                                </Col>
                                            ))}
                                        {owner && (
                                            <Col>
                                                <AddTag
                                                    onClick={() =>
                                                        setTagVisible(true)
                                                    }
                                                >
                                                    + Add
                                                </AddTag>
                                                {<TagModal />}
                                            </Col>
                                        )}
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        </div>
    );
}

const AddTag = styled.div`
    border: 1px dashed var(--accent-redpink);
    padding: 2px 18px;
    color: var(--accent-darkpink);
    transition: var(--transition);
    border-radius: var(--br-sm);
    &:hover {
        box-shadow: var(--shadow);
        color: var(--base-0);
        background-color: var(--accent-darkpink);
        cursor: pointer;
    }
`;

export default Profile;
