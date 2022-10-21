import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../../Redux/apiRequest";
import { useDispatch } from "react-redux"
import { useFormik } from "formik";
import * as Yup from 'yup';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            const newUser = values;
            loginUser(newUser, dispatch, navigate);
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Required").email("Invalid email"),
            password: Yup.string().required('No password provided.')
        }),
    });


    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");



    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     const newUser = {
    //         email: email,
    //         password: password,
    //     };


    // loginUser(newUser, dispatch, navigate);


    return (
        <section className="login-container">
            <form onSubmit={formik.handleSubmit}>
                <div className="login-title">MEGAPET Store</div>
                <input type="text" placeholder="Enter your email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                {formik.errors.email}
                <input type="password" placeholder="Enter your password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                {formik.errors.password}

                <button type="submit"> Log in </button>
            </form>
            <div className="line"></div>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Create New Account</Link>
        </section>
    );
}

export default Login;