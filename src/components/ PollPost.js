import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Tag, Avatar, Radio, Space, Button, Progress, Spin } from "antd";
import {
  HeartFilled,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import PlaceholderPicture from "./PlaceholderPicture";

import axios from "axios";
import { Url } from "../constants/global";
import moment from "moment";

function PollPost({
  postTitle,
  posted,
  numLikes,
  postId,
  postedName,
  postedClassification,
  postedPhoto,
  posterId,
  postType,
  polled,
  curUserLiked,
  postTags,
}) {
  const history = useHistory();

  const [value, setValue] = useState();
  const [poll, setPoll] = useState([]);
  const [loading, setLoading] = useState(true);
  // to replicate check from BE if user has polled
  const [hasPolled, setHasPolled] = useState(false);
  const [totalPollVote, setTotalPollVote] = useState(0);
  const [currPollOptions, setCurrPollOptions] = useState([]);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const isMounted = useRef(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [pollTags, setPollTags] = useState([]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const openDeleteModal = () => setDeleteModalVisible(true);
  function closeDeleteModal() {
    setDeleteModalVisible(false);
  }
  const [editModalVisible, setEditModalVisible] = useState(false);
  const openEditModal = () => setEditModalVisible(true);
  function closeEditModal() {
    setEditModalVisible(false);
  }

  const handleLike = async (ev) => {
    // alert("hey");
    ev.preventDefault();

    const updateOption = {
      user: { userId: parseInt(localStorage.userId) },
    };

    if (!hasLiked) {
      await axios.post(`${Url}/posts/like/${postId}`, updateOption);
      setHasLiked(true);
      setTotalLikes((prev) => parseInt(prev) + parseInt(1));
    } else {
      await axios.post(`${Url}/posts/unlike/${postId}`, updateOption);
      setHasLiked(false);
      setTotalLikes((prev) => parseInt(prev) - parseInt(1));
    }
  };

  const handleVote = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();
    const optionId = currPollOptions[value - 1].optionid;
    const updateOption = {
      user: { userId: parseInt(localStorage.userId) },
      options: [{ optionId: parseInt(optionId) }],
    };
    console.log(updateOption);
    console.log(value);
    await axios.post(`${Url}/options/submit`, updateOption);
    setRefreshComponent(!refreshComponent);
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const fetchPoll = async () => {
    try {
      await axios
        .get(`${Url}/polls/${postId}?userId=${parseInt(localStorage.userId)}`)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          setCurrPollOptions(res.data.options);
          handleTotalVote(res.data.options);
          setPoll(res.data);
          checkHasPolled(res.data.options);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function checkHasPolled(data) {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      console.log("curr: " + data[i].curuservoted);
      if (data[i].curuservoted === true) {
        setHasPolled(true);
        break;
      }
    }
  }

  let total = 0;
  async function handleTotalVote(data) {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].numvote);
      console.log("curr num vote: " + data[i].numvote);
      total += parseInt(data[i].numvote);
      console.log("total: " + total);
    }
    console.log("end");
    setTotalPollVote(total);
  }

  useEffect(() => {
    if (isMounted.current) {
      fetchPoll();
    } else {
      isMounted.current = true;
    }
  }, [refreshComponent]);

  useEffect(() => {
    if (postType === "poll") {
      setHasLiked(curUserLiked);
      setTotalLikes(numLikes);
      fetchPoll();
      console.log("total: " + totalPollVote);
      console.log("hasPolled: " + hasPolled);
      postTags.map((tag) => pollTags.push(tag.name));
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <div style={{ width: "1000px" }}>
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
                {moment(posted).fromNow()}
              </div>
            </div>

            <div>
              <div>
                <h3
                  style={{
                    textAlign: "left",
                    paddingBottom: "10px",
                  }}
                >
                  {postTitle}
                </h3>
              </div>

              {hasPolled === false ? (
                <div
                  style={{
                    textAlign: "left",
                    paddingBottom: "15px",
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
                          (parseInt(pollOption.numvote) / totalPollVote) * 100
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
                  marginTop: 10,
                }}
              >
                <div style={styles.bottomRowWrapper}>
                  <div>
                    {postTags.map((tag) => (
                      <Tag color="blue" style={{ padding: "2px 18px" }}>
                        {tag.name}
                      </Tag>
                    ))}
                  </div>

                  <div style={{ display: "flex" }}>
                    <HeartFilled style={styles.heartStyles} />
                    <text style={styles.textStyle}>{numLikes}</text>
                  </div>
                </div>
              </div>
            </div>

            {posterId === parseInt(localStorage.userId) ? (
              <div>
                <hr style={{ color: "var(--base-20)", marginTop: 10 }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div>
                    <a
                      onClick={openDeleteModal}
                      style={styles.manageCommentText}
                    >
                      <DeleteOutlined style={{ marginRight: 5 }} />
                      Delete Poll
                    </a>
                    <DeleteModal
                      modalVisible={deleteModalVisible}
                      closeDeleteModal={closeDeleteModal}
                      type="poll"
                      id={postId}
                    />

                    <a onClick={openEditModal} style={styles.manageCommentText}>
                      <EditOutlined style={{ marginRight: 5 }} />
                      Edit Poll
                    </a>

                    <EditModal
                      modalVisible={editModalVisible}
                      closeEditModal={closeEditModal}
                      type="poll"
                      titlePlaceholder={postTitle}
                      id={postId}
                      tags={pollTags}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </CircleCard>
        </div>
      )}
    </div>
  );
}
const CircleCard = styled.div`
  background-color: var(--base-0);
  border-radius: var(--br-lg);

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
  bottomRowWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: "10px",
    display: "flex",
    alignItems: "center",
  },
  manageCommentText: {
    fontWeight: "normal",
    color: "var(--base-20)",
    marginRight: 15,
  },
  heartStyles: {
    color: "#D25864",
    fontSize: "20px",
    paddingRight: "10px",
  },
};
export default PollPost;
