import React, { useState, useEffect } from "react";
import instance from "../../../services/axiosOrder"; // Adjust the path if needed
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Alert, Box } from "@mui/material";

export default function RegisterUser() {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
    role: "student", // Default role
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [userRole, setUserRole] = useState(null); // To store the user's role

  useEffect(() => {
    const token = localStorage.getItem("ocm-token");

    if (!token) {
      setResponseMessage("No valid token found!");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT to get payload
    const role = decodedToken.role; // Extract role from the token payload
    setUserRole(role);

    if (role !== "admin" && role !== "instructor") {
      setResponseMessage("You don't have permission to register users.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRole !== "admin" && userRole !== "instructor") {
      setResponseMessage("You don't have permission to register users.");
      return;
    }

    try {
      const token = localStorage.getItem("ocm-token");

      if (!token) {
        setResponseMessage("No valid token found!");
        return;
      }

      const response = await instance.post("/auth/register", userDetails);
      setResponseMessage("User registered successfully!");
      // Clear the form after successful submission
      setUserDetails({ userName: "", password: "", role: "student" });
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data);
      } else {
        setResponseMessage("An error occurred!");
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Register User
      </Typography>
      {responseMessage && (
        <Alert severity={responseMessage.includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
          {responseMessage}
        </Alert>
      )}
      {userRole && (userRole === "admin" || userRole === "instructor") && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="User Name"
            name="userName"
            value={userDetails.userName}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={userDetails.password}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={userDetails.role}
              onChange={handleInputChange}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      )}
    </Box>
  );
}
