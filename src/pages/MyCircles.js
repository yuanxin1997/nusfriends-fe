import React, { useState } from "react";

import { Col, Row } from "antd";
import CircleCard from "../components/CircleCard";

import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
const { Header, Footer, Sider, Content } = Layout;

const MyCircles = () => {
  /* START -- SETUP FOR COMPONENT */
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
      }
    ],
  };
  /* END -- SETUP FOR COMPONENT */
  const [circles, setCircles] = useState([
    {
      circleName: "NUS Computing",
      numMembers: 365,
    },
    {
      circleName: "Kayaking at NUS",
      numMembers: 365,
    },
    {
      circleName: "NUS Science",
      numMembers: 365,
    },
    {
      circleName: "NUS Dating",
      numMembers: 365,
    },
    {
      circleName: "Internship",
      numMembers: 365,
    },
  ]);

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
        <Row>
          <Col span={24}>
          {/* conntent starts here */}
            <BoxesWrapper>
              <Row gutter={16}>
                {circles.map((circle) => (
                  <Col span={8}>
                    <CircleCard
                      circleName={circle.circleName}
                      numMembers={circle.numMembers}
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
}
const BoxesWrapper = styled.div`
  height: 100%;
  width: 85%;
  display: flex;
  flex-direction: column;
  margin-top: 3em;
`;
export default MyCircles;
