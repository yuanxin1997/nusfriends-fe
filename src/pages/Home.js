import React, { useState } from "react";
import styled from "styled-components";
import CirclePost from "../components/CirclePost";

function Home() {
  // dummy data, have to change by getting data from database
  const userName = "John";
  const circleName = "Lost and Found";
  const dummyText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus nulla sagittis sapien et. A vel tortor vestibulum arcu, diam netus consectetur. Et, a interdum adipiscing viverra congue. Purus cursus id aliquam turpis vitae non.";
  const posted = "20h";
  const numLikes = 77;
  const numComments = 123;

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

      <div
        style={{
          backgroundColor: "var(--accent-bg)",
          position: "fixed",
          width: "100%",
          height: "100%",
          overflowX: "hidden",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CirclePost
          circleName={circleName}
          postText={dummyText}
          posted={posted}
          numLikes={numLikes}
          numComments={numComments}
        />
      </div>
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
