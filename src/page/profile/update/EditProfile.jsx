import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import api from "../../../config/axios";
import "./EditProfile.css"; // Import CSS cho trang
const EditProfile = ({ userData }) => {
  // const userData = location.state?.userData || {};
  // const userRole = location.state?.userRole;
  // const [name, setName] = useState(userData.name || "");
  // const [phone, setPhone] = useState(userData.phone || "");
  // const [email, setEmail] = useState(userData.email || "");
  // const [gender, setGender] = useState(userData.gender || "");
  const [profileToUpdate, setProfileToUpdate] = useState(
    userData || { username: "", phoneNumber: "", dateOfBirth: "", email: "" }
  );

  const handleUpdateProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileToUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("profileToUpdate: ", profileToUpdate);
  //   // if (validate()) {
  //   try {
  //     await api.put(`user/${userData.id}`, profileToUpdate);
  //   } catch (error) {
  //     console.log("Failed to update profile: ", error);
  //   }
  //   // }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new object with only the properties you want to update
    const updatedProfile = {
      username: profileToUpdate.username,
      phoneNumber: profileToUpdate.phoneNumber,
      dateOfBirth: profileToUpdate.dateOfBirth,
      password: profileToUpdate.password,
      email: profileToUpdate.email,
    };

    console.log("Profile to update:", updatedProfile); // Log the updated profile data

    try {
      await api.put(`user/${profileToUpdate.id}`, updatedProfile);
      console.log("Profile updated successfully");
    } catch (error) {
      if (error.response) {
        console.error("Failed to update profile: ", error.response.data);
      } else {
        console.error("Failed to update profile: ", error.message);
      }
    }
  };
  return (
    <>
      {/* <Box
        sx={{
          maxWidth: 500,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          margin: "20px auto",
        }}
      > */}
      <Typography
        variant="h4"
        component="h1"
        sx={{ margin: "0 auto", textAlign: "center", color: "#0089E0" }}
      >
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="standard"
          label="Họ và tên"
          name="username"
          value={profileToUpdate.username}
          onChange={handleUpdateProfileChange}
          // error={!!errors.name}
          // helperText={errors.name}
          fullWidth
          margin="normal"
        />
        {/* <TextField
          variant="standard"
          label="Mật khẩu"
          name="password"
          value={profileToUpdate.password}
          onChange={handleUpdateProfileChange}
          fullWidth
          margin="normal"
        /> */}
        <TextField
          variant="standard"
          label="Số điện thoại"
          // placeholder="123 Main Street, Hometown"
          name="phoneNumber"
          value={profileToUpdate.phoneNumber}
          onChange={handleUpdateProfileChange}
          // error={!!errors.address}
          // helperText={errors.address}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal" variant="standard">
          <InputLabel shrink htmlFor="dateOfBirth">
            Sinh nhật
          </InputLabel>
          <TextField
            id="dateOfBirth"
            variant="standard"
            name="dateOfBirth"
            type="date"
            value={profileToUpdate.dateOfBirth.split("/").reverse().join("-")}
            onChange={handleUpdateProfileChange}
            // error={!!errors.dateofbirth}
            // helperText={errors.dateofbirth}
            fullWidth
            margin="normal"
          />
        </FormControl>
        <TextField
          variant="standard"
          label="Email"
          // placeholder="25"
          name="email"
          value={profileToUpdate.email}
          onChange={handleUpdateProfileChange}
          // error={!!errors.age}
          // helperText={errors.age}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          sx={{ margin: "0 auto", display: "block" }}
        >
          Update Profile
        </Button>
      </form>
      {/* </Box> */}
    </>
  );
};
export default EditProfile;
