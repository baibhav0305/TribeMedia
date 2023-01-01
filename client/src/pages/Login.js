import Form from "components/Form";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  min-height: 100%;
  color: #ffffff;
`;

const Navbar = styled.div`
  background-color: #1a1a1a;
  padding: 1rem 6%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 2rem;
  color: #00b5fa;
`;

const Container = styled.div`
  width: 50%;
  padding: 2rem;
  margin: 2rem auto;
  border-radius: 1.5rem;
  background-color: #1a1a1a;
  h5 {
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
`;

const Login = () => {
  return (
    <Wrapper>
      <Navbar>
        <Text>TribeMedia</Text>
      </Navbar>
      <Container>
        <h5>Welcome to TribeMedia!</h5>
        <Form />
      </Container>
    </Wrapper>
  );
};

export default Login;
