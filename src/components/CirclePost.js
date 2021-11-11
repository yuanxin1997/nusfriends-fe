import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import styled, { StyleSheetManager } from "styled-components";
import { Tag, Avatar, Radio, Input, Space, Button, Progress, Spin } from "antd";
import { HeartFilled, CommentOutlined } from "@ant-design/icons";

import PlaceholderPicture from "./PlaceholderPicture";

import axios from "axios";
import { Url } from "../constants/global";

function CirclePost({
  circleNameVisible,
  circleName,
  postTitle,
  postText,
  posted,
  numLikes,
  numComments,
  circleId,
  postId,
  postedName,
  postedClassification,
  postedPhoto,
  posterId,
  currUserLiked,
  postType,
  polled,
}) {
  const history = useHistory();

  const [value, setValue] = useState();
  const [poll, setPoll] = useState([]);
  const [loading, setLoading] = useState(true);
  // to replicate check from BE if user has polled
  const [hasPolled, setHasPolled] = useState(false);
  const [totalPollVote, setTotalPollVote] = useState(0);
  const [currPollOptions, setCurrPollOptions] = useState([]);
  const handleVote = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
    const optionId = currPollOptions[value - 1].optionid;
    const updateOption = {
      user: { userId: parseInt(localStorage.userId) },
      options: [{ optionId: optionId }],
    };
    console.log(updateOption);
    console.log(value);
    await axios.post(`${Url}/options/submit`, updateOption);
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const fetchPoll = async () => {
    try {
      await axios.get(`${Url}/polls/${postId}`).then((res) => {
        console.log(JSON.stringify(res.data));
        setCurrPollOptions(res.data.options);
        handleTotalVote(res.data.options);
        setPoll(res.data);
        checkHasPolled(res.data.options);
        console.log(polled);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function checkHasPolled(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].currUserLiked === true) {
        setHasPolled(true);
        break;
      }
    }
  }

  async function handleTotalVote(data) {
    const sum = data
      .map((item) => item.numvote)
      .reduce((prev, curr) => prev + curr, 0);
    setTotalPollVote(sum);
  }

  useEffect(() => {
    if (postType == "poll") {
      fetchPoll();
      console.log("fetched");
      console.log("total: " + totalPollVote);
      console.log("hasPolled: " + hasPolled);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <div style={{ width: "750px" }}>
          <h3 style={{ textAlign: "left" }}>
            {circleNameVisible === true ? circleName : null}
          </h3>

          <CircleCard>
            <div style={styles.wrapper}>
              <a onClick={() => history.push("/user/" + posterId)}>
                <div style={styles.userWrapper}>
                  <ProfileCard>
                    {/* Profile and user details*/}
                    {postedPhoto ? (
                      <Avatar
                        src={postedPhoto}
                        size={40}
                        style={{ marginRight: 5 }}
                      />
                    ) : (
                      <PlaceholderPicture
                        height={"40px"}
                        width={"40px"}
                        name={postedName}
                      />
                    )}

                    {/* to input profile details */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        marginLeft: 10,
                      }}
                      className="profileitems"
                    >
                      <ProfileName className="profilename">
                        {postedName}
                      </ProfileName>
                      <ProfileInfo className="profileinfo">
                        {postedClassification}
                      </ProfileInfo>
                    </div>
                  </ProfileCard>
                </div>
              </a>
              {/* Right side for when Circles post was posted*/}
              <div
                style={{
                  flexDirection: "row-reverse",
                  display: "flex",
                  textAlign: "right",
                }}
              >
                {posted}
              </div>
            </div>
            <Link
              to={{
                pathname:
                  "/my-circles/" + circleId + "/" + postId + "/comments",
              }}
              onClick={() => console.log("clicked")}
            >
              <div>
                <h4 style={{ textAlign: "left", paddingBottom: "2px" }}>
                  {postTitle}
                </h4>
                <div
                  style={{
                    alignContent: "left",
                    textAlign: "left",
                    justifyContent: "left",
                    paddingBottom: "15px",
                  }}
                >
                  <Tag color="var(--accent-lightpink)">
                    {postType === "discussion" ? "disussion" : "poll"}
                  </Tag>
                </div>
              </div>

              {postType === "discussion" ? (
                <div
                  style={{
                    textAlign: "left",
                    paddingBottom: "15px",
                  }}
                >
                  <p
                    style={{
                      paddingBottom: "10px",
                      fontWeight: "normal",
                    }}
                  >
                    {postText}
                  </p>
                </div>
              ) : hasPolled === false ? (
                <div
                  style={{
                    textAlign: "left",
                    paddingBottom: "15px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div>
                    <Radio.Group value={value} onChange={(e) => onChange(e)}>
                      <Space direction="vertical">
                        {poll.options.map((pollOption, index) => (
                          <Radio
                            value={index + 1}
                            style={{ fontWeight: "normal" }}
                          >
                            {pollOption.optioncontent}
                          </Radio>
                        ))}
                      </Space>
                    </Radio.Group>
                  </div>

                  <Button
                    style={{ marginTop: 15, marginBottom: 10 }}
                    type="primary"
                    onClick={(e) => {
                      handleVote(e);
                    }}
                  >
                    Vote
                  </Button>
                </div>
              ) : (
                <div>
                  {poll.options.map((pollOption) => (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div style={{ width: "25%", textAlign: "center" }}>
                        <p style={{ marginRight: 30, fontWeight: "normal" }}>
                          {pollOption.optioncontent}
                        </p>
                      </div>
                      <Progress
                        strokeColor="var(--accent-lightpink)"
                        percent={Math.round(
                          (pollOption.numvote / totalPollVote) * 100
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {/* Bottom Row (Likes and comments) */}
                <div style={styles.bottomRowWrapper}>
                  <HeartFilled
                    style={
                      currUserLiked ? styles.likedStyles : styles.unlikedStyles
                    }
                  />
                  <text style={styles.textStyle}>{numLikes}</text>

                  <CommentOutlined style={styles.commentStyle} />

                  <text style={styles.textStyle}>{numComments}</text>
                </div>
              </div>
            </Link>
          </CircleCard>
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

const styles = {
  wrapper: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    paddingBottom: "20px",
    overflowX: "hidden",
  },
  userWrapper: {
    flexDirection: "row",
    display: "flex",
  },
  bottomRowWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: "10px",
    display: "flex",
    alignItems: "center",
  },
  likedStyles: {
    color: "#D25864",
    fontSize: "20px",
    paddingRight: "10px",
  },
  textStyle: {
    color: "#D25864",
    fontSize: 16,
    paddingRight: "30px",
  },
  commentStyle: {
    color: "#D25864",
    fontSize: "20px",
    paddingRight: "15px",
  },
  unlikedStyles: {
    color: "var(--base-20)",
    fontSize: "20px",
    paddingRight: "10px",
  },
};
export default CirclePost;
