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
  Badge,
} from "antd";
import {
  TrophyOutlined,
  UserOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import CircleCard from "../components/CircleCard";
import axios from "axios";
import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
import { Url } from "../constants/global";
import { generateDarkColorHex } from "../helpers/helper";
const { Header, Footer, Sider, Content } = Layout;

const Leaderboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [ladder, setLadder] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [cacheData, setCacheData] = useState([]);

  const loadCachedata = () => {
    const cacheInstance = cacheData;
    const lengthToRetrieve =
      cacheInstance.length >= 8 ? 8 : cacheInstance.length;
    const unloadedCacheData = cacheInstance.splice(0, lengthToRetrieve);
    setData([...data, ...unloadedCacheData]);
    setCacheData(cacheInstance);
  };

  const loadData = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const { data: results } = await axios.get(`${Url}/users/leaderboard`);
      console.log(data);
      const cacheInstance = [...results];
      // cacheInstance.splice(0,7); testing UI

      const ladderData = cacheInstance.splice(0, 3);
      setLadder(ladderData);
      setTotalData(cacheInstance.length);
      const lengthToRetrieve =
        cacheInstance.length >= 8 ? 8 : cacheInstance.length;
      const unloadedCacheData = cacheInstance.splice(0, lengthToRetrieve);
      setCacheData(cacheInstance);
      setData(unloadedCacheData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

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
        console.log("hey", ...data);
        console.log("heee", body.results);
        console.log("soread", ...body.results);
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // loadMoreData();
    loadData();
  }, []);
  /* START -- SETUP FOR COMPONENT */
  const tabData = [
    {
      icon: "CommentOutlined",
      title: "All Posts",
      path: "/my-circles/replace by id/all-posts",
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
    <Layout
      style={{
        height: "100%",
        minHeight: "100vp",
        backgroundColor: "var(--accent-bg)",
      }}
    >
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
              {/* <Avatar.Group
                maxCount={5}
                size="large"
                maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
              >
                {data.map((item, index) => (
                  <Avatar key={index} src={item.picture.large} />
                ))}
                <Tooltip title="Ant User" placement="top"></Tooltip>
              </Avatar.Group> */}
            </UserGroupWrapper>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Wrapper>
              <LadderWrapper>
                {ladder[1] && (
                  <SilverCardWrapper>
                    <div>
                      <TrophyOutlined />
                    </div>
                    <Badge count={2} color="var(--accent-redpink)">
                      {/* <Avatar
                      src={
                        <Image
                          src="https://joeschmoe.io/api/v1/random"
                          style={{ width: 32 }}
                        />
                      }
                    /> */}
                      <Avatar
                        className="avatar-sdn"
                        style={{
                          color: "#ffffff",
                          backgroundColor: `${generateDarkColorHex()}`,
                        }}
                        size="large"
                      >
                        <span style={{ fontSize: "var(--fs-b1" }}>
                          {ladder[1].name.charAt(0)}
                        </span>
                      </Avatar>
                    </Badge>
                    <h5>{ladder[1].name}</h5>
                    <p>{ladder[1].no_likes} likes</p>
                  </SilverCardWrapper>
                )}
                {ladder[0] && (
                  <GoldCardWrapper>
                    <div>
                      <TrophyOutlined />
                    </div>

                    <Badge count={1} color="var(--accent-redpink)">
                      {/* <Avatar
                      src={
                        <Image
                          src="https://joeschmoe.io/api/v1/random"
                          style={{ width: 32 }}
                        />
                      }
                    /> */}
                      <Avatar
                        className="avatar-sdn"
                        style={{
                          color: "#ffffff",
                          backgroundColor: `${generateDarkColorHex()}`,
                        }}
                        size="large"
                      >
                        <span style={{ fontSize: "var(--fs-b1" }}>
                          {ladder[0].name.charAt(0)}
                        </span>
                      </Avatar>
                    </Badge>
                    <h5>{ladder[0].name}</h5>
                    <p>{ladder[0].no_likes} likes</p>
                  </GoldCardWrapper>
                )}
                {ladder[2] && (
                  <BronzeCardWrapper>
                    <div>
                      <TrophyOutlined />
                    </div>
                    <Badge count={3} color="var(--accent-redpink)">
                      {/* <Avatar
                      src={
                        <Image
                          src="https://joeschmoe.io/api/v1/random"
                          style={{ width: 32 }}
                        />
                      }
                    /> */}
                      <Avatar
                        className="avatar-sdn"
                        style={{
                          color: "#ffffff",
                          backgroundColor: `${generateDarkColorHex()}`,
                        }}
                        size="large"
                      >
                        <span style={{ fontSize: "var(--fs-b1" }}>
                          {ladder[2].name.charAt(0)}
                        </span>
                      </Avatar>
                    </Badge>
                    <h5>{ladder[2].name}</h5>
                    <p>{ladder[2].no_likes} likes</p>
                  </BronzeCardWrapper>
                )}
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
                    dataLength={totalData}
                    next={loadCachedata}
                    hasMore={cacheData.length > 0}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={
                      <Divider plain>It is all, nothing more 🤐</Divider>
                    }
                    scrollableTarget="scrollableDiv"
                  >
                    <List
                      dataSource={data}
                      renderItem={(item, index) => (
                        <List.Item key={item.id}>
                          <List.Item.Meta
                            avatar={
                              <Badge
                                count={index + 4}
                                color="var(--accent-redpink)"
                              >
                                {/* <Avatar src={item.picture.large} /> */}
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
                              </Badge>
                            }
                            title={<a href="https://ant.design">{item.name}</a>}
                          />
                          <div>{item.no_likes}</div>
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
  padding: 10px 40px 30px 40px;
  div {
    font-size: 1.5rem;
    color: #d7d7d7;
    margin-bottom: 10px;
  }
`;

const BronzeCardWrapper = styled.div`
  height: 80%;
  border: 2px #ad8a56 solid;
  padding: 10px 40px 30px 40px;
  div {
    font-size: 1.5rem;
    color: #ad8a56;
    margin-bottom: 10px;
  }
`;

const UserGroupWrapper = styled.div`
  margin: 1rem 0 0.5rem 0;
`;

export default Leaderboard;
