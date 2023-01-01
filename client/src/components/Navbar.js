import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { lightMode, darkMode } from "utils/customStyle";
import styled from "styled-components";
import { handleLogout, handleMode } from "state";
import { FaMoon, FaSun, FaHome } from "react-icons/fa";
import { BsChatDotsFill, BsBellFill } from "react-icons/bs";

const NavbarWrapper = styled.div`
  padding: 1rem 6%;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #ffffff;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  display: grid;
  gap: 1.75rem;
`;

const Logo = styled.p`
  font-weight: bold;
  font-size: clamp(1rem, 2rem, 2.25rem);
  color: #00b5fa;
  &:hover {
    color: #e6fbff;
    cursor: pointer;
  }
`;

const MenuCont = styled.div`
  display: flex;
  gap: 2rem;
`;

const Icons = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: none;
  background-color: #ffffff;
  /* background-color: #1a1a1a; */
  cursor: pointer;
  border-radius: 50%;
  width: 2.2rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Profile = styled.div`
  /* width: 160px; */
  position: relative;
  /* display: inline-block; */
  display: flex;
  color: #a3a3a3;
  gap: 1rem;
  &:hover .drop {
    display: block;
  }
`;

const ProfView = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 0.25rem;
  background-color: #f0f0f0;
  background-color: #333333;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
`;

const Dropdown = styled.div`
  border-radius: 0.25rem;
  display: none;
  position: absolute;
  background-color: #f0f0f0;
  background-color: #333333;
  width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  div {
    color: black;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: #a3a3a3;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const Navbar = ({ user }) => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);
  const isNonMobile = true;
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleLogoutUser = () => {
    dispatch(handleLogout());
    navigate("/login");
  };

  return (
    <NavbarWrapper>
      <LogoWrapper>
        <Logo onClick={() => navigate("/")}>TribeMedia</Logo>
      </LogoWrapper>
      {/* desktop */}
      {isNonMobile ? (
        <MenuCont>
          <Icons onClick={() => navigate("/")}>
            <FaHome />
          </Icons>

          <Icons onClick={() => dispatch(handleMode())}>
            {mode === "light" ? <FaMoon /> : <FaSun />}
          </Icons>
          <Icons>
            <BsChatDotsFill />
          </Icons>
          <Icons>
            <BsBellFill />
          </Icons>
          <Profile>
            <ProfView>
              <span>{fullName}</span>
              <i className="fa-solid fa-sort-down"></i>
            </ProfView>
            <Dropdown className="drop">
              <div
                onClick={() => {
                  navigate(`/profile/${user._id}`);
                  navigate(0);
                }}
              >
                <i className="fa-solid fa-user"></i>
                Account
              </div>
              <div>
                <i className="fa-solid fa-gear"></i>
                Settings
              </div>
              <div style={{ color: "red" }} onClick={handleLogoutUser}>
                <i className="fa-solid fa-right-from-bracket"></i>Sign Out
              </div>
            </Dropdown>
          </Profile>
        </MenuCont>
      ) : (
        <button onClick={() => setIsMobileMenu(!isMobileMenu)}>
          Some menu
        </button>
      )}
      {/* mobile */}
      {!isNonMobile && isMobileMenu && (
        <div>
          {/* close icon */}
          <div>
            <button onClick={() => setIsMobileMenu(!isMobileMenu)}>
              close
            </button>
          </div>
          {/* menu items */}
          <div>
            <button onClick={() => dispatch(handleMode())}>Mode</button>
            <div>My Account</div>
            <div>Settings</div>
            <div>Logout</div>
          </div>
        </div>
      )}
    </NavbarWrapper>
  );
};

export default Navbar;
