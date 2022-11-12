import * as React from 'react';
import { useEffect } from 'react';
import { deleteUser, getAllCategory, getAllUsers } from '../../Redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import './dashboard.css'
import { Grid } from '@mui/material';

import { useState } from 'react';
import UserModify from './UserModify';
import CategoryModify from './CategoryModify';
import PetModify from './PetModify';



export default function Dashboard() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector((state) => state.users.users?.allUsers);
    const msg = useSelector((state) => state.users?.msg);

    const [choice, setChoice] = useState("User")


    // console.log(userList)
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch)
        }
    }, [dispatch]);


    console.log(choice)

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={2}>
                <Box p={2} >
                    <Paper>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: "10px" }}>
                            <nav aria-label="main mailbox folders">
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => setChoice("User")}>
                                            <ListItemIcon>
                                                <AccountCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="User" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => setChoice("Category")}>
                                            <ListItemIcon>
                                                <CategoryIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Category" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton onClick={() => setChoice("Pet")}>
                                            <ListItemIcon>
                                                <PetsIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Pet" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>

                        </Box>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={6} md={10}>


                {choice === "User" && <UserModify></UserModify>}
                {choice === "Category" && <CategoryModify></CategoryModify>}
                {choice === "Pet" && <PetModify></PetModify>}



            </Grid>

        </Grid>



    );
}