import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const AddTaskModal = ({ open, onClose, onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const handleAddTask = () => {
    const newTask = {
      id: String(Date.now()),
      name: taskName,
      description,
      status,
      dueDate,
    };
    onAddTask(newTask);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add Task
        </Typography>
        <TextField
          label="Task Name"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          sx={{ mt: 2 }}
        >
          Add Task
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
