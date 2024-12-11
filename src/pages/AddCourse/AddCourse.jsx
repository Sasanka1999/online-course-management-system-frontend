import React, { useState, useEffect } from "react";
import instance from "../../../services/axiosOrder";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";

export default function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructorId: "",  // Added instructorId field to the state
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    // Get the role from localStorage and set isInstructor
    const role = localStorage.getItem("user-role");
    console.log("User role from localStorage: ", role);  // Debugging log
    setIsInstructor(role === "instructor");

    // Fetch instructorId from localStorage and set it to course state
    const instructorId = localStorage.getItem("instructor-id");
    console.log("Instructor ID from localStorage: ", instructorId);  // Debugging log

    if (instructorId) {
      setCourse((prevCourse) => ({ ...prevCourse, instructorId }));
    } else {
      setResponseMessage("Instructor ID not found!");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isInstructor) {
      setResponseMessage("Only instructors can add courses!");
      return;
    }

    // Check the data before submitting
    console.log("Course data before submitting: ", course);

    try {
      const response = await instance.post("/courses", course);  // Send course with instructorId
      setResponseMessage("Course added successfully!");
      setCourse({ title: "", description: "", instructorId: "" });  // Reset form
    } catch (error) {
      if (error.response) {
        const errorMessage = typeof error.response.data === 'string' ? error.response.data : "An error occurred!";
        setResponseMessage(errorMessage);
      } else {
        setResponseMessage("An error occurred!");
      }
      console.error("Error response: ", error.response);  // Log the error response
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
        Add Course
      </Typography>

      {responseMessage && (
        <Alert severity={responseMessage.includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
          {responseMessage}
        </Alert>
      )}

      {isInstructor ? (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Course Title"
            name="title"
            value={course.title}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Course Description"
            name="description"
            value={course.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          {/* Added instructorId field */}
          <TextField
            fullWidth
            label="Instructor ID"
            name="instructorId"
            value={course.instructorId}
            onChange={handleInputChange}
            margin="normal"
            required
            type="number"  // Assuming it's a number; adjust based on actual data type
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Course
          </Button>
        </form>
      ) : (
        <Alert severity="error" sx={{ mt: 2 }}>
          Only instructors can add courses!
        </Alert>
      )}
    </Box>
  );
}
