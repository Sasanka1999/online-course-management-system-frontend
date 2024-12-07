import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CourseCard from "../../component/Course Card/CourseCard";
import instance from "../../../services/axiosOrder";

// The Courses Component
function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchCourses = async () => {
      try {
        const response = await instance.get("/courses/with-materials"); // API request
        setCourses(response.data); // Set the response data to state
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    fetchCourses(); // Call the fetch function on component mount
  }, []); // Empty dependency array ensures it runs once after the first render

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Courses
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {/* Render CourseCard components dynamically based on the fetched data */}
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Box>
    </Box>
  );
}

export default Courses;
