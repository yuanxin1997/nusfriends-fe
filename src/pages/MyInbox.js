import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { List, Col, Row, Skeleton, Divider, Avatar } from "antd";
import CircleCard from "../components/CircleCard";
import moment from "moment";
import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
import axios from "axios";
import { Url } from "../constants/global";
import { generateDarkColorHex } from "../helpers/helper";
import { Link } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

const MyInbox = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [cacheData, setCacheData] = useState([]);

  const loadCachedata = () => {
    const cacheInstance = cacheData;
    const lengthToRetrieve =
      cacheInstance.length >= 6 ? 6 : cacheInstance.length;
    const unloadedCacheData = cacheInstance.splice(0, lengthToRetrieve);
    setData([...data, ...unloadedCacheData]);
    setCacheData([...cacheInstance]);
  };

  const loadData = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const { data: results } = await axios.get(
        `${Url}/messages/user/${localStorage.getItem("userId")}`,
        {
          headers: {
            authorization: localStorage.getItem("jwt"),
          },
        }
      );
      console.log(results);
      setTotalData(results.length);
      const cacheInstance = [...results];
      // cacheInstance.splice(0,7); testing UI
      const lengthToRetrieve =
        cacheInstance.length >= 6 ? 6 : cacheInstance.length;
      const unloadedCacheData = cacheInstance.splice(0, lengthToRetrieve);
      setCacheData(cacheInstance);
      setData(unloadedCacheData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
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
                  <p>You have {totalData || 0} messages</p>
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
                      next={loadCachedata}
                      hasMore={cacheData.length > 0}
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
                              avatar={
                                item.photo ? (
                                  <Avatar // no photo data yet to test />/ to be replace by {item.photo}
                                    src={item.photo}
                                  />
                                ) : (
                                  <Avatar
                                    className="avatar-sdn"
                                    style={{
                                      color: "#ffffff",
                                      backgroundColor: `${generateDarkColorHex()}`,
                                    }}
                                    size="large"
                                  >
                                    <span style={{ fontSize: "var(--fs-b1" }}>
                                      {item.name.charAt(0)}
                                    </span>
                                  </Avatar>
                                )
                              }
                              title={
                                <span>
                                  <Link to={`/user/${item.userid}`}>
                                    {trim(item.name)}
                                  </Link>
                                </span>
                              }
                              description={
                                <Link
                                  to={`/my-inbox/messages/${item.messageid}`}
                                >
                                  {trim(item.content)}
                                </Link>
                              }
                            />
                            <div>{moment(item.createdat).fromNow()}</div>
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
