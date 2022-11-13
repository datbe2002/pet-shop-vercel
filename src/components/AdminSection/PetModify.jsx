import React from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Description from './Description';
import UpdatePetInfor from '../UpdatePetInfor';
import DeletePetInfor from '../DeletePetInfor';
import { useEffect } from 'react';
import { getAllPets } from '../../Redux/apiRequest';
import CreateNewPet from '../CreateNewPet';

const PetModify = () => {

    const petList = useSelector((state) => state.pet.pet?.allPets)

    const dispatch = useDispatch()
    useEffect(() => {
        getAllPets(dispatch)
    }, [])

    return (
        <Box p={2}>
            <Paper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <caption>Pet</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {petList?.map((row) => (
                                <TableRow key={row.id}>
                                    <img
                                        style={{ width: "100px", height: "auto", textAlign: "center" }}
                                        src={row.img_url}
                                        alt={row.name}
                                    ></img>

                                    <TableCell align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.price}</TableCell>
                                    <TableCell align="center">
                                        <Button>
                                            <Description pet={row} />
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.cate_name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.status}
                                    </TableCell>
                                    <TableCell align="center">
                                        <UpdatePetInfor pet={row}></UpdatePetInfor>
                                        <DeletePetInfor id={row.id}></DeletePetInfor>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Paper sx={{ width: "10%", height: "50px", alignContent: "right" }}>
                <CreateNewPet></CreateNewPet>
            </Paper>
        </Box>
    )
}

export default PetModify