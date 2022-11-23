import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCategory, getAllPets } from '../../Redux/apiRequest';
import { AddToCart } from '../../Redux/cartSlice';

const HomePage = () => {

    // const bookList = useSelector((state) => state.books.books?.allBooks);
    const petList = useSelector((state) => state.pet.pet?.allPets);
    const petCateList = useSelector((state) => state.category.category?.allCates);
    const [cate, setCate] = React.useState('');
    const [isRenpet, setIsRenpet] = React.useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        getAllPets(dispatch)
        getAllCategory(dispatch)
    }, [dispatch])

    const renderCategory = () => {
        return petCateList?.map((value) => {
            return <MenuItem value={value.name}>{value.name}</MenuItem>;
        });
    };

    const renderPet = () => {
        if (isRenpet === "") {
            return petList?.map((pet) => (
                <Grid item xs={2} sm={4} md={4} key={pet.id}>
                    <Card sx={{ maxWidth: 345, minHeight: 400 }}>
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
                                            backgroundColor: "none",
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
            ))

        } else {
            return petList?.filter(p => p.cate_name === cate)?.map((pet) => (
                <Grid item xs={2} sm={4} md={4} key={pet.id}>
                    <Card sx={{ maxWidth: 345, minHeight: 400 }}>
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
                                            backgroundColor: "none",
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
            ))
        }
    }

    const handleChange = (event) => {
        setIsRenpet("cate")

        setCate(event.target.value);
    };
    return (
        <Container sx={{ mt: 5 }}>
            <Box sx={{ minWidth: 120, textAlign: "right" }}>
                <FormControl sx={{ width: "6rem" }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cate}
                        label="Category"
                        onChange={handleChange}
                    >
                        {renderCategory(isRenpet)}
                    </Select>
                </FormControl>
            </Box>
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


                {renderPet()}

            </Grid>
        </Container>
    )
}

export default HomePage

