import React, { useState } from "react";
import styled from "styled-components";
import CirclePost from "../components/CirclePost";

import { Layout } from "antd";

function Home() {
  const userName = "John";
  const { Content } = Layout;
  // dummy data, to be replaced by API call
  const [posts, setPosts] = useState([
    {
      id: 1,
      circleName: "Lost And Found",
      postTitle: "Test Title",
      postText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus nulla sagittis sapien et. A vel tortor vestibulum arcu, diam netus consectetur. Et, a interdum adipiscing viverra congue. Purus cursus id aliquam turpis vitae non.",
      posted: "20h",
      numLikes: 77,
      numComments: 123,
    },
    {
      id: 2,
      circleName: "NUS Computing",
      postTitle: "Which is the best professor?",
      postText: "HSIANG HUI OR WEEKEK?",
      posted: "23h",
      numLikes: 27,
      numComments: 153,
    },
  ]);

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          backgroundColor: "#FBF7F7",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <h1>Welcome Back, {userName}</h1>
      </div>

      <Layout style={{ height: "100vh", backgroundColor: "var(--accent-bg)" }}>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {posts.map((post) => (
            <CirclePost
              circleNameVisible={true}
              circleName={post.circleName}
              postTitle={post.postTitle}
              postText={post.postText}
              posted={post.posted}
              numLikes={post.numLikes}
              numComments={post.numComments}
            />
          ))}
        </Content>
      </Layout>
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
