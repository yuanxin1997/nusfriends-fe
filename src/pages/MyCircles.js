import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import CircleCard from "../components/CircleCard";
import { TeamOutlined, BulbOutlined, CommentOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

function MyCircles() {
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
    <Layout style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }} >
      <Sider style={{ backgroundColor: "var(--accent-bg)" }}>
        <SideWrapper>
          <div>
            <Link>
              <TabWrapper className="active">
                <TeamOutlined className="tabIcon" />
                <p>My Circles</p>
              </TabWrapper>
            </Link>

            <Link>
              <TabWrapper className="inactive">
                <CommentOutlined className="tabIcon" />
                <p>My Discussions</p>
              </TabWrapper>
            </Link>

            <Link>
              <TabWrapper className="inactive">
                <BulbOutlined className="tabIcon" />
                <p>My Answers</p>
              </TabWrapper>
            </Link>
          </div>
        </SideWrapper>
      </Sider>
      <Content style={{ backgroundColor: "var(--accent-bg)" }}>
        <Row>
          <Col span={24}>
            <h1 style={{ textAlign: "left", marginTop: 20 }}>My Circles</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
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

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12em;
`;

const TabWrapper = styled.div`
  display: flex;
  &.active {
    color: #000000;
  }
  &.inactive {
    color: #d4d5d8;
  }
  .tabIcon {
    font-size: 24px;
    margin-right: 10px;
  }
`;

const BoxesWrapper = styled.div`
  height: 100%;
  width: 85%;
  display: flex;
  flex-direction: column;
  margin-top: 5em;
`;

export default MyCircles;
