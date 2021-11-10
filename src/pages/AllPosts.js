import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  Avatar,
  Col,
  Row,
  Tooltip,
  Layout,
  Button,
  Spin,
  notification,
} from "antd";
import { PlusOutlined, WarningOutlined } from "@ant-design/icons";

import styled from "styled-components";

import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
import CirclePost from "../components/CirclePost";
import CreatePostModal from "../components/CreatePostModal";

import axios from "axios";
import { Url } from "../constants/global";

const { Header, Footer, Sider, Content } = Layout;

const AllPosts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [circleName, setCircleName] = useState();
  const history = useHistory();
  let { id } = useParams();

  // dummy data, to be replaced by API call
  const [posts, setPosts] = useState([]);

  const loadMoreData = async () => {
    try {
      await axios.get(`${Url}/circles/circleId/${id}`).then((res) => {
        setCircleName(res.data[0].name);
      });

      await axios.get(`${Url}/posts/circle/${id}`).then((res) => {
        setPosts(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const openCreateModal = () => setModalVisible(true);
  function closeCreateModal() {
    setModalVisible(false);
  }

  const rerouteToLogin = () => {
    history.push("/login");
    notification.open({
      message: "Error Adding a Comment.",
      description: "Please login with an account before adding a comment.",
      icon: <WarningOutlined />,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  /* START -- SETUP FOR COMPONENT */
  const tabData = [
    {
      icon: "CommentOutlined",
      title: "All Posts",
      path: "/my-circles/" + id + "/all-posts",
    },
    {
      icon: "TrophyOutlined",
      title: "Leaderboard",
      path: "/my-circles/" + id + "/leaderboard",
    },
  ];

  const headData = {
    title: circleName,
    breadcrumbData: [
      {
        name: "My Circles",
        path: "/my-circles",
      },
      {
        name: circleName,
      },
    ],
  };
  /* END -- SETUP FOR COMPONENT */

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Layout
          style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}
        >
          <Sider style={{ backgroundColor: "var(--accent-bg)" }}>
            <SideBar tabData={tabData} />
          </Sider>
          <Content style={{ backgroundColor: "var(--accent-bg)" }}>
            <Row justify="start">
              <Col>
                <ContainerHeader headData={headData} />
              </Col>
            </Row>
            <Row
              justify="start"
              style={{
                display: "flex",
                flexDirection: "row",
                width: "90%",
                alignItems: "center",
              }}
            >
              <div>
                <Col>
                  <UserGroupWrapper>
                    <Avatar.Group
                      maxCount={8}
                      size="large"
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >
                      {data.map((item, index) => (
                        <Avatar key={index} src={item.picture.large} />
                      ))}
                      <Tooltip title="Ant User" placement="top"></Tooltip>
                    </Avatar.Group>
                  </UserGroupWrapper>
                </Col>
              </div>
              <div style={{ marginLeft: "20px" }}> 365 members</div>

              <div
                style={{
                  marginLeft: "auto",
                }}
              >
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={
                    localStorage.userId ? openCreateModal : rerouteToLogin
                  }
                >
                  Create a New Post
                </Button>
                <CreatePostModal
                  modalVisible={modalVisible}
                  closeCreateModal={closeCreateModal}
                  circleId={id}
                />
              </div>
            </Row>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              {posts.map((post) => (
                <CirclePost
                  circleNameVisible={false}
                  postTitle={post.title}
                  postText={post.content}
                  posted={post.createdat}
                  numLikes={post.likes}
                  numComments={post.comments}
                  circleId={id}
                  postId={post.postid}
                  postedName={post.name}
                  postedClassification={post.classification}
                  postedPhoto={post.photo}
                  posterId={post.userid}
                  postType={post.posttype}
                />
              ))}
            </div>
          </Content>
        </Layout>
      )}
    </div>
  );
};

const UserGroupWrapper = styled.div`
  margin: 1rem 0 0.5rem 0;
`;

export default AllPosts;
