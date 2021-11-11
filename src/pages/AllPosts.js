import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Avatar,
  Col,
  Row,
  Tooltip,
  Layout,
  Button,
  Spin,
  notification,
  List,
  Skeleton,
  Divider,
  message,
} from "antd";
import {
  PlusOutlined,
  WarningOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import styled from "styled-components";

import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
import CirclePost from "../components/CirclePost";
import CreatePostModal from "../components/CreatePostModal";
import PlaceholderPicture from "../components/PlaceholderPicture";

import axios from "axios";
import { Url } from "../constants/global";

const { Sider, Content } = Layout;

const AllPosts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [circleName, setCircleName] = useState();
  const history = useHistory();
  let { id } = useParams();
  const [subscribers, setSubscribers] = useState([]);
  const [subCount, setSubCount] = useState();

  const [cacheData, setCacheData] = useState([]);

  // dummy data, to be replaced by API call
  const [posts, setPosts] = useState([]);
  const openCreateModal = () => setModalVisible(true);
  function closeCreateModal() {
    setModalVisible(false);
  }

  const loadCachedata = () => {
    const cacheInstance = cacheData;
    const lengthToRetrieve =
      cacheInstance.length >= 4 ? 4 : cacheInstance.length;
    const unloadedCacheData = cacheInstance.splice(0, lengthToRetrieve);
    setPosts([...posts, ...unloadedCacheData]);
    setCacheData([...cacheInstance]);
  };

  const loadMoreData = async () => {
    try {
      await axios.get(`${Url}/circles/circleId/${id}`).then((res) => {
        setCircleName(res.data[0].name);
      });

      const userId = parseInt(localStorage.userId);

      await axios
        .get(`${Url}/posts/circle/${id}?userId=${userId}`)
        .then((res) => {
          console.log("data:", res.data);
          const cacheInstance = [...res.data];
          // cacheInstance.splice(0,7); testing UI
          const lengthToRetrieve =
            cacheInstance.length >= 4 ? 4 : cacheInstance.length;
          const unloadedCacheData = cacheInstance.splice(0, lengthToRetrieve);
          setCacheData(cacheInstance);
          setPosts(unloadedCacheData);
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

  const fetchSubscribers = async () => {
    try {
      await axios.get(`${Url}/circles/subscribers/${id}`).then((res) => {
        setSubscribers(res.data);
        setSubCount(res.data.length);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (posts.length > 0) {
      notification["warning"]({
        message: "Unable to delete",
        description: "You cannot delete a circle with existing posts",
      });
    } else {
      await axios.delete(`${Url}/circles/${id}`);
      history.push("/");
      message.success("Sucessfully deleted a circle");
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
    fetchSubscribers();
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

              <BarWrapper>
                <Button
                  type="primary"
                  icon={<DeleteFilled />}
                  onClick={localStorage.userId ? handleDelete : rerouteToLogin}
                >
                  Delete This Circle
                </Button>
                <Button
                  type="primary"
                  icon={<EditFilled />}
                  onClick={
                    localStorage.userId ? openCreateModal : rerouteToLogin
                  }
                >
                  Edit This Circle
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={
                    localStorage.userId ? openCreateModal : rerouteToLogin
                  }
                >
                  Create New Post
                </Button>
                <CreatePostModal
                  modalVisible={modalVisible}
                  closeCreateModal={closeCreateModal}
                  circleId={id}
                />
              </BarWrapper>
            </Row>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <InfiniteScroll
                dataLength={posts.length}
                next={loadCachedata}
                hasMore={cacheData.length > 0}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={posts}
                  renderItem={(post, index) => (
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
                  )}
                />
              </InfiniteScroll>
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

const BarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: auto;
`;

export default AllPosts;
