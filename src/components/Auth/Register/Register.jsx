import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../Redux/apiRequest";
import * as Yup from 'yup';
import avatarImage from "../../../assets/petstoreavatar.png"

import "./register.css";
import { Container } from "@mui/material";
const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: (values) => {

            const { email, fullName, password } = values;
            // console.log(email)
            // loginUser(newUser, dispatch, navigate);
            registerUser({ email, fullName, password }, dispatch, navigate);
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Required").email("Invalid email"),
            fullName: Yup.string().required("Required"),
            password: Yup.string().required('No password provided.'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        }),
    });

    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     const newUser = {
    //         email: email,
    //         fullName: fullName,
    //         password: password,
    //     };

    // }
    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="register-container">
                <img className="logo-image" src={avatarImage}></img>
                <div className="register-title"> Sign up </div>
                <form className="register-form" onSubmit={formik.handleSubmit}>
                    <label>Email</label>
                    <input
                        className="register-email_input"
                        type="text" placeholder="Enter your email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                    {formik.touched.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}


                    <label>Fullname</label>
                    <input
                        className="register-fullname_input"
                        type="text" placeholder="Enter your full name" name="fullName" value={formik.values.fullName} onChange={formik.handleChange} />
                    {formik.touched.fullName && <div style={{ color: "red" }}>{formik.errors.fullName}</div>}


                    <label>Password</label>
                    <input
                        className="register-password_input"
                        type="password" placeholder="Create your password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                    {formik.touched.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}
                    <label>Confirm password</label>
                    <input
                        className="register-re-password_input"
                        type="password" placeholder="Confirm your password" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} />
                    {formik.touched.confirmPassword && <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>}

                    <button className="register-btn" type="submit"> Create account </button>
                </form>
            </div>
        </Container>


    );
}

export default Register;