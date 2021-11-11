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
import PlaceholderPicture from "../components/PlaceholderPicture";

import axios from "axios";
import { Url } from "../constants/global";

const { Header, Footer, Sider, Content } = Layout;

const AllPosts = () => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [circleName, setCircleName] = useState();
  const history = useHistory();
  let { id } = useParams();
  const [subscribers, setSubscribers] = useState([]);
  const [subCount, setSubCount] = useState();

  // dummy data, to be replaced by API call
  const [posts, setPosts] = useState([]);
  const openCreateModal = () => setModalVisible(true);
  function closeCreateModal() {
    setModalVisible(false);
  }

  const loadMoreData = async () => {
    try {
      await axios.get(`${Url}/circles/circleId/${id}`).then((res) => {
        setCircleName(res.data[0].name);
      });

      const userId = parseInt(localStorage.userId);

      await axios
        .get(`${Url}/posts/circle/${id}?userId=${userId}`)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
  }, [id]);

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Layout
          style={{
            height: "100%",
            minHeight: "100vp",
            backgroundColor: "var(--accent-bg)",
          }}
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
                      maxCount={5}
                      size="large"
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >
                      {subscribers.map((subscriber) =>
                        subscriber.photo ? (
                          <Avatar
                            key={subscriber.userid}
                            src={subscriber.photo}
                          />
                        ) : (
                          <PlaceholderPicture
                            height={"40px"}
                            width={"40px"}
                            name={subscriber.name}
                          />
                        )
                      )}
                    </Avatar.Group>
                  </UserGroupWrapper>
                </Col>
              </div>
              <div style={{ marginLeft: "20px" }}> {subCount} members</div>

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
                  polled={false}
                  curUserLiked={post.curuserliked}
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
