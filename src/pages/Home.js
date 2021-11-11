import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import CirclePost from "../components/CirclePost";

import { Layout, Spin, List, Skeleton, Divider } from "antd";

import axios from "axios";
import { Url } from "../constants/global";
function Home() {
    const { Content } = Layout;
    // dummy data, to be replaced by API call
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState();
    const [cacheData, setCacheData] = useState([]);

    const loadCachedata = () => {
        const cacheInstance = cacheData;
        const lengthToRetrieve =
            cacheInstance.length >= 4 ? 4 : cacheInstance.length;
        const unloadedCacheData = cacheInstance.splice(0, lengthToRetrieve);
        setPosts([...posts, ...unloadedCacheData]);
        setCacheData([...cacheInstance]);
    };

    const fetchHomePosts = async () => {
        if (localStorage.userId) {
            try {
                await axios
                    .get(`${Url}/posts/home/${parseInt(localStorage.userId)}`)
                    .then((res) => {
                        console.log("data:", res.data);
                        const cacheInstance = [...res.data];
                        // cacheInstance.splice(0,7); testing UI
                        const lengthToRetrieve =
                            cacheInstance.length >= 4
                                ? 4
                                : cacheInstance.length;
                        const unloadedCacheData = cacheInstance.splice(
                            0,
                            lengthToRetrieve
                        );
                        setCacheData(cacheInstance);
                        setPosts(unloadedCacheData);
                    });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
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
                        style={{
                            height: "100%",
                            minHeight: "100vp",
                            backgroundColor: "var(--accent-bg)",
                        }}
                    >
                        <Content
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={loadCachedata}
                                hasMore={cacheData.length > 0}
                                loader={
                                    <Skeleton
                                        avatar
                                        paragraph={{ rows: 1 }}
                                        active
                                    />
                                }
                                endMessage={
                                    <Divider plain>
                                        It is all, nothing more 🤐
                                    </Divider>
                                }
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    dataSource={posts}
                                    renderItem={(post, index) => (
                                        <CirclePost
                                            key={index}
                                            circleId={post.circleid}
                                            circleNameVisible={true}
                                            circleName={post.name}
                                            postTitle={post.title}
                                            postText={post.content}
                                            postId={post.postid}
                                            posted={post.createdat}
                                            numLikes={post.likes}
                                            numComments={post.comments}
                                            postedName={post.postername}
                                            postedClassification={
                                                post.classification
                                            }
                                            posterId={post.userid}
                                            currUserLiked={post.curuserliked}
                                            postedPhoto={post.photo}
                                            postType={post.posttype}
                                        />
                                    )}
                                />
                            </InfiniteScroll>
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
