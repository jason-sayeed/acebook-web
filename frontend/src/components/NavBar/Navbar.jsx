import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../../services/user";

const Navbar = () => {
  const logout = () => {
    return localStorage.removeItem("token");
  };

  const handleClick = () => {
    logout();
  };

  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser(token)
        .then((data) => {
          setUserData(data);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <img className="navbar_profile_pic" src={userData.profilePicture} />
      </div>
      <div className="navbar__right">
        <Link to="/posts">Home</Link>
        <Link to="/profile">My profile</Link>
        <Link to="/login" onClick={handleClick}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
