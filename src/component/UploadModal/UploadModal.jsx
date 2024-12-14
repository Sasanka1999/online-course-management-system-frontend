import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import instance from "../../../services/axiosOrder"; // Adjust path as necessary

const UploadModal = ({ courseId }) => {
  const [open, setOpen] = useState(false); // Modal state
  const [file, setFile] = useState(null); // Selected file or photo
  const [error, setError] = useState(""); // Error message

  // Handle modal open and close
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFile(null); // Clear file state on close
    setError("");
    setOpen(false);
  };

  // Handle file or photo selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(""); // Clear error when new file/photo is selected
  };

  // Handle file or photo upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await instance.post(`/course-materials/upload/${courseId}`, formData);
      alert("File uploaded successfully!");
      setFile(null); // Reset file input
      handleClose(); // Close modal after success
    } catch (error) {
      console.error("Error uploading file:", error.response || error);
      setError(error.response?.data || "Failed to upload. Please try again.");
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Upload Material
      </Button>

      {/* Modal for upload */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Upload Material
          </Typography>

          {/* File input */}
          <TextField
            type="file"
            fullWidth
            onChange={handleFileChange}
            inputProps={{ accept: "application/pdf,image/*" }} // Accept files and images
          />

          {/* Error message */}
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {/* Upload and Cancel buttons */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UploadModal;
