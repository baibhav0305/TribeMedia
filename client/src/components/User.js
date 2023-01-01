import React from "react";
import styled from "styled-components";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdRoom, MdWork } from "react-icons/md";
import { FaTwitter, FaLinkedin, FaGlobe } from "react-icons/fa";

const Wrapper = styled.div`
  background-color: #ffffff;
  background-color: #1a1a1a;
  position: fixed;
  width: 20%;
  height: fit-content;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1.5rem;
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.1rem;
  width: 100%;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Name = styled.h4`
  color: #666666;
  color: #a3a3a3;
  font-size: 18px;
  font-weight: 500;
`;

const Friends = styled.p`
  font-size: 0.85rem;
  font-weight: 500;
  color: #a3a3a3;
  color: #666666;
`;

const Second = styled.div`
  padding: 1rem;
  width: 100%;
`;
const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;
const Occupation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Third = styled.div`
  padding: 1rem;
  width: 100%;
`;

const Social = styled.p`
  font-size: 1rem;
  color: #666666;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Profiles = styled.div`
  gap: 1rem;
`;
const Media = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Text = styled.p`
  color: #666666;
  color: #a3a3a3;
  font-weight: 500;
  font-size: 0.8rem;
  a {
    color: #a3a3a3;
    color: #666666;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const User = ({ user }) => {
  return (
    <Wrapper>
      {/* first */}
      <First>
        <UserDetails>
          <Image
            src={user.picturePath || "/assets/dpalt.png"}
            alt="profile pic"
          />
          <Details>
            <Name>{user.firstName + " " + user.lastName}</Name>
            <Friends>{user.friends.length} friends</Friends>
          </Details>
        </UserDetails>
        <RiUserSettingsLine />
      </First>
      <hr style={{ width: "100%" }} color="#E0E0E0" />

      {/* second */}
      <Second>
        <Location>
          <MdRoom fontSize="large" fontWeight="900" color="#666666" />
          <p style={{ color: "#A3A3A3", fontWeight: "400" }}>{user.location}</p>
        </Location>
        <Occupation>
          <MdWork fontSize="large" fontWeight="900" color="#666666" />
          <p style={{ color: "#A3A3A3", fontWeight: "400" }}>
            {user.occupation}
          </p>
        </Occupation>
      </Second>
      <hr style={{ width: "100%" }} color="#E0E0E0" />

      {/* third */}
      <Third>
        <Social>Socials</Social>
        <Profiles style={{ marginBottom: "0.5rem" }}>
          <Media>
            <FaTwitter fontSize="large" fontWeight="900" color="#A3A3A3" />
            <Text>
              Twitter /
              <span>
                <a
                  href="https://twitter.com/baibhav0305"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @baibhav0305
                </a>
              </span>
            </Text>
          </Media>
        </Profiles>
        <Profiles style={{ marginBottom: "0.5rem" }}>
          <Media>
            <FaLinkedin fontSize="large" fontWeight="900" color="#A3A3A3" />
            <Text>
              Linkedin /
              <span>
                <a
                  href="https://www.linkedin.com/in/baibhav-kumar-panda-64908a1bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @baibhav-kumar-panda
                </a>
              </span>
            </Text>
          </Media>
        </Profiles>
        <Profiles>
          <Media>
            <FaGlobe fontSize="large" fontWeight="900" color="#A3A3A3" />
            <Text>
              Portfolio /
              <span>
                <a
                  href="https://baibhav-panda.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @baibhav
                </a>
              </span>
            </Text>
          </Media>
        </Profiles>
      </Third>
      {/* fourth */}
    </Wrapper>
  );
};

export default User;
