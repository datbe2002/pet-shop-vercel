import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './searchpage.css'
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/cartSlice';
const SearchPage = () => {


    const [pets, setPets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchPets = async (title) => {
        const res = await axios.get(`https://pet-shop-mini.herokuapp.com/api/search?term=${title}`);

        console.log(res.data)
        // return res.data
        setPets(res.data)

    };

    const user = useSelector((state) => state.auth.login?.currentUser);

    const dispatch = useDispatch()

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setPets([])
    }

    const handleAddToCart = (pet) => {
        dispatch(addToCart(pet))

    }

    return (
        <Container sx={{ mt: 5 }}>

            <div className="input">
                <input
                    className="input__box"
                    placeholder="Search for pets..."
                    value={searchTerm}
                    onChange={handleSearch}
                ></input>

                <button
                    className="input__submit"
                    onClick={() => searchPets(searchTerm)}
                >
                    <AiOutlineArrowRight></AiOutlineArrowRight>
                </button>
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
                                            <Typography gutterBottom variant="h5" component="div">
                                                {pet.price} $
                                            </Typography>
                                            <Button
                                                sx={{
                                                    border: "1px solid black",
                                                    marginRight: "2rem",
                                                    transition: "0.5s",

                                                    "&:hover": {
                                                        transform: "translate(0, -5px)"
                                                    },
                                                }}>
                                                <Link
                                                    to={`/pet-detail/${pet.id}`}
                                                    style={{
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    View more
                                                </Link>
                                            </Button>

                                            {user ? (
                                                <Button
                                                    sx={{
                                                        backgroundColor: "black",
                                                        color: "white",
                                                        fontWeight: "bold",
                                                        textDecoration: "none",
                                                        transition: "0.5s",
                                                        "&:hover": {
                                                            color: "white",
                                                            backgroundColor: "#343434",
                                                            transform: "translate(0, -5px)"
                                                        },
                                                    }} onClick={() => handleAddToCart(pet)}>
                                                    Add to cart
                                                </Button>
                                            ) : (
                                                <Button
                                                    sx={{
                                                        backgroundColor: "black",
                                                        color: "white",
                                                        fontWeight: "bold",
                                                        textDecoration: "none",
                                                        transition: "0.5s",
                                                        "&:hover": {
                                                            color: "white",
                                                            backgroundColor: "#343434",
                                                            transform: "translate(0, -5px)"
                                                        },
                                                    }} onClick={() => alert("Please login to buy")}>
                                                    Add to cart
                                                </Button>
                                            )}



                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                        ))}
                    </>

                ) : (
                    <div style={{ marginTop: "20px" }}>No pet found</div>
                )}
            </Grid>
        </Container>
    );
}

export default SearchPage