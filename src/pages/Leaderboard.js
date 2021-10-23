import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  List,
  Avatar,
  Col,
  Row,
  Card,
  Skeleton,
  Divider,
  message,
  Image,
  Tooltip,
} from "antd";
import {
  TrophyOutlined,
  UserOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import CircleCard from "../components/CircleCard";

import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
const { Header, Footer, Sider, Content } = Layout;

const Leaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
      },
    ],
  };
  /* END -- SETUP FOR COMPONENT */

  const leaderBoardData = [
    {
      photoUrl: "url",
      name: "CommentOutlined",
      likes: 5,
    },
    {
      photoUrl: "url",
      name: "CommentOutlined",
      likes: 5,
    },
    {
      photoUrl: "url",
      name: "CommentOutlined",
      likes: 5,
    },
  ];

  return (
    <Layout style={{ height: "100%", minHeight: "100vp", backgroundColor: "var(--accent-bg)" }}>
      <Sider style={{ backgroundColor: "var(--accent-bg)" }}>
        <SideBar tabData={tabData} />
      </Sider>
      <Content
        style={{ backgroundColor: "var(--accent-bg)", marginRight: "16%" }}
      >
        <Row justify="start">
          <Col>
            <ContainerHeader headData={headData} />
          </Col>
        </Row>
        <Row justify="start">
          <Col>
            <UserGroupWrapper>
              <Avatar.Group
                maxCount={5}
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
        </Row>

        <Row>
          <Col span={24}>
            <Wrapper>
              <LadderWrapper>
                <SilverCardWrapper>
                  <div>
                    <TrophyOutlined />
                  </div>
                  <Avatar
                    src={
                      <Image
                        src="https://joeschmoe.io/api/v1/random"
                        style={{ width: 32 }}
                      />
                    }
                  />
                  <h5>name</h5>
                  <p>11 likes</p>
                </SilverCardWrapper>
                <GoldCardWrapper>
                  <div>
                    <TrophyOutlined />
                  </div>
                  <Avatar
                    src={
                      <Image
                        src="https://joeschmoe.io/api/v1/random"
                        style={{ width: 32 }}
                      />
                    }
                  />
                  <h5>name</h5>
                  <p>11 likes</p>
                </GoldCardWrapper>
                <BronzeCardWrapper>
                  <div>
                    <TrophyOutlined />
                  </div>
                  <Avatar
                    src={
                      <Image
                        src="https://joeschmoe.io/api/v1/random"
                        style={{ width: 32 }}
                      />
                    }
                  />
                  <h5>name</h5>
                  <p>11 likes</p>
                </BronzeCardWrapper>
              </LadderWrapper>
              <ListWrapper>
                <div
                  id="scrollableDiv"
                  style={{
                    height: "400px",
                    overflow: "auto",
                    padding: "0 16px",
                  }}
                >
                  <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={
                      <Divider plain>It is all, nothing more 🤐</Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item key={item.id}>
                          <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={
                              <a href="https://ant.design">{item.name.last}</a>
                            }
                          />
                          <div>11 likes</div>
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                </div>
              </ListWrapper>
            </Wrapper>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Leaderboard;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: auto;
  padding: 2rem 0;
  margin-bottom: 5rem;
  background-color: var(--base-0);
  /* transition: var(--transition); */
  font-weight: 400;
`;
const LadderWrapper = styled.div`
  display: flex;
  align-self: center;
  width: 80%;
  justify-content: space-around;
  align-items: flex-end;
  div {
    border-radius: 10px;
  }
`;
const ListWrapper = styled.div`
  align-self: center;
  margin-top: 5rem;
  width: 80%;
`;

const GoldCardWrapper = styled.div`
  padding: 10px 50px 40px 50px;
  border: 2px #ffd700 solid;
  div {
    font-size: 2rem;
    color: #ffd700;
    margin-bottom: 10px;
  }
`;

const SilverCardWrapper = styled.div`
  height: 80%;
  border: 2px #d7d7d7 solid;
  padding: 10px 30px 30px 30px;
  div {
    font-size: 1.5rem;
    color: #d7d7d7;
    margin-bottom: 10px;
  }
`;

const BronzeCardWrapper = styled.div`
  height: 80%;
  border: 2px #ad8a56 solid;
  padding: 10px 30px 30px 30px;
  div {
    font-size: 1.5rem;
    color: #ad8a56;
    margin-bottom: 10px;
  }
`;

const UserGroupWrapper = styled.div`
  margin: 1rem 0 0.5rem 0;
`;
