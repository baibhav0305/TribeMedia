import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CreatePost from "./CreatePost";
import ViewFeed from "./ViewFeed";

const Wrapper = styled.div`
  width: 40%;
  margin: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostFeed = ({ user, isProfile }) => {
  // const user = useSelector((state) => state.user);

  return (
    <Wrapper>
      {!isProfile && <CreatePost />}
      <ViewFeed user={user} isProfile={isProfile} />
    </Wrapper>
  );
};

export default PostFeed;
