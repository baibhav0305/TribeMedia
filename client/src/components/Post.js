import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { handlePost, handleFriends, handlePosts } from "state";
import { FiUserCheck } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BiUserPlus, BiLike, BiComment, BiShareAlt } from "react-icons/bi";

const Wrapper = styled.div`
  background-color: #ffffff;
  background-color: #1a1a1a;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 1rem 1.5rem;
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  width: 100%;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Image = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h4`
  color: #333333;
  color: #a3a3a3;
  font-weight: 500;
`;

const Friends = styled.p`
  font-size: 0.85rem;
  color: #a3a3a3;
  color: #666666;
`;

const Description = styled.div``;

const Text = styled.p`
  color: #666666;
  color: #a3a3a3;
  font-size: 0.9rem;
  letter-spacing: 0.1px;
  font-weight: 100;
  margin-bottom: 0.75rem;
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 0.75rem;
  margin-bottom: 0.75rem;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  color: #858585;
`;

const Impression = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2rem;
  width: 5rem;
  &:hover {
    border-radius: 0.75rem;
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const Comments = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 2rem;
  width: 5rem;
  &:hover {
    border-radius: 0.75rem;
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const Share = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 5rem;
  &:hover {
    border-radius: 0.75rem;
    background-color: #f0f0f0;
    cursor: pointer;
  }
`;

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((user) => user._id === post.userId);
  const currentUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(post.likes[currentUserId]);
  const [isComments, setIsComments] = useState(false);

  const handleUpdateLikes = async () => {
    const response = await axios.patch(
      `${BASE_URL}/post/${post._id}/like`,
      { currentUserId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(handlePost({ post: response.data }));
  };

  const handleAddFriends = async () => {
    const response = await axios.patch(
      `${BASE_URL}/user/${post.userId}`,
      { currentUserId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(handleFriends({ friends: response.data }));
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Do you want to delete this post?");

    if (confirmDelete) {
      const response = await axios.delete(`${BASE_URL}/post/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(handlePosts({ posts: response.data }));
    } else {
      return;
    }
  };

  return (
    <Wrapper>
      {/* first */}
      <First>
        <UserDetails>
          <Image src={post.userPicturePath} alt="profile pic" />
          <Details>
            <Name>{`${post.firstName} ${post.lastName}`}</Name>
            <Friends>{post.location}</Friends>
          </Details>
        </UserDetails>
        {currentUserId !== post.userId ? (
          <>
            {isFriend ? (
              <FiUserCheck
                style={{ fontSize: "1.2rem", color: "green" }}
                onClick={handleAddFriends}
              />
            ) : (
              <BiUserPlus
                onClick={handleAddFriends}
                style={{
                  fontSize: "1.2rem",
                  color: "#00b5fa",
                  cursor: "pointer",
                }}
              />
            )}
          </>
        ) : (
          <MdDelete
            style={{ fontSize: "1.2rem", color: "red", cursor: "pointer" }}
            onClick={handleDeletePost}
          />
        )}
      </First>
      {/* second */}
      <Description>
        <Text>{post.description}</Text>
        {post.picturePath && <Photo src={post.picturePath} alt="post photo" />}
        <hr
          style={{
            width: "100%",
            marginBottom: "0.5rem",
          }}
          color="#f0f0f0"
        />
      </Description>
      {/* third */}
      <div>
        <Option>
          <Impression>
            <Likes onClick={handleUpdateLikes}>
              {isLiked ? (
                <>
                  <BiLike color="green" />
                  <p style={{ color: "green" }}>
                    {Object.keys(post.likes).length}
                  </p>
                </>
              ) : (
                <>
                  <BiLike />
                  {Object.keys(post.likes).length}
                </>
              )}
            </Likes>
            <Comments onClick={() => setIsComments(!isComments)}>
              <BiComment />
              {post.comments.length}
            </Comments>
          </Impression>
          <Share>
            <BiShareAlt />
          </Share>
        </Option>
        {isComments && (
          <div style={{ marginTop: "0.5rem" }}>
            <p style={{ color: "#C2C2C2" }}>Comments</p>
            <ul style={{ listStyleType: "circle" }}>
              {post.comments.map((comment, i) => (
                <li
                  key={i}
                  style={{
                    marginLeft: "2rem",
                    color: "#666666",
                    fontSize: "0.9rem",
                  }}
                >
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Post;
