import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "../TaskList";
import axios from "axios";

jest.mock("axios");

describe("TaskList Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({
      data: { id: "1", name: "New Task", status: "Pending" },
    });
    axios.put.mockResolvedValue({
      data: { id: "1", name: "Updated Task", status: "Pending" },
    });
    axios.delete.mockResolvedValue({});
  });

  it("renders correctly", async () => {
    const { getByText } = render(<TaskList />);

    expect(getByText("My Tasks")).toBeInTheDocument();
    expect(getByText("Pending Tasks")).toBeInTheDocument();
    expect(getByText("In Progress Tasks")).toBeInTheDocument();
    expect(getByText("Completed Tasks")).toBeInTheDocument();
    expect(getByText("Cancelled Tasks")).toBeInTheDocument();
  });

  it("adds a new task", async () => {
    const { getByText, getByLabelText } = render(<TaskList />);

    fireEvent.click(getByText("Add Task"));
    fireEvent.change(getByLabelText("Task Name"), {
      target: { value: "New Task" },
    });
    fireEvent.click(getByText("Add Task"));

    await waitFor(() => {
      expect(getByText("New Task")).toBeInTheDocument();
    });
  });

  it("displays a message when there are no tasks in a status group", async () => {
    const { getByText } = render(<TaskList />);

    expect(getByText("No tasks in this category")).toBeInTheDocument();
  });
});
