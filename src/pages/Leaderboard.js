import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { List, Avatar, Col, Row, Card, Skeleton, Divider, message } from "antd";
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
    <Layout style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}>
      <Sider style={{ backgroundColor: "var(--accent-bg)" }}>
        <SideBar tabData={tabData} />
      </Sider>
      <Content
        style={{ backgroundColor: "var(--accent-bg)", marginRight: "10%" }}
      >
        <Row justify="start">
          <Col>
            <ContainerHeader headData={headData} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Wrapper>
                <LadderWrapper>
                    
                </LadderWrapper>
              <ListWrapper>
                <div
                  id="scrollableDiv"
                  style={{
                    height: 400,
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
  height: 600px;
  background-color: white;
  /* transition: var(--transition); */
  font-weight: 400;
`;
const LadderWrapper = styled.div`

`;
const ListWrapper = styled.div`
  margin-top: 5rem;
  width: 80%;
`;

// const ItemWrapper = styled.div`
//   border: 1px red solid;
//   display: flex;
//   height: 50px;
//   justify-content: flex-start;
//   padding: 1em 2em 1em;
//   align-items: center;
// `;
