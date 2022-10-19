import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { getAllUsers } from '../../Redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Icon, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'fullName', headerName: 'Full Name', width: 130 },
    {
        field: 'balance',
        headerName: 'Balance',
        type: 'number',
        width: 90,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        type: 'number',
        width: 90,
    },
    {
        field: 'address', headerName: 'Address', width: 130
    },
    {
        field: 'status', headerName: 'Status', width: 130
    },
    {
        field: 'action', headerName: 'Delete', width: 130,

        renderCell: () => {
            return [
                <IconButton>
                    <Delete style={{ color: 'gray' }} />
                </IconButton>
            ]
        },
    }
];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 20 },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];


export default function HomePage() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userList = useSelector((state) => state.users.users?.allUsers);
    // console.log(user)
    console.log(userList)
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        if (user?.accessToken) {
            getAllUsers(user?.accessToken, dispatch)
        }
    }, [])
    return (

        <div style={{ height: 400, width: '80%', backgroundColor: "white", marginTop: "50px" }}>

            {user?.user.role === "Admin" ? (
                <>
                    <DataGrid
                        rows={userList}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                    <p className="navbar-user">{`Your role is Adminitrastor`}  </p>
                </>
            ) : (
                <>
                    <p className="navbar-user">{`Your role is User`}  </p>

                </>
            )}</div>

    );
}