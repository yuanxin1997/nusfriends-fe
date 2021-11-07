import React, { useState, useEffect } from "react";

import { Col, Row, Layout, Button } from "antd";
import { PlusOutlined, HeartFilled } from "@ant-design/icons";

import styled from "styled-components";

import ContainerHeader from "../components/ContainerHeader";
import CreateCommentModal from "../components/CreateCommentModal";
import CommentsCard from "../components/CommentsCard";

const { Sider, Content } = Layout;
function Comments(props) {
  const { Sider, Content } = Layout;

  const [modalVisible, setModalVisible] = useState(false);

  const [post, setPost] = useState({
    title: "What is your favourite module in computing?",
    content: "My favourite module is IS1103. How about the rest of you guys?",
    numLikes: 77,
  });
  const [comments, setComments] = useState([
    { description: "My favourite module is CS1231", numLikes: 1 },
    { description: "My favourite module is IS3106.", numLikes: 2 },
  ]);
  const [loading, setLoading] = useState();

  const openCreateModal = () => setModalVisible(true);
  function closeCreateModal() {
    setModalVisible(false);
  }

  useEffect(() => {
    console.log(comments);
  }, []);

  const headData = {
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
  return (
    <Layout style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}>
      {/* <Sider style={{ backgroundColor: "var(--accent-bg)" }}></Sider> */}
      <Content style={{ backgroundColor: "var(--accent-bg)" }}>
        <Row justify="start">
          <Col style={{ marginLeft: 100 }}>
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
              Comment
            </Button>
            <CreateCommentModal
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
          <CommentsCard
            type="post"
            title={post.title}
            description={post.content}
            numLikes={post.numLikes}
          />

          {comments.map((comment) => (
            <CommentsCard
              type="comment"
              description={comment.description}
              numLikes={comment.numLikes}
            />
          ))}
        </div>
      </Content>
    </Layout>
  );
}

export default Comments;
