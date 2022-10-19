// import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";
const NavBar = () => {
    // const [user, setUSer] = useState("Datbe");
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <nav className="navbar-container">
            <Link to="/" className="navbar-home"> Home </Link>
            {user ? (
                <>

                    <img className="navbar-avatar" style={{ borderRadius: "100px", height: "50px", width: "50px" }} src={user.user.avatar} />
                    <p className="navbar-user">Hello <span> {user.user.fullName}  </span> </p>
                    <Link to="/logout" className="navbar-logout"> Log out</Link>
                </>
            ) : (
                <>
                    <Link to="/login" className="navbar-login"> Login </Link>
                    <Link to="/register" className="navbar-register"> Register</Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;