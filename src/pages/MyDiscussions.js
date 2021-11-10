import React, { useState, useEffect } from "react";

import { Col, Row } from "antd";
import ContainerHeader from "../components/ContainerHeader";
import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import CirclePost from "../components/CirclePost.js";
import axios from "axios";
import { Url } from "../constants/global";
const { Header, Footer, Sider, Content } = Layout;

const MyDiscussions = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const { data: results } = await axios.get(`${Url}/posts/`);
      console.log(results);
      setData(results);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
        <Row>
          {(data || []).map((item, index) => {
            return <CirclePost key={index} circleName={item.title}/>;
          })}
        </Row>
      </Content>
    </Layout>
  );
};

export default MyDiscussions;
