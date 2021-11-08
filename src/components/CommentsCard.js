import React from "react";

import { HeartFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";

import styled from "styled-components";

function CommentsCard({ type, title, description, numLikes, tags, posted }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <CommentCard>
        {type === "post" ? (
          <h3 style={{ textAlign: "left", paddingBottom: 15 }}>{title}</h3>
        ) : null}

        <div style={styles.wrapper}>
          <div style={styles.userWrapper}>
            <ProfileCard>
              {/* Profile and user details*/}
              {/* temp holder for profile pic */}
              <div
                style={{
                  display: "flex",
                  backgroundColor: "var(--accent-lightpink)",
                  borderRadius: "var(--br-sm)",
                  height: "40px",
                  width: "40px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "16px",
                }}
                className="profilepicture"
              >
                J
              </div>

              {/* to input profile details */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
                className="profileitems"
              >
                <ProfileName className="profilename">John Doe</ProfileName>
                <ProfileInfo className="profileinfo">
                  Y3 Information Systems
                </ProfileInfo>
              </div>
            </ProfileCard>
          </div>
          {/* Right side for when Circles post was posted*/}
          <div
            style={{
              flexDirection: "row-reverse",
              display: "flex",
              textAlign: "right",
            }}
          >
            20h
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
          <div style={styles.bottomRowWrapper}>
            {type === "post" ? (
              <div>
                <text style={styles.textStyle}>Python</text>

                <text style={styles.textStyle}>Programming</text>
              </div>
            ) : null}

            <div style={{ display: "flex" }}>
              <HeartFilled style={styles.heartStyles} />
              <text style={styles.textStyle}>{numLikes}</text>
            </div>
          </div>
        </div>

        <hr style={{ color: "var(--base-20)", marginTop: 30 }} />
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
                  style={{
                    fontWeight: "normal",
                    color: "var(--base-20)",
                    marginRight: 15,
                  }}
                >
                  <DeleteOutlined style={{ marginRight: 5 }} />
                  Delete Post
                </a>

                <a
                  style={{
                    fontWeight: "normal",
                    color: "var(--base-20)",
                  }}
                >
                  <EditOutlined style={{ marginRight: 5 }} />
                  Edit Post
                </a>
              </div>
            ) : (
              <div>
                <a
                  style={{
                    fontWeight: "normal",
                    color: "var(--base-20)",
                    marginRight: 15,
                    
                  }}
                  hov
                >
                  <DeleteOutlined style={{ marginRight: 5 }}  />
                  Delete Comment
                </a>

                <a
                  style={{
                    fontWeight: "normal",
                    color: "var(--base-20)",
                  }}
                >
                  <EditOutlined style={{ marginRight: 5 }} />
                  Edit Comment
                </a>
              </div>
            )}
          </div>
        </div>
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
};
export default CommentsCard;
