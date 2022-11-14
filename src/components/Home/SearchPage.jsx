import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SearchPage = () => {


    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchPets = async (title) => {
        const res = await axios.get(`https://pet-shop-mini.herokuapp.com/api/search?term=${title}`);

        console.log(res.data)
        // return res.data
        setPets(res.data)

    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setPets([])
    }


    return (
        <Container sx={{ mt: 5 }}>

            <div className="search">
                <input
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={handleSearch}
                ></input>

                <img
                    alt="Search"
                    onClick={() => searchPets(searchTerm)}
                ></img>
            </div>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {pets?.length > 0 ? (
                    <>
                        {pets.map((pet) => (
                            <Grid item xs={2} sm={4} md={4} key={pet.id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            // height="auto:(("
                                            // image={pet.img_url}

                                            sx={{
                                                backgroundImage: `url(${pet.img_url})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover",
                                                width: "345px",
                                                height: "18rem",
                                            }}
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
                    </>

                ) : (
                    <div style={{ display: "flex", textAlign: "center" }}>No pet found</div>
                )}
            </Grid>
        </Container>
    );
}

export default SearchPage