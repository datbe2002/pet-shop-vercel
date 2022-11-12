import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Divider, dividerClasses, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function PetDetailPage() {

    const [petList, setPetList] = useState([]);
    const petID = useParams()

    // console.log(petID)
    useEffect(() => {
        async function fetchBooks() {
            const data = await axios.get(`https://pet-shop-mini.herokuapp.com/api/pet/${petID.id}`);

            const [pets] = data.data

            setPetList(pets)

        }
        fetchBooks()

    }, [])

    console.log(petList)

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