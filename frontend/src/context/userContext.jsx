import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Create context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Function to check and decode token
    const checkUser = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.user);
            } catch (error) {
                console.error("Invalid token:", error);
                logoutUser();
            }
        }
    };

    // Run checkUser when component mounts
    useEffect(() => {
        checkUser();
    }, []); 

    // Login function
    const loginUser = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed");

            // Store token & update user state
            localStorage.setItem("token", data.token);
            checkUser(); // Refresh user state
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    // Logout function
    const logoutUser = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
