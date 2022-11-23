import React from "react";
import { Box, Button } from "@mui/material";

import { useDispatch } from "react-redux";
import { deletePet } from "../Redux/apiRequest";

const DeletePetInfor = ({ id }) => {
  //   const user = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  const handleDeleteCategory = (id) => {
    console.log(id);
    deletePet(id, dispatch);
  };

  return (
    <Box>
      <Button
        sx={{
          marginTop: "1rem",
          color: "white",
          fontWeight: "bold",
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "#6E260E",
          },
        }}
        onClick={() => handleDeleteCategory(id)}
      >
        Delete
      </Button>
    </Box>
  );
};

export default DeletePetInfor;
