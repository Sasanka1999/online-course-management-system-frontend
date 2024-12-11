import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import instance from "../../../services/axiosOrder";

const CourseCard = ({ course }) => {
  const [expanded, setExpanded] = useState(false);

  // Handle the download of course materials
  const handleDownload = async (fileName) => {
    try {
      // Ensure fileName is just the filename, not a full path
      const response = await instance.get(`/course-materials/download/${fileName}`, {
        responseType: "blob", // To handle binary file response
      });

      // Create a URL for the downloaded file and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Set the filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up after download

      // Clean up the URL object after download
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  // Toggle the expanded state to show or hide materials
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        {/* Display course title and description */}
        <Typography variant="h6">{course.title}</Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {course.description}
        </Typography>

        {/* Divider between the title/description and materials section */}
        <Divider style={{ margin: "10px 0" }} />

        {/* Button to toggle the materials display */}
        <Button onClick={toggleExpand} variant="outlined" size="small">
          {expanded ? "Hide Materials" : "Show Materials"}
        </Button>

        {/* Display course materials in a collapsible section */}
        <Collapse in={expanded}>
          <Box mt={2}>
            <Typography variant="subtitle1">Course Materials:</Typography>
            {course.courseMaterials.map((material) => (
              <Box key={material.id} display="flex" alignItems="center" mb={1}>
                {/* Display file name and download button */}
                <Typography variant="body2" style={{ marginRight: "10px" }}>
                  {material.fileName}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleDownload(material.fileName)} 
                >
                  Download
                </Button>
              </Box>
            ))}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
