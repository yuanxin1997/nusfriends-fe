import React, { useState, useEffect } from "react";

import { Avatar, Col, Row, Tooltip, Layout, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styled from "styled-components";

import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
import CirclePost from "../components/CirclePost";
import CreatePostModal from "../components/CreatePostModal";
const { Header, Footer, Sider, Content } = Layout;

const AllPosts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // dummy data, to be replaced by API call
  const [posts, setPosts] = useState([
    {
      id: 1,
      circleName: "Lost And Found",
      postTitle: "Test Title",
      postText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus nulla sagittis sapien et. A vel tortor vestibulum arcu, diam netus consectetur. Et, a interdum adipiscing viverra congue. Purus cursus id aliquam turpis vitae non.",
      posted: "20h",
      numLikes: 77,
      numComments: 123,
    },
    {
      id: 2,
      circleName: "NUS Computing",
      postTitle: "Which is the best professor?",
      postText: "HSIANG HUI OR WEEKEK?",
      posted: "23h",
      numLikes: 27,
      numComments: 153,
    },
  ]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
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

  useEffect(() => {
    loadMoreData();
  }, []);

  const openCreateModal = () => setModalVisible(true);
  function closeCreateModal() {
    setModalVisible(false);
  }

  /* START -- SETUP FOR COMPONENT */
  const tabData = [
    {
      icon: "CommentOutlined",
      title: "All Posts",
      path: "/my-circles/replace by id/all-posts",
    },
    {
      icon: "TrophyOutlined",
      title: "Leaderboard",
      path: "/my-circles/replace by id/leaderboard",
    },
  ];

  const headData = {
    title: "replace by fetched data",
    breadcrumbData: [
      {
        name: "My Circles",
        path: "/my-circles",
      },
      {
        name: "to be removed, fetch data and push here",
        path: "this can be empty",
      },
    ],
  };
  /* END -- SETUP FOR COMPONENT */

  return (
    <Layout style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}>
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
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
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
              onClick={openCreateModal}
            >
              Create a New Post
            </Button>
            <CreatePostModal
              modalVisible={modalVisible}
              closeCreateModal={closeCreateModal}
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
              circleName={post.circleName}
              postTitle={post.postTitle}
              postText={post.postText}
              posted={post.posted}
              numLikes={post.numLikes}
              numComments={post.numComments}
            />
          ))}
        </div>
      </Content>
    </Layout>
  );
};

const UserGroupWrapper = styled.div`
  margin: 1rem 0 0.5rem 0;
`;

export default AllPosts;
