import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import instance from "../../../services/axiosOrder";
import UploadModal from "../UploadModal/UploadModal";

const CourseCard = ({ course }) => {
  const [expanded, setExpanded] = useState(false);

  const handleDownload = async (fileName) => {
    try {
      const response = await instance.get(`/course-materials/download/${fileName}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{course.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {course.description}
        </Typography>

        <Divider style={{ margin: "10px 0" }} />

        {/* Upload button */}
        <Box mb={2}>
          <UploadModal courseId={course.id} />
        </Box>

        <Button onClick={toggleExpand} variant="outlined" size="small">
          {expanded ? "Hide Materials" : "Show Materials"}
        </Button>

        <Collapse in={expanded}>
          <Box mt={2}>
            <Typography variant="subtitle1">Course Materials:</Typography>
            {course.courseMaterials.map((material) => (
              <Box key={material.id} display="flex" alignItems="center" mb={1}>
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
