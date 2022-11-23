import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/apiRequest";
import "./navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

const NavBar = () => {
    // const [user, setUSer] = useState("Datbe");
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.login?.currentUser);

    const { cartTotalQuantity } = useSelector((state) => state.carts)

    console.log(user)

    const handleLogout = () => {
        logOut(navigate, dispatch);
        handleClose()
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navStyle = ({ isActive }) => {
        return {
            backgroundColor: isActive ? 'white' : 'black',
            color: isActive ? 'black' : 'white',
        }
    }

    return (
        <nav className="navbar-container">
            <NavLink style={navStyle} to="/home" className="navbar-home">Home</NavLink>
            <NavLink style={navStyle} to="/" className="navbar-pet" end>Pet</NavLink>


            {user?.user?.role === "Admin" ? (
                <>
                    <NavLink style={navStyle} to="/dashboard" className="navbar-dashboard"> Dashboard</NavLink>
                    <Button sx={{ width: "1.1rem" }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <img className="navbar-avatar" style={{ borderRadius: "100px", height: "50px", width: "50px" }} src={user?.user.avatar} alt="Avatar" />

                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}></MenuItem>
                        <MenuItem onClick={handleClose}>
                            <NavLink style={{
                                textDecoration: 'none',
                                color: 'black'
                            }} to="/login" onClick={handleLogout}> Log out</NavLink>
                        </MenuItem>
                    </Menu>
                </>
            ) : (

                user?.user?.role === "User" ? (<>
                    <NavLink style={navStyle} to="/cart" className="navbar-cart"><ShoppingCartIcon /><span className="quantity-cart">{cartTotalQuantity}</span></NavLink>

                    <Button sx={{ width: "1.1rem" }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <img className="navbar-avatar" style={{ borderRadius: "100px", height: "50px", width: "50px" }} src={user?.user.avatar} alt="Avatar" />

                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}></MenuItem>
                        <MenuItem onClick={handleClose}>
                            <NavLink style={{
                                textDecoration: 'none',
                                color: 'black'
                            }} to="/login" onClick={handleLogout}> Log out</NavLink>
                        </MenuItem>
                    </Menu>


                </>) : (<>
                    <NavLink style={navStyle} to="/login" className="navbar-login"> Login</NavLink>
                    <NavLink style={navStyle} to="/register" className="navbar-register"> Register</NavLink>
                </>

                )

            )}
        </nav>
    );
};


export default NavBar


