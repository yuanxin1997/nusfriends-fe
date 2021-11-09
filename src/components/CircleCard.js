import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Avatar, Col, Row, Tooltip } from "antd";

import styled from "styled-components";

function CircleCard({ circleName, numMembers, circleId, avatarData }) {
  return (
    <div style={{ width: "300px" }}>
      <Link
        to={{
          pathname: "my-circles/" + circleId + "/all-posts",
          circleName: circleName,
          circleId: circleId,
        }}
        onClick={() => console.log("clicked")}
      >
        <div style={styles.circleCardWrapper}>
          <div style={{ paddingBottom: "20px" }}>
            <h3>{circleName}</h3>
          </div>
          <Row justify="start">
            <Col>
              <UserGroupWrapper>
                <Avatar.Group
                  maxCount={5}
                  size="large"
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {avatarData.map((item, index) => (
                    <Avatar key={index} src={item.picture.large} />
                  ))}
                  <Tooltip title="Ant User" placement="top"></Tooltip>
                </Avatar.Group>
              </UserGroupWrapper>
            </Col>
          </Row>
          <div>{numMembers} members</div>
        </div>
      </Link>
    </div>
  );
}

const UserGroupWrapper = styled.div`
  margin: 1rem 0 0.5rem 0;
`;

const styles = {
  circleCardWrapper: {
    height: "280px",
    width: "300px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
    backgroundColor: "#FFFFFF",
  },
};

export default CircleCard;
