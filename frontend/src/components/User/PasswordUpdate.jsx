const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordUpdateForm = () => {
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

const updatePassword = async (e) => {
    e.preventDefault();

const token = localStorage.getItem("token");
    if (!token) {
    console.error("No token found, please log in.");
    navigate("/login");
    return;
    }

    try {
    const response = await fetch('${BACKEND_URL}/users/updatePassword', {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
        throw new Error('Failed to update password');
    }

    const result = await response.json();
    console.log(result);
    alert("Password successfully updated.");
    } catch (error) {
    console.error("Error updating password:", error);
    }
};

return (
    <form onSubmit={updatePassword} className="password-update-form">
    <div className="form-group">
        <label htmlFor="newPassword">New Password:</label>
        <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        />
    </div>
    <button type="submit">Update Password</button>
    </form>
);
};

export default PasswordUpdateForm;
