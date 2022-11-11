import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { updateUser } from "../Redux/apiRequest";

const UpdateUserInfor = ({ user }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      address: user.address,
      phone: user.phone,
    },
    onSubmit: (values) => {
      const newObject = values;

      console.log(newObject);

      updateUser(dispatch, newObject);

      handleClose();
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
    <Container>
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
                Update {user.fullName}
              </Typography>
              <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
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
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
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
    </Container>
  );
};

export default UpdateUserInfor;
