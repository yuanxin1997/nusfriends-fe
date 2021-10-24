import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { List, Col, Row, Skeleton, Divider, Avatar } from "antd";
import CircleCard from "../components/CircleCard";
import moment from 'moment';
import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
const { Header, Footer, Sider, Content } = Layout;

const MyInbox = () => {
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
    title: "My Inbox",
    breadcrumbData: [
      {
        name: "My Inbox",
        path: "/my-inbox",
      },
    ],
  };
  /* END -- SETUP FOR COMPONENT */
  function trim(content) {
    if (content.length > 150) {
      return content.slice(0, 150) + "...";
    } else {
      return content;
    }
  }

  return (
    <Layout style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}>
      <Content
        style={{
          backgroundColor: "var(--accent-bg)",
          width: "80%",
          display: "flex",
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <Wrapper>
          <Row justify="start">
            <Col>
              <ContainerHeader headData={headData} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <CotainerWrapper>
                <InfoWrapper>
                  <p>You have {data.length} messages</p>
                </InfoWrapper>
                <CardWrapper>
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
                      loader={
                        <Skeleton avatar paragraph={{ rows: 1 }} active />
                      }
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
                                <a href="/my-inbox/messages">
                                  {trim(
                                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                  )}
                                </a>
                              }
                            />
                            <div>{moment([2021, 9, 20]).fromNow()}</div>
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                </CardWrapper>
              </CotainerWrapper>
            </Col>
          </Row>
        </Wrapper>
      </Content>
    </Layout>
  );
};

const Wrapper = styled.div``;

const CotainerWrapper = styled.div`
  margin-top: 1rem;
  flex-grow: 1;
`;

const InfoWrapper = styled.div`
  margin: 1rem 0;
  text-align: center;
  color: var(--base-20);
  font-size: var(--fs-h5);
  font-weight: 700;
`;

const CardWrapper = styled.div`
  background-color: var(--base-0);
  font-weight: 400;
`;

export default MyInbox;
