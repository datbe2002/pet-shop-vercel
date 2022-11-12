import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const HomePage = () => {

    // const bookList = useSelector((state) => state.books.books?.allBooks);
    const userList = useSelector((state) => state.users.users?.allUsers);

    return (
        <Container sx={{ mt: 5 }}>
            <Typography
                variant="h4"
                sx={{ fontWeight: "bold", textAlign: "center", mb: 5 }}
            >
                Book
            </Typography>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {userList.map((pet) => (
                    <Grid item xs={2} sm={4} md={4} key={pet.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="auto:(("
                                    image={pet.image}
                                    alt={pet.petName}
                                />
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {pet.petName}
                                    </Typography>
                                    <Button
                                        sx={{
                                            backgroundColor: "#36454F",
                                            "&:hover": {
                                                color: "white",
                                                backgroundColor: "#343434",
                                            },
                                        }}
                                    >
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