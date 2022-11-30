import Box from '@mui/material/Box';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../AdminSection/NotFound';
import Grid from '@mui/material/Unstable_Grid2';
import * as Yup from "yup";
import { useFormik } from "formik";
import "./profile.css"
import { Chip, Divider, TextField } from '@mui/material';
import { updateUser } from '../../Redux/apiRequest';



const ProfileSetting = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    console.log(user);

    const dispatch = useDispatch()
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const formik = useFormik({
        initialValues: {
            id: user?.user?.id,
            email: user?.user?.email,
            fullName: user?.user?.fullName,
            address: user?.user?.address,
            phone: user?.user?.phone,
        },
        onSubmit: (values) => {
            const newObject = values;

            console.log(newObject);

            updateUser(dispatch, user?.accessToken, newObject);

        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Mail is required"),
            fullName: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            address: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
        }),
    });
    return (
        <>
            {user?.user?.role === "User" ? (
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    < Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid xs={6} md={4}>
                                <div class="profile__avatar">
                                    <div class="profile__avatar--img"><img class="rounded-circle" width="150px" src={user?.user?.avatar} alt='avatar' />
                                        <Divider variant="middle">
                                            <Chip label="Name"></Chip>
                                        </Divider>
                                        <span class="font-weight-bold">{user?.user?.fullName}</span>
                                        <Divider variant="middle">
                                            <Chip label="Email"></Chip>
                                        </Divider>

                                        <span class="text-black-50">{user?.user?.email}</span></div>
                                </div>
                            </Grid>
                            <Grid xs={6} md={4}>
                                <div class="profile__information">
                                    <div class="profile__title">
                                        <div class="profile__title--header">
                                            <h4 class="text-right">Profile Settings</h4>
                                        </div>
                                        <div class="profile__name">
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                placeholder="Type your email"
                                                variant="outlined"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                            ></TextField>
                                            <TextField
                                                fullWidth
                                                label="FullName"
                                                placeholder="Type your full name"
                                                sx={{ marginTop: "20px" }}
                                                variant="outlined"
                                                name="fullName"
                                                value={formik.values.fullName}
                                                onChange={formik.handleChange}
                                                error={
                                                    formik.touched.fullName && Boolean(formik.errors.fullName)
                                                }
                                                helperText={formik.touched.fullName && formik.errors.fullName}
                                            ></TextField>

                                            <TextField
                                                fullWidth
                                                label="Address"
                                                sx={{ marginTop: "20px" }}
                                                variant="outlined"
                                                name="address"
                                                value={formik.values.address}
                                                onChange={formik.handleChange}
                                                error={formik.touched.address && Boolean(formik.errors.address)}
                                                helperText={formik.touched.address && formik.errors.address}
                                            ></TextField>
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                placeholder="Type anything you likeee"
                                                sx={{ marginTop: "20px" }}
                                                variant="outlined"
                                                name="phone"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                helperText={formik.touched.phone && formik.errors.phone}
                                            ></TextField>

                                        </div>

                                        <div class="profile__button--save"><button class="btn btn-primary profile-button" type="submit">Save Profile</button></div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={6} md={4}>
                            </Grid>
                        </Grid>
                    </Box>

                </form>


            ) : (
                <NotFound></NotFound>
            )}

        </>

    )
}

export default ProfileSetting



