import FriendList from "components/FriendList";
import Navbar from "components/Navbar";
import PostFeed from "components/PostFeed";
import User from "components/User";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #f0f0f0;
  background-color: #000000;
  min-height: 100vh;
`;

const Feed = styled.div`
  padding: 2rem 6%;
  display: flex;
  justify-content: space-between;
  /* min-height: 100vh; */
  gap: 15px;
`;

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <Wrapper className="home">
      <Navbar user={user} />
      <Feed>
        <User user={user} />
        <PostFeed user={user} isProfile={false} />
        <FriendList user={user} />
      </Feed>
    </Wrapper>
  );
};

export default Home;
