import React, { useState, useEffect } from "react";

import { Col, Row } from "antd";
import ContainerHeader from "../components/ContainerHeader";
import { Layout, List, Skeleton, Divider } from "antd";
import SideBar from "../components/SideBar";
import CirclePost from "../components/CirclePost.js";
import axios from "axios";
import { Url } from "../constants/global";
import InfiniteScroll from "react-infinite-scroll-component";
const { Header, Footer, Sider, Content } = Layout;

const MyDiscussions = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [cacheData, setCacheData] = useState([]);
  const loadCachedata = () => {
    const cacheInstance = cacheData;
    const lengthToRetrieve =
      cacheInstance.length >= 4 ? 4 : cacheInstance.length;
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
        `${Url}/posts/discussions/${parseInt(localStorage.userId)}`
      );
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
      <Content style={{ backgroundColor: "var(--accent-bg)" }}>
        <Row justify="start">
          <Col>
            <ContainerHeader headData={headData} />
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <InfiniteScroll
              dataLength={data.length}
              next={loadCachedata}
              hasMore={cacheData.length > 0}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                renderItem={(post, index) => (
                  <CirclePost
                    circleNameVisible={true}
                    circleName={post.circlename}
                    circleId={post.circleid}
                    postTitle={post.title}
                    postText={post.content}
                    posted={post.createdat}
                    numLikes={post.likes}
                    numComments={post.comments}
                    postId={post.postid}
                    postedName={post.name}
                    postedClassification={post.classification}
                    postedPhoto={post.photo}
                    posterId={post.userid}
                    postType={post.posttype}
                    polled={false}
                    curUserLiked={post.curuserliked}
                  />
                )}
              />
            </InfiniteScroll>
            {/* {(data || []).map((item, index) => {
              return (
                <CirclePost
                  circleNameVisible={true}
                  circleName={"needs to be fetched"}
                  circleId={item.circleid}
                  postTitle={item.title}
                  postText={item.content}
                  posted={item.createdat}
                  numLikes={item.likes}
                  numComments={item.comments}
                  postId={item.postid}
                  postedName={item.name}
                  postedClassification={item.classification}
                  postedPhoto={item.photo}
                  posterId={item.userid}
                  postType={item.posttype}
                  polled={false}
                  curUserLiked={item.curuserliked}
                />
              );
            })} */}
          </div>
        </Row>
      </Content>
    </Layout>
  );
};

export default MyDiscussions;
