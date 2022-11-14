import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../Redux/apiRequest";
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik";
import * as Yup from 'yup';
import Account from "./Account";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [loginError, setLoginError] = useState("");
    const msg = useSelector((state) => state.auth?.msg)

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
            <div>
                <Account></Account>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="login-title">MEGAPET</div>
                <input type="text" placeholder="Enter your email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                {formik.touched.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
                <input type="password" placeholder="Enter your password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                {formik.touched.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}
                <div style={{ color: "red" }}>{msg.message}</div>
                <button type="submit"> Log in </button>
            </form>
            <div className="line"></div>
            <div className="login-register"> Don't have an account yet? </div>
            <Link className="login-register-link" to="/register">Create New Account</Link>
        </section>
    );
}

export default Login;