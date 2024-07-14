import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskCard from "../TaskCard";

describe("TaskCard Component", () => {
  const mockTask = {
    id: "1",
    name: "Test Task",
    description: "This is a test task.",
    status: "Pending",
    dueDate: "2024-07-15",
  };

  it("renders correctly", () => {
    const { getByText } = render(
      <TaskCard
        task={mockTask}
        onUpdateTask={() => {}}
        onDeleteTask={() => {}}
      />
    );

    expect(getByText("Test Task")).toBeInTheDocument();
    expect(getByText("This is a test task.")).toBeInTheDocument();
  });

  it("handles deleting a task", () => {
    const mockOnDeleteTask = jest.fn();
    const { getByText } = render(
      <TaskCard
        task={mockTask}
        onUpdateTask={() => {}}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    fireEvent.click(getByText("Delete"));

    expect(mockOnDeleteTask).toHaveBeenCalled();
    expect(mockOnDeleteTask.mock.calls[0][0]).toBe("1");
  });
});
