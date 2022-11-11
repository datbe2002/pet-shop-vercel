import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../Redux/apiRequest'
import UpdateCategoryInfor from '../UpdateCategoryInfor';

const CategoryModify = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.login?.currentUser);
    const cateList = useSelector((state) => state.category.category?.allCates);

    useEffect(() => {
        getAllCategory(user?.accessToken, dispatch)

    }, [dispatch])
    return (
        <Box p={2}>
            <Paper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <caption>Category</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Category name</TableCell>
                                <TableCell align="center">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cateList.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">
                                        <UpdateCategoryInfor cate={row}></UpdateCategoryInfor>
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

export default CategoryModify