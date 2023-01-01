import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleLogin } from "state";
import Dropzone from "react-dropzone";
import styled from "styled-components";
import axios from "axios";
import { MdOutlineEdit } from "react-icons/md";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Name = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  input {
    flex: 6;
  }
`;
const Input = styled.input`
  padding: 0.5rem;
  background: transparent;
  border: 0.001px solid #858585;
  color: #f0f0f0;
  border-radius: 0.4rem;
  &:hover {
    opacity: 0.7;
  }
`;

const Photo = styled.div`
  border: 1px solid #858585;
  border-radius: 0.4rem;
  padding: 1rem;
`;

const Drop = styled.div`
  border: 2px dashed #00d5fa;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const ButtContainer = styled.div`
  p {
    text-decoration: underline;
    color: #00d5fa;
    &:hover {
      cursor: pointer;
      color: #00353f;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  margin: 2rem 0;
  padding: 1rem;
  background-color: #00d5fa;
  color: #1a1a1a;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  &:hover {
    color: #00d5fa;
    background-color: #1a1a1a;
  }
`;

const Form = () => {
  const [page, setPage] = useState("register");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = page === "login";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [picture, setPicture] = useState(null);

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    location,
    occupation,
    picture,
  }) => {
    let imageUrl = "";
    if (picture) {
      const formData = new FormData();
      formData.append("file", picture);
      formData.append("upload_preset", "socialMediaTribe");

      const dataRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dl3picjlx/image/upload",
        formData
      );

      imageUrl = dataRes.data.url;
    }
    const savedUser = await axios.post("http://localhost:5050/auth/register", {
      firstName,
      lastName,
      email,
      password,
      location,
      occupation,
      imageUrl,
    });
    resetForm();

    if (savedUser) {
      setPage("login");
    }
  };

  const login = async ({ email, password }) => {
    const loginUser = await axios.post("http://localhost:5050/auth/login", {
      email,
      password,
    });
    resetForm();
    if (loginUser) {
      dispatch(
        handleLogin({ user: loginUser.data.user, token: loginUser.data.token })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email && password) {
        await login({ email, password });
      } else {
        alert("Please fill all the fields!");
      }
    } else {
      if (
        firstName &&
        lastName &&
        location &&
        occupation &&
        email &&
        password &&
        picture
      ) {
        await register({
          firstName,
          lastName,
          email,
          password,
          location,
          occupation,
          picture,
        });
      } else {
        alert("Please fill all the filds!");
      }
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setOccupation("");
    setLocation("");
    setEmail("");
    setPassword("");
    setPicture("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Container>
        {!isLogin && (
          <>
            <Name>
              <Input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                name="firstName"
              />
              <Input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                name="lastName"
              />
            </Name>
            <Input
              type="text"
              placeholder="Location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              name="location"
            />
            <Input
              type="text"
              placeholder="Occupation"
              onChange={(e) => setOccupation(e.target.value)}
              value={occupation}
              name="occupation"
            />
            <Photo>
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => {
                  setPicture(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Drop {...getRootProps()}>
                    <input {...getInputProps()} />
                    {!picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{picture.path}</p>
                        <MdOutlineEdit />
                      </div>
                    )}
                  </Drop>
                )}
              </Dropzone>
            </Photo>
          </>
        )}
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
        />
      </Container>
      <ButtContainer>
        <Button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</Button>
        <p
          onClick={() => {
            setPage(isLogin ? "register" : "login");
            resetForm();
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."}
        </p>
      </ButtContainer>
    </form>
  );
};

export default Form;
