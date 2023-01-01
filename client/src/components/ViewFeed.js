import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { handlePosts } from "state";
import Post from "./Post";

const Wrapper = styled.div`
  width: 100%;
`;

const ViewFeed = ({ user, isProfile }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const [page, setPage] = useState(0);
  const [results, setResults] = useState([]);

  const getUserPosts = async () => {
    const response = await axios.get(
      `http://localhost:5050/post/${user._id}/posts?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResults([...results, ...response.data]);
    dispatch(handlePosts({ posts: results }));
  };

  const getPosts = async () => {
    const response = await axios.get(
      `http://localhost:5050/post?page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResults([...results, ...response.data]);
    dispatch(handlePosts({ posts: results }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Wrapper>
      {posts.map((post, i) => (
        <Post post={post} key={`${post._id}_${i}`} />
      ))}
      <div
        style={{
          marginTop: "1rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            height: "3rem",
            backgroundColor: "#333333",
            cursor: "pointer",
            borderRadius: "0.5rem",
            padding: "0.5rem",
          }}
          onClick={() => setPage(page + 1)}
        >
          <h3 style={{ color: "#a3a3a3" }}>Load More...</h3>
        </button>
      </div>
    </Wrapper>
  );
};

export default ViewFeed;
