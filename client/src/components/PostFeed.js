import React from "react";
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
  return (
    <Wrapper>
      {!isProfile && <CreatePost />}
      <ViewFeed user={user} isProfile={isProfile} />
    </Wrapper>
  );
};

export default PostFeed;
