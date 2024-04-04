
import Navbar from "../../components/NavBar/Navbar";
import UserDetails from "../../components/User/UserDetails";
import "./MyProfilePage.css";





export const MyProfilePage = () => {
    return (
        <>
            <div className="banner"> </div>
            <Navbar />
            {/* <section className="banner"> */}
                <div className="text-overlay">
                    <h1>Your Profile</h1>
                    <p>Welcome to your profile page</p>
                </div>
                <div className="contentBox">
                    <UserDetails />
                </div>
        </>
    );
};



