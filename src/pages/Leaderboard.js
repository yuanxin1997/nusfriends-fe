import React, { useState } from "react";

import { Col, Row } from "antd";
import CircleCard from "../components/CircleCard";

import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
const { Header, Footer, Sider, Content } = Layout;

const Leaderboard = () => {
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
    title: "replace by fetched data",
    breadcrumbData: [
      {
        name: "My Circles",
        path: "/my-circles",
      }, 
      {
        name: "to be removed, fetch data and push here",
        path: "this can be empty",
      }
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
        <Row>
 
        </Row>
      </Content>
    </Layout>
  );
}

export default Leaderboard;
