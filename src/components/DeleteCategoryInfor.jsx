import { Box, Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../Redux/apiRequest';

const DeleteCategoryInfor = ({ id }) => {
    const user = useSelector((state) => state.auth.login?.currentUser);

    const dispatch = useDispatch()

    const handleDeleteCategory = (id) => {
        deleteCategory(id, user?.accessToken, dispatch)
    }

    return (
        <Box>
            <Button
                sx={{
                    marginTop: "1rem",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "red", "&:hover": {
                        backgroundColor: '#6E260E'
                    },
                }} onClick={() => handleDeleteCategory(id)}
            >
                Delete
            </Button>
        </Box>
    )
}

export default DeleteCategoryInfor