import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {GiHamburgerMenu} from "react-icons/gi"
import {ImCancelCircle} from "react-icons/im";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/userSlice";
import { useHistory } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history.push("/home");
      }
    });
  }, [username]);

  const handleAuth = () => {
    if (!username) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert("error:", error);
        });
    } else if (username) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          history.push("/");
        })
        .catch((error) => alert(error.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

 const handleNav = () => {
    setNavOpen(!navOpen)
  }

  return (
    <Nav>
      <Logo>
        <img src="/image/logo.svg" alt="" />
      </Logo>
        {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <NavContainer>
          <NavMenu>
            <a href="#home">
              <img src="/image/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/image/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/image/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/image/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/image/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/image/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={username} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
          <IconDiv onClick={handleNav}>
            <button>{navOpen ?<Cancel /> : <Hamburger /> }</button> 
          </IconDiv>
        </NavContainer>
      )}
      <MobileMenu mobile={navOpen}>
            <a href="/home">
              <img src="/image/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/image/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/image/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/image/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/image/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/image/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
      </MobileMenu>   
    </Nav>
  );
}

const Nav = styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
background-color: #090b13;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 36px;
letter-spacing: 16px;
z-index: 3;
`;



const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const Hamburger = styled(GiHamburgerMenu)`
transform: scale(2.2);
background:  #090b13;
color: #fff;
`
const Cancel = styled(ImCancelCircle)`
transform: scale(2.2);
background:  #090b13;
color: #fff;
`
const MobileMenu = styled.div(({mobile}) =>`
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 70px;
  background:  #090b13;
  opacity: ${mobile ? "1" : "0"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition-duration: .5s;
  
  a {
    border-bottom: 1px solid;
    margin: 20px 0;
    display: flex;
    align-items: center;
    padding: 0 12px;

    &:hover {
      transform: scale(1.1)
    }

    span{
    color: rgb(249, 249, 249);
    font-size: 13px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    padding: 2px 0px;
    white-space: nowrap;
    }
  }

  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
  }

`);

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`

 const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

   @media (max-width: 768px) {
      display: none;
  }
 `;

 const IconDiv = styled.div`
  margin-left: 20px;

  @media (min-width: 767px) {
    display: none;
  }
 `

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
