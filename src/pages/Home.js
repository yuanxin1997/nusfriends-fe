import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CirclePost from "../components/CirclePost";

import { Layout, Spin } from "antd";

import axios from "axios";
import { Url } from "../constants/global";
function Home() {
  const userName = "John";
  const { Content } = Layout;
  // dummy data, to be replaced by API call
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

  const fetchHomePosts = async () => {
    try {
      await axios
        .get(`${Url}/posts/home/${parseInt(localStorage.userId)}`)
        .then((res) => {
          setPosts(res.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHomePosts();
  }, []);

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "#FBF7F7",
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <h1>Welcome Back, {localStorage.name}</h1>
          </div>

          <Layout
            style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}
          >
            <Content
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {posts.map((post) => (
                <CirclePost
                  circleId={post.circleid}
                  circleNameVisible={true}
                  circleName={"need to fetch"}
                  postTitle={post.title}
                  postText={post.content}
                  postId={post.postid}
                  posted={post.posted}
                  numLikes={post.likes}
                  numComments={post.comments}
                  postedName={post.name}
                  postedClassification={post.classification}
                />
              ))}
            </Content>
          </Layout>
        </div>
      )}
    </div>
  );
}

const CircleCard = styled.div`
  background-color: var(--base-0);
  border-radius: var(--br-lg);
  width: 750px;
  box-shadow: var(--shadow);
  margin-bottom: 36px;
  padding: 16px;
`;

const ProfileCard = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: row;

  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 10px var(--accent-lightpink);
    .profilename {
      color: var(--accent-darkpink);
    }
    .profileinfo {
      color: var(--accent-lightpink);
    }
    .profilepicture {
      box-shadow: var(--shadow);
    }
  }
`;

const ProfileName = styled.span`
  font-size: var(--fs-b4);
  color: var(--base-100);
`;

const ProfileInfo = styled.span`
  font-size: var(--fs-b3);
  color: var(--base-20);
`;

export default Home;
