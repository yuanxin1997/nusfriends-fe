import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { List, Col, Row, Skeleton, Divider, Avatar } from "antd";
import moment from "moment";
import CircleCard from "../components/CircleCard";
import axios from "axios";
import { Url } from "../constants/global";
import styled from "styled-components";
import { Layout } from "antd";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
const { Header, Footer, Sider, Content } = Layout;

const MyInbox = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadData = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const { data: results } = await axios.get(`${Url}/messageId/1`);
      console.log(data);

      setData(results);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
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
      path: "/my-circles/replace by id/my-discussions",
    },
    {
      icon: "TrophyOutlined",
      title: "Leaderboard",
      path: "/my-circles/replace by id/circles",
    },
  ];

  const headData = {
    title: "Messages",
    breadcrumbData: [
      {
        name: "My Inbox",
        path: "/my-inbox",
      },
      {
        name: "Messages",
        path: "/my-inbox/messages",
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
                <CardWrapper>
                  <Row>
                    <Col span={24}>
                      <ContentWrapper>
                        <h5>Message From:</h5>
                        <SenderWrapper>
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                          <Sender>name</Sender>
                        </SenderWrapper>
                        <p>
                          Why do we use it? It is a long established fact that a
                          reader will be distracted by the readable content of a
                          page when looking at its layout. The point of using
                          Lorem Ipsum is that it has a more-or-less normal
                          distribution of letters, as opposed to using 'Content
                          here, content here', making it look like readable
                          English. Many desktop publishing packages and web page
                          editors now use Lorem Ipsum as their default model
                          text, and a search for 'lorem ipsum' will uncover many
                          web sites still in their infancy. Various versions
                          have evolved over the years, sometimes by accident,
                          sometimes on purpose (injected humour and the like).
                        </p>
                        <p>{moment([2021, 9, 20]).fromNow()}</p>
                      </ContentWrapper>
                    </Col>
                  </Row>
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

const CardWrapper = styled.div`
  background-color: var(--base-0);
  font-weight: 400;
  padding: 5rem;
  p {
     
  }
`;

const ContentWrapper = styled.div`
  text-align: left;
`;

const Sender = styled.div`
    margin-left: 1rem;

    align-self: center;
`;

const SenderWrapper = styled.div`
  display: flex;
  margin: 2rem 0;
`;

export default MyInbox;
