import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import CircleCard from "../components/CircleCard";
import { TeamOutlined, BulbOutlined, CommentOutlined } from "@ant-design/icons";

function MyCircles() {
  const [circles, setCircles] = useState([
    {
      circleName: "NUS Computing",
      numMembers: 365,
    },
    {
      circleName: "Kayaking at NUS",
      numMembers: 365,
    },
    {
      circleName: "NUS Science",
      numMembers: 365,
    },
    {
      circleName: "NUS Dating",
      numMembers: 365,
    },
    {
      circleName: "Internship",
      numMembers: 365,
    },
  ]);

  return (
    <div>
      <div style={styles.background}>
        <div style={styles.leftTab}>
          {/* empty top border */}
          <div style={{ flex: 1.5 }}></div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TeamOutlined style={styles.tabIcons} />
              <Link>
                <h4 style={styles.selectedTab}>My Circles</h4>
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <CommentOutlined style={styles.tabIcons} />
              <Link>
                <h4 style={styles.unselectedTab}>My Discussions</h4>
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <BulbOutlined style={styles.tabIcons} />
              <Link>
                <h4 style={styles.unselectedTab}>My Answers</h4>
              </Link>
            </div>
          </div>

          {/* empty bottom border */}
          <div style={{ flex: 6 }}></div>
        </div>

        {/* Circles display */}
        <div
          style={{
            height: "100%",
            width: "85%",
            display: "flex",
            flexDirection: "column",
            marginLeft: 15,
          }}
        >
          <div style={{ flex: 1.5 }}>
            <h1 style={{ textAlign: "left", marginTop: 20 }}>My Circles</h1>
          </div>

          <div
            style={{
              flex: 7,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{}}>
              <Row gutter={16}>
                {circles.map((circle) => (
                  <Col span={8}>
                    <CircleCard
                      circleName={circle.circleName}
                      numMembers={circle.numMembers}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  background: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    position: "fixed",
    flex: 1,
    backgroundColor: "var(--accent-bg)",
  },
  leftTab: {
    width: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  tabIcons: { fontSize: 24, marginRight: "10px" },
  selectedTab: { marginBottom: "16px" },
  unselectedTab: {
    color: "#D4D5D8",
    marginBottom: "16px",
  },
};

export default MyCircles;
