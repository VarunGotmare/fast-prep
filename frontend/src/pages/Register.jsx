import { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { loginUser } = useUser(); // Use loginUser to log in after registration
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        dob: "",
        userClass: "",
        examType: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Registration failed");

            // Automatically log in the user after registration
            loginUser(formData.email, formData.password);

            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                <input type="text" name="userClass" placeholder="Class (e.g., 11th, 12th)" value={formData.userClass} onChange={handleChange} required />
                <select name="examType" value={formData.examType} onChange={handleChange} required>
                    <option value="">Select Exam Type</option>
                    <option value="JEE">JEE</option>
                    <option value="NEET">NEET</option>
                </select>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
