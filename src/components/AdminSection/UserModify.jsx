import { Box, Button, Paper } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../Redux/apiRequest';
import UpdateUserInfor from '../UpdateUserInfor'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const UserModify = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch()
    const userList = useSelector((state) => state.users.users?.allUsers);
    const handleDelete = id => {
        // console.log(id)
        deleteUser(id, user?.accessToken, dispatch)

    }
    return (
        <Box p={2}>
            <Paper>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <caption>User list</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Picture</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList?.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.fullName}</TableCell>
                                    <TableCell align="center">
                                        <img style={{ borderRadius: "50px", width: "2.5rem" }} src={row.avatar} alt={row.fullName}></img>
                                    </TableCell>

                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.role}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">

                                        <UpdateUserInfor user={row}> </UpdateUserInfor>

                                        <Button sx={{
                                            marginTop: "1rem",
                                            color: "white",
                                            fontWeight: "bold",
                                            backgroundColor: "red", "&:hover": {
                                                backgroundColor: '#6E260E'
                                            },
                                        }} onClick={() => handleDelete(row.id)}> Delete </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>


    )
}

export default UserModify