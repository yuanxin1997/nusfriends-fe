import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Avatar, Col, Row, Tooltip, Spin } from "antd";

import styled from "styled-components";

import axios from "axios";
import { Url } from "../constants/global";

import PlaceholderPicture from "./PlaceholderPicture";

function CircleCard({ circleName, numMembers, circleId, avatarData }) {
  const [subscribers, setSubscribers] = useState([]);
  const [subCount, setSubCount] = useState();
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      await axios.get(`${Url}/circles/subscribers/${circleId}`).then((res) => {
        setSubscribers(res.data);
        setSubCount(res.data.length);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);
  return (
    <div>
      {" "}
      {loading ? (
        <Spin />
      ) : (
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
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >
                      {subscribers.map((subscriber) =>
                        subscriber.photo ? (
                          <Avatar
                            key={subscriber.userid}
                            src={subscriber.photo}
                          />
                        ) : (
                          <PlaceholderPicture
                            height={"40px"}
                            width={"40px"}
                            name={subscriber.name}
                          />
                        )
                      )}
                    </Avatar.Group>
                  </UserGroupWrapper>
                </Col>
              </Row>
              <div>
                {numMembers} {subCount} members
              </div>
            </div>
          </Link>
        </div>
      )}
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
