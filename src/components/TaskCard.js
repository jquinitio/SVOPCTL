import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTaskModal from "./EditTaskModal";
import { format } from "date-fns";

const TaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    onDeleteTask(task.id);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const formattedDueDate = format(new Date(task.dueDate), "dd/MM/yyyy");

  return (
    <>
      <Card
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          margin: "10px",
          position: "relative",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            display: "flex",
            gap: "-10px",
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={handleEditClick}
            style={{
              backgroundColor: "#2d3436",
              color: "white",
              padding: "5px",
              borderRadius: "50%",
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleDeleteClick}
            style={{
              backgroundColor: "#d63031",
              color: "white",
              padding: "5px",
              borderRadius: "50%",
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <CardContent style={{ padding: "10px", marginTop: "2.5px" }}>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            <strong>{task.name}</strong>
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "10px" }}>
            {task.description}
          </Typography>
          <Typography
            variant="body2"
            style={{ marginBottom: "10px", textAlign: "right" }}
          >
            Due Date: <strong>{formattedDueDate}</strong>
          </Typography>
        </CardContent>
      </Card>
      <EditTaskModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={task}
        onUpdateTask={onUpdateTask}
      />
    </>
  );
};

export default TaskCard;
