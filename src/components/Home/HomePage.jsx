import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPets } from '../../Redux/apiRequest';

const HomePage = () => {

    // const bookList = useSelector((state) => state.books.books?.allBooks);
    const petList = useSelector((state) => state.pet.pet?.allPets);

    const dispatch = useDispatch()

    useEffect(() => {
        getAllPets(dispatch)
    }, [dispatch])

    return (
        <Container sx={{ mt: 5 }}>
            <Typography
                variant="h4"
                sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}
            >
                PET
            </Typography>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {petList.map((pet) => (
                    <Grid item xs={2} sm={4} md={4} key={pet.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="auto:(("
                                    image={pet.img_url}
                                    alt={pet.name}
                                />
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {pet.name}
                                    </Typography>
                                    <Button
                                        sx={{
                                            backgroundColor: "#36454F",
                                            "&:hover": {
                                                color: "white",
                                                backgroundColor: "#343434",
                                            },
                                        }}>
                                        <Link
                                            to={`/pet-detail/${pet.id}`}
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Read more
                                        </Link>
                                    </Button>


                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default HomePage