import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddTaskModal from "../AddTaskModal";

describe("AddTaskModal Component", () => {
  it("renders correctly", () => {
    const { getByText, getByLabelText } = render(
      <AddTaskModal open={true} onClose={() => {}} onAddTask={() => {}} />
    );

    expect(getByText("Add Task")).toBeInTheDocument();
    expect(getByLabelText("Task Name")).toBeInTheDocument();
  });

  it("handles adding a task", () => {
    const mockOnAddTask = jest.fn();
    const { getByLabelText, getByText } = render(
      <AddTaskModal open={true} onClose={() => {}} onAddTask={mockOnAddTask} />
    );

    fireEvent.change(getByLabelText("Task Name"), {
      target: { value: "Test Task" },
    });
    fireEvent.click(getByText("Add Task"));

    expect(mockOnAddTask).toHaveBeenCalled();
    expect(mockOnAddTask.mock.calls[0][0].name).toBe("Test Task");
  });
});
