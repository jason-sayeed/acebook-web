import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUser from "../../services/user";
import "./userDetails.css";

const UserDetails = () => {
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
    <>
      <div className="user-details-container">
        <h1>Profile Details</h1>
          <div className="user-info">
          <img className="profile_pic" src={userData.profilePicture} alt="Profile" />
          <div className="user-name">{userData.fullName}</div>
      </div>
</div>

    </>
  );
};

export default UserDetails;
