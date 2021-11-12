import {
    Col,
    Row,
    Menu,
    Dropdown,
    message,
    Badge,
    Skeleton,
    Divider,
    Avatar,
    List,
    Button,
    AutoComplete,
    Input,
    Select,
    notification,
} from "antd";
import Search from "antd/lib/input/Search";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../resources/Logo.png";
import moment from "moment";
import { UserOutlined, LogoutOutlined, BellFilled } from "@ant-design/icons";
import WebSocket from "isomorphic-ws";
import { Url } from "../constants/global";
import { generateDarkColorHex } from "../helpers/helper";
import axios from "axios";
import PlaceholderPicture from "./PlaceholderPicture";
import { useDebouncedCallback } from "use-debounce";

function Navbar(props) {
    const [user, setUser] = useState(null);
    const [curRoute, setCurRoute] = useState("/");
    const location = useLocation();
    const history = useHistory();

    const openNotificationWithIcon = () => {
        notification["info"]({
            message: "You have a new notification!",
            description: "Please check your notification inbox",
        });
    };

    const onClick = ({ key }) => {
        if (key == 0) {
            history.push(`/user/${user.userid}`);
        } else if (key == 1) {
            localStorage.clear();
            props.onUpdate(null);
            message.success("Logged out successfully!");
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

    // ########### START #############
    // ###### for notification #######
    // ###############################
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [cacheData, setCacheData] = useState([]);

    const navigate = async (url, id) => {
        await axios.delete(`${Url}/notifications/${id}`);
        loadData();
        history.push(url);
    };

    const loadCachedata = () => {
        const cacheInstance = cacheData;
        const lengthToRetrieve =
            cacheInstance.length >= 8 ? 8 : cacheInstance.length;
        const unloadedCacheData = cacheInstance.splice(0, lengthToRetrieve);
        setData([...data, ...unloadedCacheData]);
        setCacheData([...cacheInstance]);
    };

    const loadData = async () => {
        console.log("loading data");
        if (localStorage.getItem("userId")) {
            try {
                const { data: results } = await axios.get(
                    `${Url}/notifications/userId/${localStorage.getItem(
                        "userId"
                    )}`
                );
                console.log(results);
                const cacheInstance = [...results];
                // cacheInstance.splice(0,7); testing UI
                const lengthToRetrieve =
                    cacheInstance.length >= 8 ? 8 : cacheInstance.length;
                const unloadedCacheData = cacheInstance.splice(
                    0,
                    lengthToRetrieve
                );
                setCacheData(cacheInstance);
                setData(unloadedCacheData);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        setCurRoute(location.pathname);
        loadData();
        setUser(props.currentUser);
    }, [props, location]);

    function trim(content) {
        if (content.length > 30) {
            return content.slice(0, 30) + "...";
        } else {
            return content;
        }
    }
    // web socket START HERE ================

    // useEffect(() => {
    useEffect(() => {
        const websocket = new WebSocket(
            `wss://nusfriends-be.herokuapp.com/nus-friends?userId=${localStorage.getItem(
                "userId"
            )}`
        );
        websocket.onopen = () => {
            console.log("connected");
        };
        websocket.onmessage = (e) => {
            let id = JSON.parse(e.data).message;
            if (id == localStorage.getItem("userId")) {
                trigger(id);
            }
        };
        return () => {
            websocket.close();
        };
    }, []);

    function trigger(e) {
        loadData();
        openNotificationWithIcon();
    }

    // }, []);

    // web socket END HERE ================
    const notificationMenu = (
        <NotificationCard>
            <p> Notification</p>
            <div
                id="scrollableDiv"
                style={{
                    height: "350px",
                    overflow: "auto",
                    padding: "0 16px",
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadCachedata}
                    hasMore={cacheData.length > 0}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={
                        <Divider plain>It is all, nothing more 🤐</Divider>
                    }
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                                <NotificationItemWrapper
                                    onClick={() =>
                                        navigate(item.link, item.notifid)
                                    }
                                >
                                    <div className="notif-content">
                                        {trim(item.content)}
                                    </div>
                                    <div className="notif-date">
                                        {moment(item.createdat).fromNow()}
                                    </div>
                                </NotificationItemWrapper>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </NotificationCard>
    );
    // ########### END #############
    // ###### for notification #######
    // ###############################

    // ########### START #############
    // ###### for Search #############
    // ###############################

    const [userOptions, setUserOptions] = useState([]);
    const [circleOptions, setCircleOptions] = useState([]);
    const [totalOptions, setTotalOptions] = useState([]);

    const renderTitle = (title) => <span>{title}</span>;

    const renderItem = (title, userid) => ({
        value: title,
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
                onClick={() => history.push(`/user/${userid}`)}
            >
                {title}
            </div>
        ),
    });

    const renderCircle = (title, circleid) => ({
        value: title,
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
                onClick={() =>
                    history.push(`/my-circles/${circleid}/all-posts`)
                }
            >
                {title}
            </div>
        ),
    });

    const handleSearchChange = (values) => {
        const { Option } = Select;
        if (values) {
            const userReq = axios.get(`${Url}/users/search/${values}`);
            const circleReq = axios.get(`${Url}/circles/search/${values}`);
            axios
                .all([userReq, circleReq])
                .then(
                    axios.spread((...responses) => {
                        const userRes = responses[0].data;
                        const circleRes = responses[1].data;
                        const userOptions = [
                            {
                                label: renderTitle("Users"),
                                options: userRes.map((user) =>
                                    renderItem(user.name, user.userid)
                                ),
                            },
                        ];
                        const circleOptions = [
                            {
                                label: renderTitle("Circles"),
                                options: circleRes.map((circle) =>
                                    renderCircle(circle.name, circle.circleid)
                                ),
                            },
                        ];

                        const total = userOptions.concat(circleOptions);
                        setTotalOptions(total ? total : null);
                    })
                )
                .catch((errors) => console.log(errors));
        } else {
            setTotalOptions(null);
        }
    };

    const debounced = useDebouncedCallback(
        (value) => {
            handleSearchChange(value);
        },
        // delay in ms
        50
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
                <NavItem
                    className={curRoute === "/" ? "active" : ""}
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    Home
                </NavItem>
                <NavItem
                    className={curRoute.includes("/my-circles") ? "active" : ""}
                    to="/my-circles"
                    onClick={() => {
                        history.push("/my-circles");
                    }}
                >
                    My Circles
                </NavItem>
                <NavItem
                    className={curRoute.includes("/my-inbox") ? "active" : ""}
                    onClick={() => {
                        history.push("/my-inbox");
                    }}
                >
                    My Inbox
                </NavItem>
            </div>

            {user == null && (
                <Row gutter={16}>
                    <Col>
                        <Button
                            type="default"
                            size="large"
                            style={{ minWidth: "100px" }}
                            href="/register"
                        >
                            Register
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            size="large"
                            style={{ minWidth: "100px" }}
                            href="/login"
                        >
                            Login
                        </Button>
                    </Col>
                </Row>
            )}

            {user != null && (
                <Row align="middle" gutter={[16, 0]}>
                    {user && (
                        <Col>
                            <Dropdown
                                overlay={notificationMenu}
                                trigger={["click"]}
                                placement="bottomCenter"
                                arrow
                            >
                                {data.length > 0 ? (
                                    <Badge dot>
                                        <NotificationWrapper>
                                            <BellFilled />
                                        </NotificationWrapper>
                                    </Badge>
                                ) : (
                                    <NotificationWrapper>
                                        <BellFilled />
                                    </NotificationWrapper>
                                )}
                            </Dropdown>
                        </Col>
                    )}
                    <Col>
                        <AutoComplete
                            style={{ width: 250 }}
                            options={totalOptions}
                        >
                            <Input.Search
                                placeholder="Search here..."
                                onChange={
                                    (e) => debounced(e.target.value)
                                    //handleSearchChange(e.target.value)
                                }
                                onSearch={(e) => console.log(e)}
                                //loading={true}
                            ></Input.Search>
                        </AutoComplete>
                    </Col>
                    <Col>
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <ProfileCard>
                                {/* Right Side */}
                                {/* temp holder for profile pic */}
                                {user.photo ? (
                                    <Avatar
                                        style={{ marginLeft: "2rem" }}
                                        src={user.photo}
                                        size="large"
                                    />
                                ) : (
                                    <Avatar
                                        className="avatar-sdn"
                                        style={{
                                            marginLeft: "2rem",
                                            color: "#ffffff",
                                            backgroundColor: `${generateDarkColorHex()}`,
                                        }}
                                        size="large"
                                    >
                                        <span
                                            style={{ fontSize: "var(--fs-b1" }}
                                        >
                                            {(user.name || "").charAt(0)}
                                        </span>
                                    </Avatar>
                                )}

                                {/* to input profile details */}
                                {user && user.classification && (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            textAlign: "left",
                                            marginLeft: "16px",
                                        }}
                                        className="profileitems"
                                    >
                                        <ProfileName className="profilename">
                                            {user.name}
                                        </ProfileName>
                                        <ProfileInfo className="profileinfo">
                                            {user.classification}
                                        </ProfileInfo>
                                    </div>
                                )}
                                {user && !user.classification && (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            textAlign: "left",
                                            marginLeft: "16px",
                                            justifyContent: "center",
                                        }}
                                        className="profileitems"
                                    >
                                        <ProfileName className="profilename">
                                            {user.name}
                                        </ProfileName>
                                    </div>
                                )}
                            </ProfileCard>
                        </Dropdown>
                    </Col>
                </Row>
            )}
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
            margin-left: 2rem;
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

const NotificationWrapper = styled.div`
    color: var(--base-20);
    &:hover {
        cursor: pointer;
        color: var(--base-40);
    }
    &:active {
        color: var(--base-100);
    }
`;

const NotificationCard = styled.div`
    background-color: var(--base-0);
    width: 320px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    p {
        border-radius: 10px 10px 0 0;
        background-color: var(--accent-lightpink);
        color: var(--base-0);
        padding: 0.2rem 0em;
        text-align: center;
        font-weight: 900;
    }
`;

const NotificationItemWrapper = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    &:hover {
        color: var(--accent-redpink);
    }
    gap: 0.5rem;
    .notif-content {
        font-size: var(--fs-b3);
    }
    .notif-date {
        font-size: var(--fs-b3);
        color: var(--base-20);
        font-weight: 100;
        font-style: italic;
        content: "→";
    }
    .notif-date::after {
        content: "...";
    }
`;

const NavItem = styled.div`
    cursor: pointer;
    border-bottom: 2px solid var(--base-0);
    &.active {
        color: var(--accent-darkpink);
        border-bottom: 2px solid var(--accent-darkpink);
    }
    &:hover {
        color: var(--accent-darkpink);
    }
`;
export default Navbar;
