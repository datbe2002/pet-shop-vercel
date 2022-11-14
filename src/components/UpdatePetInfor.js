import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { updatePet } from "../Redux/apiRequest";
const UpdatePetInfor = ({ pet }) => {
  const petCateList = useSelector((state) => state.category.category?.allCates);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      id: pet.id,
      img_url: pet.img_url,
      name: pet.name,
      price: pet.price,
      description: pet.description,
      status: pet.status,
      cate_id: "",
    },
    onSubmit: (values) => {
      const newObject = values;
      console.log(newObject);

      updatePet(dispatch, newObject);

      handleClose();
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      img_url: Yup.string().required("Required.").min(2),
      price: Yup.number().required("Required.").min(2),
      description: Yup.string().required("Required."),
      status: Yup.string().required("Required."),
      cate_id: Yup.string().required("Required."),
    }),
  });
  const renderCategory = () => {
    return petCateList?.map((value) => {
      return <MenuItem value={value.id}>{value.name}</MenuItem>;
    });
  };

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
              Update {pet.name}
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Image"
                placeholder="Type new image url"
                variant="outlined"
                name="img_url"
                value={formik.values.img_url}
                onChange={formik.handleChange}
                error={formik.touched.img_url && Boolean(formik.errors.img_url)}
                helperText={formik.touched.img_url && formik.errors.img_url}
              ></TextField>
              <TextField
                fullWidth
                label="Name"
                sx={{ marginTop: "20px" }}
                placeholder="Type new name"
                variant="outlined"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              ></TextField>
              <TextField
                fullWidth
                label="Price"
                sx={{ marginTop: "20px" }}
                placeholder="Type new price"
                variant="outlined"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              ></TextField>
              <TextField
                fullWidth
                label="Description"
                sx={{ marginTop: "20px" }}
                placeholder="Type new description"
                variant="outlined"
                multiline
                rows={4}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              ></TextField>

              <FormControl>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  sx={{ marginTop: "20px" }}
                  name="status"
                  value={formik.values.status}
                  label="Remote"
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                >
                  <MenuItem value={"Available"}>Available</MenuItem>
                  <MenuItem value={"Unavailable"}>Unavailable</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="cate_id">Category</InputLabel>
                <Select
                  labelId="cate_id"
                  id="cate_id"
                  sx={{ marginTop: "20px" }}
                  name="cate_id"
                  value={formik.values.cate_id}
                  label="Category"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cate_id && Boolean(formik.errors.cate_id)
                  }
                  helperText={formik.touched.cate_id && formik.errors.cate_id}
                >
                  {renderCategory()}
                </Select>
              </FormControl>
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

export default UpdatePetInfor;
