import React, { useRef, useState } from "react";
import Logo from "../Images/Logo.png";
import SP from "../CSS/StudentProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import StudentRightOne from "../JSX/StudentUI/StudentRightOne";
import StudentRightTwo from "../JSX/StudentUI/StudentRightTwo";

export default function StudentProfile() {
  const Navigate = useNavigate();
  const [isAccount, setisAccount] = useState(true);
  const [isQMS, setIsQMS] = useState(false);
  const [userData, setUserData] = useState();

  const arightRef = useRef();
  const brightRef = useRef();

  const handleAccount = () => {
    setisAccount(true);
    setIsQMS(false);
    arightRef.current.style.display = "flex";
    brightRef.current.style.display = "none";
  };

  const handleQMS = () => {
    setisAccount(false);
    setIsQMS(true);
    arightRef.current.style.display = "none";
    brightRef.current.style.display = "flex";
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    Navigate("/");
  };

  return (
    <div className={SP.mainProfilePage}>
      <div className={SP.top}>
        <img src={Logo} alt="Logo" className={SP.logo} />
      </div>
      <div className={SP.adminProfile}>
        <div className={SP.left}>
          <div
            onClick={handleAccount}
            className={`${SP.left1} ${isAccount ? SP.selectedOne : ""}`}
          >
            <i className={`fa-regular fa-user ${SP.icon}`}></i>
            <span className={SP.ttt}>Account</span>
          </div>

          <div
            onClick={handleQMS}
            className={`${SP.left1} ${isQMS ? SP.selectedOne : ""}`}
          >
            <i className={`fa-regular fa-user ${SP.icon}`}></i>
            <span className={SP.ttt}>QMS</span>
          </div>
          <div onClick={handleLogOut} className={`${SP.left1} ${SP.left2}`}>
            <i
              className={`fa-solid fa-arrow-right-from-bracket ${SP.icon}`}
            ></i>
            <span className={SP.ttt}>Log Out</span>
          </div>
          <Link to="/home" className={`${SP.left1} ${SP.left3}`}>
            Home
          </Link>
        </div>
        <div className={SP.right}>
          <div ref={arightRef} className={SP.aright}>
            <StudentRightOne />
          </div>
          <div ref={brightRef} className={SP.bright}>
            <StudentRightTwo />
          </div>
        </div>
      </div>
    </div>
  );
}
