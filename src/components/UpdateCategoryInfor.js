import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { updateCategory } from "../Redux/apiRequest";
import cateSlice from "../Redux/cateSlice";

const UpdateCategoryInfor = ({ cate }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: cate.id,
      name: cate.name,
    },
    onSubmit: (values) => {
      const newObject = values;

      console.log(newObject);

      updateCategory(dispatch, newObject);

      handleClose();
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
    }),
  });
  return (
    <Box>
      <Button
        sx={{
          color: "white",
          fontWeight: "bold",
          backgroundColor: "#09BFB8",
          "&:hover": {
            color: "white",
            backgroundColor: "#034C49",
          },
        }}
        onClick={handleOpen}
      >
        Update
      </Button>
      <Modal
        sx={{ width: "100%", padding: "0 45rem", mt: 20 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={{ minWidth: "500px" }}>
          <Box p={5}>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h2"
              gutterBottom
              textAlign={"center"}
            >
              Update {cate.name}
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Type new name"
                variant="outlined"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              ></TextField>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 20,
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#236DC9",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#154178",
                    },
                  }}
                  disabled={!formik.dirty}
                >
                  Submit
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#FF0000",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#880808",
                    },
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default UpdateCategoryInfor;
