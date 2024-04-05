
import Navbar from "../../components/NavBar/Navbar";
import UserDetails from "../../components/User/UserDetails";
import PasswordUpdateForm from "../../components/User/PasswordUpdate";
import "./MyProfilePage.css";

export const MyProfilePage = () => {
    return (
        <>
            <Navbar/>
            <div className="Profile-background">
                <div className="text-overlay">
                    <br></br>
                    <br></br>
                    <h1>Your Profile</h1>
                    <p>Welcome to your profile page</p>
                </div>
                <div className="contentBox">
                    <UserDetails />
                    <br></br>
                    <PasswordUpdateForm />
                </div>
            </div>
        </>
    );
};



