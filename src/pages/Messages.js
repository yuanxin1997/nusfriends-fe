import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams, Link } from "react-router-dom";
import { List, Col, Row, Skeleton, Divider, Avatar } from "antd";
import moment from "moment";
import CircleCard from "../components/CircleCard";
import axios from "axios";
import { Url } from "../constants/global";
import styled from "styled-components";
import { Layout } from "antd";
import jwt_decode from "jwt-decode";
import { generateDarkColorHex } from "../helpers/helper";
import SideBar from "../components/SideBar";
import ContainerHeader from "../components/ContainerHeader";
const { Header, Footer, Sider, Content } = Layout;

const MyInbox = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();

  const loadData = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);

      let jwtToken = localStorage.getItem("jwt");
      var userId = jwt_decode(jwtToken).user.userId;
      console.log(userId);
      const { data: results } = await axios.get(
        `${Url}/messages/${id}?userId=${userId}`,
        {
          headers: {
            authorization: localStorage.getItem("jwt"),
          },
        }
      );
      console.log(results);

      setData(results);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // loadMoreData();
    loadData();
  }, [id]);
  /* START -- SETUP FOR COMPONENT */

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
                      {data && (
                        <ContentWrapper>
                          <h5>Message From:</h5>
                          <SenderWrapper>
                            {data.photo ? (
                              <Avatar src={data.photo} />
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
                                  {(data.name || "").charAt(0)}
                                </span>
                              </Avatar>
                            )}
                            <Sender>
                              <Link to={`/user/${data.userid}`}>
                                {data.name}
                              </Link>
                            </Sender>
                          </SenderWrapper>
                          <p>{data.content}</p>
                          <p>{moment(data.createdat).fromNow()}</p>
                        </ContentWrapper>
                      )}
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
