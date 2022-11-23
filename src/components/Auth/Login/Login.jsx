import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../Redux/apiRequest";
import { useDispatch } from "react-redux"
import { useFormik } from "formik";
import * as Yup from 'yup';
// import Account from "./Account";
// import { Divider } from "@mui/material";
import avatarImage from "../../../assets/petstoreavatar.png"


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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


    return (
        <div className="full-container">
            <section className="left-container">
                <div className="content">
                    <h2>MEGAPET&#174;</h2>
                    <p>Where you can find a lovely pet for your homee</p>
                </div>
            </section>
            <section className="right-container">
                <div className="login-container">
                    <img className="logo-image" src={avatarImage} alt="LOGO"></img>

                    <form className="login-form"
                        onSubmit={formik.handleSubmit}>
                        <label>Email</label>
                        <input
                            className="login-email_input"
                            type="text" placeholder="Enter your email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                        {formik.touched.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
                        <label>Password</label>

                        <input

                            className="login-password_input"
                            type="password" placeholder="Enter your password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                        {formik.touched.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}
                        <button
                            className="login-btn"
                            type="submit"> Log in </button>
                    </form>

                    <div className="line"></div>
                    <div className="login-register"> Don't have an account yet? </div>
                    <Link className="login-register-link" to="/register">Create New Account</Link>
                </div>

            </section>
        </div>

    );
}

export default Login;