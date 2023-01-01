import axios from "axios";
import FriendList from "components/FriendList";
import Navbar from "components/Navbar";
import PostFeed from "components/PostFeed";
import User from "components/User";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const Profile = () => {
  const token = useSelector((state) => state.token);
  const currentUser = useSelector((state) => state.user);
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await axios.get(`http://localhost:5050/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUser(response.data);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  return (
    <Wrapper>
      <Navbar user={currentUser} />
      <Feed>
        <User user={user} />
        <PostFeed user={user} isProfile={true} />
        <FriendList user={user} />
      </Feed>
    </Wrapper>
  );
};

export default Profile;
