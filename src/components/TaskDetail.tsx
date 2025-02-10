import { useState, useCallback } from "react";
import useFetch, { Task } from "./useFetchTodos";
import { IoIosArrowDown } from "react-icons/io";

interface TaskDetailProps {
    onClose: () => void;
    todos: Task | null;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ onClose, todos }) => {
    const url = "https://67a9967e6e9548e44fc40ffa.mockapi.io/api/todos";
    const { error, updateData } = useFetch(url);

    const [taskData, setTaskData] = useState({
        priority: todos?.priority || "",
        status: todos?.status || "",
    });

    const [openDropdown, setOpenDropdown] = useState({ priority: false, status: false });

    const priorities = ["low", "medium", "high"];
    const todoStatuses = ["to-do", "in-progress", "done"];

    const toggleDropdown = useCallback((key: "priority" | "status") => {
        setOpenDropdown((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const updateField = async (key: "priority" | "status", value: string) => {
        if (!todos) return;
        setTaskData((prev) => ({ ...prev, [key]: value }));
        await updateData(todos.id, { [key]: value });
        setOpenDropdown((prev) => ({ ...prev, [key]: false }));
    };

    return (
        <>
            <div onClick={onClose} className="overlay"></div>
            <div className="task-detail-wrapper">
                <h6>
                    <b>Name:</b> {todos?.title}
                </h6>
                <p>
                    <b>Description:</b> {todos?.description}
                </p>
                <sub>
                    <b>Due date:</b> {todos?.dueDate}
                </sub>

                <div>
                    <b>Priority:</b> {taskData.priority}{" "}
                    <IoIosArrowDown onClick={() => toggleDropdown("priority")} />
                    {openDropdown.priority && (
                        <ul className="form-dropdown">
                            {priorities.map((priority, index) => (
                                <li key={index} onClick={() => updateField("priority", priority)}>
                                    {priority}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <b>Status:</b> {taskData.status}{" "}
                    <IoIosArrowDown onClick={() => toggleDropdown("status")} />
                    {openDropdown.status && (
                        <ul className="form-dropdown">
                            {todoStatuses.map((status, index) => (
                                <li key={index} onClick={() => updateField("status", status)}>
                                    {status}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {error && <div className="error">{error}</div>}
            </div>
        </>
    );
};

export default TaskDetail;
