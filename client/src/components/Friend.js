import React from "react";
import styled from "styled-components";
import { FaUserMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleFriends } from "state";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const Image = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  object-fit: cover;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.h4`
  color: #666666;
  color: #a3a3a3;
  font-weight: 500;
`;

const Friends = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: #a3a3a3;
  color: #666666;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Friend = ({ friend }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((user) => user._id === friend._id);

  const handleRemoveFriends = async () => {
    const response = await axios.patch(
      `${BASE_URL}/user/${friend._id}`,
      { currentUserId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(handleFriends({ friends: response.data }));
  };

  return (
    <Wrapper>
      <Row>
        <Image src={friend.picturePath} alt="profile pic" />
        <Link style={{ textDecoration: "none" }} to={`/profile/${friend._id}`}>
          <Details
            // onClick={() => {
            //   navigate(`/profile/${friend._id}`);
            //   navigate(0);
            // }}
            style={{ cursor: "pointer" }}
          >
            <Name>{`${friend.firstName} ${friend.lastName}`}</Name>
            <Friends>{friend.occupation}</Friends>
          </Details>
        </Link>
      </Row>
      <FaUserMinus cursor="pointer" color="red" onClick={handleRemoveFriends} />
      {/* {isFriend && (
        <FaUserMinus
          color="red"
          cursor="pointer"
          onClick={handleRemoveFriends}
        />
      )} */}
    </Wrapper>
  );
};

export default Friend;
