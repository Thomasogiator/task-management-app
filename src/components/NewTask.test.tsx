import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewTask from "./NewTask";
import useFetch from "./useFetchTodos";
import userEvent from "@testing-library/user-event";

jest.mock("./useFetchTodos");

describe("NewTask Component", () => {
  const mockPostData = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      postData: mockPostData,
    });
  });

  it("renders all input fields correctly", () => {
    render(<NewTask onClose={mockOnClose} />);
    
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select priority level")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select status")).toBeInTheDocument();
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it("updates input values correctly", async () => {
    render(<NewTask onClose={mockOnClose} />);
    const titleInput = screen.getByLabelText(/Title/i) as HTMLInputElement;
    const descInput = screen.getByLabelText(/Description/i) as HTMLTextAreaElement;
    const dateInput = screen.getByLabelText(/Due date/i) as HTMLInputElement;

    await userEvent.type(titleInput, "New Task");
    await userEvent.type(descInput, "This is a test description.");
    await userEvent.type(dateInput, "2025-12-01");

    expect(titleInput.value).toBe("New Task");
    expect(descInput.value).toBe("This is a test description.");
    expect(dateInput.value).toBe("2025-12-01");
  });

  it("opens and selects a priority from dropdown", async () => {
    render(<NewTask onClose={mockOnClose} />);
    
    const priorityInput = screen.getByPlaceholderText("Select priority level");
    const dropdownArrow = screen.getAllByRole("button")[0];

    fireEvent.click(dropdownArrow);
    expect(screen.getByText(/low/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/medium/i));
    expect(priorityInput).toHaveValue("medium");
  });

  it("opens and selects a status from dropdown", async () => {
    render(<NewTask onClose={mockOnClose} />);
    
    const statusInput = screen.getByPlaceholderText("Select status");
    const dropdownArrow = screen.getAllByRole("button")[1];

    fireEvent.click(dropdownArrow);
    expect(screen.getByText(/to-do/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/in-progress/i));
    expect(statusInput).toHaveValue("in-progress");
  });

  it("calls postData when submitting the form", async () => {
    render(<NewTask onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText(/Title/i);
    const submitButton = screen.getByText(/Done/i);

    await userEvent.type(titleInput, "Task Name");
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockPostData).toHaveBeenCalledTimes(1));
    expect(mockPostData).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Task Name" })
    );
  });

  it("calls onClose after successful submission", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      postData: async () => Promise.resolve(),
    });

    render(<NewTask onClose={mockOnClose} />);
    
    const submitButton = screen.getByText(/Done/i);
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  it("displays an error message if postData fails", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      error: "Failed to create task",
      postData: mockPostData,
    });

    render(<NewTask onClose={mockOnClose} />);
    expect(screen.getByText("Failed to create task")).toBeInTheDocument();
  });
});
