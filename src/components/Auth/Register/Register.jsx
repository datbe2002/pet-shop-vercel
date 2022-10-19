import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../Redux/apiRequest";
import "./register.css";
const Register = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            email: email,
            fullName: fullName,
            password: password,
        };
        registerUser(newUser, dispatch, navigate);
    }
    return (
        <section className="register-container">
            <div className="register-title"> Sign up </div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Enter your full name" onChange={(e) => setFullName(e.target.value)} />
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit"> Create account </button>
            </form>
        </section>

    );
}

export default Register;