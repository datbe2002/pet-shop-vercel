import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/apiRequest";
import "./navbar.css";
const NavBar = () => {
    // const [user, setUSer] = useState("Datbe");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login?.currentUser);
    console.log(user)
    const handleLogout = () => {
        logOut(navigate, dispatch);
    }
    return (
        <nav className="navbar-container">
            <Link to="/home" className="navbar-home"> Home</Link>
            <Link to="/" className="navbar-home"> Pet</Link>


            {user?.user.role === "Admin" ? (
                <>
                    <Link to="/dashboard" className="navbar-logout"> Dashboard</Link>
                    <img className="navbar-avatar" style={{ borderRadius: "100px", height: "50px", width: "50px" }} src={user?.user.avatar} alt="Avatar" />
                    <p className="navbar-user">Hello <span> {user?.user.fullName}  </span> </p>
                    <Link to="/login" className="navbar-logout" onClick={handleLogout}> Log out</Link>
                </>
            ) : (

                user?.user.role === "User" ? (<>

                    <img className="navbar-avatar" style={{ borderRadius: "100px", height: "50px", width: "50px" }} src={user?.user.avatar} alt="Avatar" />
                    <p className="navbar-user">Hello <span> {user?.user.fullName}  </span> </p>
                    <Link to="/login" className="navbar-logout" onClick={handleLogout}> Log out</Link>

                </>) : (<>
                    <Link to="/login" className="navbar-logout"> Login</Link>
                    <Link to="/register" className="navbar-logout"> Register</Link>
                </>

                )

            )}
        </nav>
    );
};

export default NavBar;