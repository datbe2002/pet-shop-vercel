import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../Redux/apiRequest";
import { useDispatch } from "react-redux"
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    }

    return (
        <section className="login-container">
            <form onSubmit={handleLogin}>
                <div className="login-title">MEGAPET Store</div>
                <input type="text" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }} />
                <button type="submit"> Log in </button>
            </form>
            <div className="line"></div>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Create New Account</Link>
        </section>
    );
}

export default Login;