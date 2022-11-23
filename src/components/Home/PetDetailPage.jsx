import { Box, Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../Redux/cartSlice';

export default function PetDetailPage() {

    const [petList, setPetList] = useState([]);
    const petID = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);

    // console.log(petID)
    useEffect(() => {
        async function fetchBooks() {
            const data = await axios.get(`https://pet-shop-mini.herokuapp.com/api/pet/${petID.id}`);

            const [pets] = data.data

            setPetList(pets)

        }
        fetchBooks()

    }, [petID.id])

    console.log(petList)

    const handleAddCart = (petList) => {
        dispatch(addToCart(petList))

    }

    return (
        <Container>
            <Box p={5}>
                <Paper>
                    <Box p={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <img src={petList.img_url} style={{ width: "100%", height: "auto" }} alt={petList.name}></img>
                            </Grid>
                            <Grid item xs={8}>
                                <Paper>
                                    <Box p={5}>
                                        <Typography variant='h10' sx={{ color: "gray" }}>Category: {petList.cate_name}</Typography>
                                        <Typography sx={{ mt: 2, mb: 2 }} variant='h4'>{petList.name}</Typography>
                                        <Typography variant='h8'>Price: {petList.price}</Typography>
                                        <Divider sx={{ mt: 5, mb: 3 }}></Divider>
                                        <Typography sx={{ textAlign: "center", mt: 2, mb: 2 }}> Description for {petList.cate_name}</Typography>
                                        <Typography> {petList.description}</Typography>
                                        <Divider sx={{ mt: 5, mb: 3 }}></Divider>


                                        {user ? (
                                            <Button sx={{
                                                color: "white", backgroundColor: "black",
                                                transition: "0.4s"

                                                , "&:hover": {
                                                    transform: "translate(0, -5px)",
                                                    backgroundColor: "#696969 "
                                                },
                                            }} onClick={() => handleAddCart(petList)}> Place order now</Button>
                                        ) : (
                                            <Button sx={{
                                                color: "white", backgroundColor: "black",
                                                transition: "0.4s"

                                                , "&:hover": {
                                                    transform: "translate(0, -5px)",
                                                    backgroundColor: "#696969 "
                                                },
                                            }} onClick={() => alert("You have to login to place this")}> Place order now</Button>
                                        )}


                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>

        // <div>aaaa</div>
    )
}