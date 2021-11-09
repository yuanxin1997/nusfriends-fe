import React, { useState, useEffect } from "react";

import { Col, Row, Layout, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
import CircleCard from "../components/CircleCard";
import CreateCircleModal from "../components/CreateCircleModal";

import axios from "axios";
import { Url } from "../constants/global";

const { Sider, Content } = Layout;

const MyCircles = () => {
  /* START -- SETUP FOR COMPONENT */
  const [loading, setLoading] = useState(true);
  const [avatarData, setAvatarData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [circles, setCircles] = useState([]);

  const openCreateModal = () => setModalVisible(true);
  function closeCreateModal() {
    setModalVisible(false);
  }

  const tabData = [
    {
      icon: "TeamOutlined",
      title: "My Circles",
      path: "/my-circles",
    },
    {
      icon: "CommentOutlined",
      title: "My Discussions",
      path: "/my-circles/my-discussions",
    },
    {
      icon: "BulbOutlined",
      title: "My Answers",
      path: "/my-circles/my-answers",
    },
  ];

  const headData = {
    title: "My Circles",
    breadcrumbData: [
      {
        name: "My Circles",
        path: "/my-circles",
      },
    ],
  };

  const loadCirclesData = async () => {
    await axios.get(`${Url}/circles`).then((res) => {
      setCircles(res.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    loadCirclesData();
  }, []);

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
              Create a New Circle
            </Button>
            <CreateCircleModal
              modalVisible={modalVisible}
              closeCreateModal={closeCreateModal}
            />
          </div>
        </Row>
        <Row>
          <Col span={24}>
            {/* content starts here */}
            <BoxesWrapper>
              <Row gutter={16}>
                {circles.map((circle) => (
                  <Col span={8}>
                    <CircleCard
                      circleName={circle.name}
                      numMembers={circle.numMembers}
                      circleId={circle.circleid}
                      avatarData={avatarData}
                    />
                  </Col>
                ))}
              </Row>
            </BoxesWrapper>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
const BoxesWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 3em;
`;
export default MyCircles;
