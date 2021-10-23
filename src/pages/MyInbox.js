import React, { useState } from "react";

import { Col, Row } from "antd";
import CircleCard from "../components/CircleCard";

import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
const { Header, Footer, Sider, Content } = Layout;

const MyInbox = () => {
  /* START -- SETUP FOR COMPONENT */
  const tabData = [
    {
      icon: "CommentOutlined",
      title: "All Posts",
      path: "/my-circles/replace by id/my-discussions",
    },
    {
      icon: "TrophyOutlined",
      title: "Leaderboard",
      path: "/my-circles/replace by id/circles",
    },
  ];

  const headData = {
    title: "My Inbox",
    breadcrumbData: [
      {
        name: "My Inbox",
        path: "/my-inbox",
      }
    ]
  };
  /* END -- SETUP FOR COMPONENT */

  return (
    <Layout style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}>
      <Content style={{ backgroundColor: "var(--accent-bg)", border: "1px solid red" , width: "80%", display: "flex", alignSelf: "center"}}>
        <Row justify="start">
          <Col>
            <ContainerHeader headData={headData} />
          </Col>
        </Row>
        <Row>
            {/* add content here */}
        </Row>
      </Content>
    </Layout>
  );
}

export default MyInbox;
