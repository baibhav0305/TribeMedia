import React, { useState } from "react";
import styled from "styled-components";
import { FaImage, FaYoutube } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { handlePosts } from "state";
import axios from "axios";
import Dropzone from "react-dropzone";
import { MdOutlineEdit, MdDelete } from "react-icons/md";

const Wrapper = styled.div`
  background-color: #ffffff;
  background-color: #1a1a1a;
  width: 100%;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Image = styled.img`
  height: 3rem;
  width: 3rem;
  object-fit: cover;
  border-radius: 50%;
`;

const Input = styled.input`
  width: 80%;
  padding: 1rem 2rem;
  border-radius: 2rem;
  border: none;
  outline: none;
  background-color: #f0f0f0;
  background-color: #333333;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.25rem;
  cursor: pointer;
  color: #858585;
  height: 2.5rem;
  width: 6rem;
  &:hover {
    border-radius: 2rem;
    background-color: #f0f0f0;
  }
`;

const Button = styled.button`
  padding: 0.25rem 0.75rem;
  height: 2rem;
  width: 5rem;
  border-radius: 2rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  background-color: #00b5fa;
  color: #f0f0f0;
  &:hover {
    background-color: #f0f0f0;
    color: #00b5fa;
  }
`;

const CreatePost = () => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const user = useSelector((state) => state.user);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const handleCreatePost = async () => {
    if (!post) {
      alert("Please enter some post description...");
      return;
    }

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "socialMediaTribe");

      const dataRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dl3picjlx/image/upload",
        formData
      );
      imageUrl = dataRes.data.url;
    }

    const response = await axios.post(
      "http://localhost:5050/post",
      { _id, post, imageUrl },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(handlePosts({ posts: response.data }));
    setImage(null);
    setIsImage(false);
    setPost("");
  };

  const handleComingSoon = () => {
    alert("This feature is coming soon...\nSorry!!!");
  };

  return (
    <Wrapper>
      <Content>
        <Image
          src={user.picturePath || "/assets/dpalt.png"}
          alt="profile pic"
        />
        <Input
          placeholder="Start a post..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />
      </Content>
      {isImage && (
        <div
          style={{
            borderRadius: "0.4rem",
            margin: "1rem 1.5rem",
            padding: "1rem",
            border: "1px solid #858585",
            color: "#f0f0f0",
          }}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <div
                  {...getRootProps()}
                  style={{
                    padding: "1rem",
                    width: "100%",
                    cursor: "pointer",
                    border: "2px dashed #00b5fa",
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>{image.path}</p>
                      <MdOutlineEdit />
                    </div>
                  )}
                </div>
                {image && (
                  <MdDelete
                    onClick={() => setImage(null)}
                    style={{
                      fontSize: "1.5rem",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}
      <div style={{ padding: "0 1.5rem 0.5rem" }}>
        <hr style={{ width: "100%", marginBottom: "0.5rem" }} color="#f0f0f0" />
        <Option>
          <Field onClick={() => setIsImage(!isImage)}>
            <FaImage color="#858585" />
            Image
          </Field>
          <Field onClick={handleComingSoon}>
            <FaYoutube color="#858585" />
            Video
          </Field>
          <Field>
            <Button onClick={handleCreatePost}>Post</Button>
          </Field>
        </Option>
      </div>
    </Wrapper>
  );
};

export default CreatePost;
