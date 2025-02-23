import { useUser } from "../context/userContext";

const Dashboard = () => {
    const { user, logoutUser } = useUser();

    return (
        <div>
            <h2>Welcome, {user?.id}</h2>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default Dashboard;
