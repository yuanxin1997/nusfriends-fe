import React, { useState } from "react";

import { Col, Row } from "antd";
import ContainerHeader from "../components/ContainerHeader";
import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
const { Header, Footer, Sider, Content } = Layout;

const MyDiscussions = () => {
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
    title: "My Discussions",
    breadcrumbData: [
      {
        name: "My Discussions",
        path: "/my-discussions",
      },
    ],
  };
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
        {/* content starts here */}
      </Content>
    </Layout>
  );
};

export default MyDiscussions;
