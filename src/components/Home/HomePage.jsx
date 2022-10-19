import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 20 },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function HomePage() {
    return (
        <div style={{ height: 400, width: '80%', backgroundColor: "white", marginTop: "50px" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
}