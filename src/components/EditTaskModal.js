import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const EditTaskModal = ({ open, onClose, task, onUpdateTask }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdateTask(editedTask);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-task-modal"
      aria-describedby="modal for editing task"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Task
          </Typography>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={editedTask.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="description"
            label="Description"
            value={editedTask.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="dueDate"
            label="Due Date"
            type="date"
            value={editedTask.dueDate}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            name="status"
            label="Status"
            value={editedTask.status}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleUpdate}>
            Update Task
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
