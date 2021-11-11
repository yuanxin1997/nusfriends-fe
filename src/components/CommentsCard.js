import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HeartFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Tag, Avatar } from "antd";

import styled from "styled-components";
import DeleteModal from "./DeleteModal";
import PlaceholderPicture from "./PlaceholderPicture";
import EditModal from "./EditModal";
import moment from "moment";

function CommentsCard({
  type,
  title,
  description,
  likes,
  tags,
  posted,
  id,
  postedName,
  postedClassification,
  postedPhoto,
  posterId,
  postedDate,
}) {
  const history = useHistory();
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
  const [postTags, setPostTags] = useState([]);
  useEffect(() => {
    tags.map((tag) => postTags.push(tag.name));
  }, []);
  return (
    <div style={{ marginBottom: 20 }}>
      <CommentCard>
        {type === "post" ? (
          <h3 style={{ textAlign: "left", paddingBottom: 15 }}>{title}</h3>
        ) : null}

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
            {moment(postedDate).fromNow()}
          </div>
        </div>

        <p style={{ textAlign: "left", paddingBottom: "10px" }}>
          {description}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Bottom Row (Likes and comments) */}

          {type === "post" ? (
            <div style={styles.bottomRowWrapper}>
              <div>
                {tags.map((tag) => (
                  <Tag color="blue" style={{ padding: "2px 18px" }}>
                    {tag.name}
                  </Tag>
                ))}
              </div>

              <div style={{ display: "flex" }}>
                <HeartFilled style={styles.heartStyles} />
                <text style={styles.textStyle}>{likes}</text>
              </div>
            </div>
          ) : null}
        </div>

        {posted == parseInt(localStorage.userId) ? (
          <div>
            <hr style={{ color: "var(--base-20)", marginTop: 10 }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* Bottom Row (Likes and comments) */}
              <div style={styles.bottomRowWrapper}>
                {type === "post" ? (
                  <div>
                    <a
                      onClick={openDeleteModal}
                      style={styles.manageCommentText}
                    >
                      <DeleteOutlined style={{ marginRight: 5 }} />
                      Delete Post
                    </a>
                    <DeleteModal
                      modalVisible={deleteModalVisible}
                      closeDeleteModal={closeDeleteModal}
                      type="post"
                      id={id}
                    />

                    <a onClick={openEditModal} style={styles.manageCommentText}>
                      <EditOutlined style={{ marginRight: 5 }} />
                      Edit Post
                    </a>

                    <EditModal
                      modalVisible={editModalVisible}
                      closeEditModal={closeEditModal}
                      type="post"
                      titlePlaceholder={title}
                      descriptionPlaceholder={description}
                      id={id}
                      tags={postTags}
                    />
                  </div>
                ) : (
                  <div>
                    <a
                      onClick={openDeleteModal}
                      style={{
                        fontWeight: "normal",
                        color: "var(--base-20)",
                        marginRight: 15,
                      }}
                    >
                      <DeleteOutlined style={{ marginRight: 5 }} />
                      Delete Comment
                    </a>
                    <DeleteModal
                      modalVisible={deleteModalVisible}
                      closeDeleteModal={closeDeleteModal}
                      type="comment"
                      id={id}
                    />

                    <a
                      onClick={openEditModal}
                      style={{
                        fontWeight: "normal",
                        color: "var(--base-20)",
                      }}
                    >
                      <EditOutlined style={{ marginRight: 5 }} />
                      Edit Comment
                    </a>
                    <EditModal
                      modalVisible={editModalVisible}
                      closeEditModal={closeEditModal}
                      type="comment"
                      titlePlaceholder={description}
                      id={id}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </CommentCard>
    </div>
  );
}

const CommentCard = styled.div`
  background-color: var(--base-0);
  border-radius: var(--br-lg);
  width: 1000px;
  box-shadow: var(--shadow);
  margin-bottom: 36x;
  padding: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
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
  heartStyles: {
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
  manageCommentText: {
    fontWeight: "normal",
    color: "var(--base-20)",
    marginRight: 15,
  },
};
export default CommentsCard;
