import React, { useEffect } from "react";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { handleFriends } from "state";
import Friend from "./Friend";

const Wrapper = styled.div`
  background-color: #ffffff;
  background-color: #1a1a1a;
  width: 20%;
  border-radius: 0.75rem;
  position: fixed;
  right: 6%;
  height: fit-content;
  padding: 1.5rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h5`
  color: #333333;
  font-size: 18px;
  font-weight: 500;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FriendList = ({ user }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends);
  const token = useSelector((state) => state.token);

  const getUserFriends = async () => {
    const response = await axios.get(
      `http://localhost:5050/user/${user._id}/friends`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(handleFriends({ friends: response.data }));
  };

  useEffect(() => {
    getUserFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Top>
        <Title>Friends</Title>
        <BsThreeDots />
      </Top>
      <hr style={{ width: "100%", marginBottom: "0.5rem" }} color="#E0E0E0" />
      <List>
        {!friends.length && (
          <p style={{ color: "green" }}>
            Sorry you have no friends... You are DHANIYA!!! 🍀🍀🍀
          </p>
        )}
        {friends.map((friend, i) => (
          <Friend friend={friend} key={`${friend._id}_${i}`} />
        ))}
      </List>
    </Wrapper>
  );
};

export default FriendList;
