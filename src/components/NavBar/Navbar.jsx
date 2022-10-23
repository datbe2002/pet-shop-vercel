import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/apiRequest";
import "./navbar.css";
const NavBar = () => {
    // const [user, setUSer] = useState("Datbe");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login?.currentUser);
    const handleLogout = () => {
        logOut(navigate, dispatch);
    }
    return (
        <nav className="navbar-container">


            {user?.user.role === "Admin" ? (
                <>
                    <Link to="/" className="navbar-home"> Home</Link>

                    <img className="navbar-avatar" style={{ borderRadius: "100px", height: "50px", width: "50px" }} src={user?.user.avatar} alt="Avatar" />
                    <p className="navbar-user">Hello <span> {user.user.fullName}  </span> </p>
                    <Link to="/login" className="navbar-logout" onClick={handleLogout}> Log out</Link>
                </>
            ) : (
                <>
                    <Link to="/register" className="navbar-register"> Register</Link>
                    <Link to="/login" className="navbar-login"> Login </Link>
                    <Link to="/user" className="navbar-logout"> User</Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;