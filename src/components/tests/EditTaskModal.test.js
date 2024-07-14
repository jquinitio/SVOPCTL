import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditTaskModal from "../EditTaskModal";

describe("EditTaskModal Component", () => {
  const mockTask = {
    id: "1",
    name: "Test Task",
    description: "This is a test task.",
    status: "Pending",
    dueDate: "2024-07-15",
  };

  it("renders correctly", () => {
    const { getByText, getByLabelText } = render(
      <EditTaskModal
        open={true}
        onClose={() => {}}
        task={mockTask}
        onUpdateTask={() => {}}
      />
    );

    expect(getByText("Edit Task")).toBeInTheDocument();
    expect(getByLabelText("Name")).toBeInTheDocument();
  });

  it("handles updating a task", () => {
    const mockOnUpdateTask = jest.fn();
    const { getByLabelText, getByText } = render(
      <EditTaskModal
        open={true}
        onClose={() => {}}
        task={mockTask}
        onUpdateTask={mockOnUpdateTask}
      />
    );

    fireEvent.change(getByLabelText("Name"), {
      target: { value: "Updated Task Name" },
    });
    fireEvent.click(getByText("Update Task"));

    expect(mockOnUpdateTask).toHaveBeenCalled();
    expect(mockOnUpdateTask.mock.calls[0][0].name).toBe("Updated Task Name");
  });
});
