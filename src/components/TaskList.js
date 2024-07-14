import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

const STATUSES = ["Pending", "In Progress", "Completed", "Cancelled"];

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      console.log("Dropped outside of a droppable area");
      return;
    }

    const { destination, draggableId } = result;

    const updatedTasks = [...tasks];

    const draggedTask = updatedTasks.find(
      (task) => task.id.toString() === draggableId
    );

    if (!draggedTask) {
      console.error(`Task with ID ${draggableId} not found!`);
      return;
    }

    draggedTask.status = destination.droppableId;

    axios
      .put(`http://localhost:5000/tasks/${draggedTask.id}`, draggedTask)
      .then((response) => {
        console.log("Response from server:", response.data);
        fetchTasks();
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleAddTask = (newTask) => {
    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleUpdateTask = (updatedTask) => {
    axios
      .put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? response.data : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5000/tasks/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const groupTasksByStatus = () => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {});
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "rgba(241, 196, 15, .75)";
      case "In Progress":
        return "rgba(162, 155, 254, .75)";
      case "Completed":
        return "rgba(46, 204, 113, .75)";
      case "Cancelled":
        return "rgba(214, 48, 49, .75)";
      default:
        return "rgba(255, 255, 255, .75)";
    }
  };

  const renderStatusGroup = (status) => {
    const tasksForStatus = groupTasksByStatus()[status] || [];

    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        key={status}
        style={{
          backgroundColor: getStatusColor(status),
          minHeight: "450px",
          padding: "10px",
          border: "5px solid white",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h6" align="left" gutterBottom>
          <strong>{`${status} Tasks`}</strong>
        </Typography>
        <Droppable droppableId={status} key={status}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                minHeight: "100px",
              }}
            >
              {tasksForStatus.length > 0 ? (
                tasksForStatus.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={String(task.id)}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          onUpdateTask={handleUpdateTask}
                          onDeleteTask={handleDeleteTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <Typography
                  variant="body2"
                  align="center"
                  style={{ marginTop: 20 }}
                >
                  No tasks in this category
                </Typography>
              )}
              {provided.placeholder}
              {tasksForStatus.length === 0 && (
                <div style={{ minHeight: "100px" }}></div>
              )}
            </div>
          )}
        </Droppable>
      </Grid>
    );
  };

  const CustomButton = styled(Button)({
    textTransform: "none",
    backgroundColor: "rgba(0, 150, 100, 1)",
    "&:hover": {
      backgroundColor: "darkgreen",
    },
  });

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box mt={4}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6} display="flex" justifyContent="flex-start">
              <div>
                <Typography variant="h5">
                  <strong>My Tasks</strong>
                </Typography>
                <Typography variant="body2">
                  Drag and Drop the tasks to update its status.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="flex-end">
              <CustomButton
                variant="contained"
                onClick={() => setIsModalOpen(true)}
                startIcon={<AddIcon style={{ fontSize: "2rem" }} />}
              >
                Add Task
              </CustomButton>
            </Grid>
            {STATUSES.map((status, index) => renderStatusGroup(status))}
          </Grid>
        </Box>
      </DragDropContext>
      <AddTaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </>
  );
};

export default TaskList;
