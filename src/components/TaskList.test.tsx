import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "./TaskList";
import useFetch from "./useFetchTodos";

jest.mock("./useFetchTodos");

const mockTodos = [
  { id: 1, title: "Task A", description: "Desc A", status: "to-do", priority: "low", dueDate: "2025-02-20" },
  { id: 2, title: "Task B", description: "Desc B", status: "in-progress", priority: "medium", dueDate: "2025-02-15" },
  { id: 3, title: "Task C", description: "Desc C", status: "done", priority: "high", dueDate: "2025-02-10" },
];

beforeEach(() => {
  (useFetch as jest.Mock).mockReturnValue({
    data: mockTodos,
    loading: false,
    error: null,
    deleteData: jest.fn(),
    refetch: jest.fn(),
  });
});

describe("TaskList Component", () => {

  test("renders task list correctly", () => {
    render(<TaskList />);
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
    expect(screen.getByText("Task C")).toBeInTheDocument();
  });

  test("filters tasks by status", () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText("In-progress")); 
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.queryByText("Task B")).not.toBeInTheDocument();
  });

  test("filters tasks by priority", () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText("High"));
    expect(screen.getByText("Task C")).toBeInTheDocument();
    expect(screen.queryByText("Task A")).toBeInTheDocument();
  });

  test("searches tasks correctly", () => {
    render(<TaskList />);
    const searchInput = screen.getByPlaceholderText("Search task");
    fireEvent.change(searchInput, { target: { value: "Task A" } });

    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.queryByText("Task B")).not.toBeInTheDocument();
  });

  test("sorts tasks by priority (ascending)", async () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText("Priority"));

    await waitFor(() => {
      const tasks = screen.getAllByText(/Task [A-C]/);
      expect(tasks[0]).toHaveTextContent("Task A"); 
      expect(tasks[1]).toHaveTextContent("Task B"); 
      expect(tasks[2]).toHaveTextContent("Task C"); 
    });
  });

  test("sorts tasks by due date (descending)", async () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText("Due date"));

    await waitFor(() => {
      const tasks = screen.getAllByText(/Task [A-C]/);
      expect(tasks[0]).toHaveTextContent("Task A");
      expect(tasks[1]).toHaveTextContent("Task B");
      expect(tasks[2]).toHaveTextContent("Task C");
    });
  });

  test("deletes a task", async () => {
    const { getByText, queryByText } = render(<TaskList />);
    const deleteButton = getByText(/Delete/);

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(queryByText("Task A")).not.toBeInTheDocument();
    });
  });

});
