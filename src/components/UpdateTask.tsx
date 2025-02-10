import { useEffect, useState, useCallback, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useFetch from "./useFetchTodos";
import { NewTaskProps } from "./NewTask";

const UpdateTask: React.FC<NewTaskProps> = ({ onClose, todos }) => {
    const url = "https://67a9967e6e9548e44fc40ffa.mockapi.io/api/todos";
    const { loading, error, updateData } = useFetch(url);

    const [taskData, setTaskData] = useState({
        title: todos?.title || "",
        description: todos?.description || "",
        dueDate: todos?.dueDate || "",
        priority: todos?.priority || "",
        status: todos?.status || "",
    });

    const [openPriority, setOpenPriority] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);

    const priorities = useMemo(() => ["low", "medium", "high"], []);
    const todoStatuses = useMemo(() => ["to-do", "in-progress", "done"], []);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setTaskData((prev) => ({ ...prev, [name]: value }));
        },
        []
    );

    const selectPriority = useCallback((priority: string) => {
        setTaskData((prev) => ({ ...prev, priority }));
        setOpenPriority(false);
    }, []);

    const selectStatus = useCallback((status: string) => {
        setTaskData((prev) => ({ ...prev, status }));
        setOpenStatus(false);
    }, []);

    const togglePriority = useCallback(() => setOpenPriority((prev) => !prev), []);
    const toggleStatus = useCallback(() => setOpenStatus((prev) => !prev), []);

    const updateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateData(todos?.id ?? 0, taskData);
        setCreateSuccess(true);
    };

    useEffect(() => {
        if (createSuccess && onClose) {
            onClose();
            setCreateSuccess(false);
        }
    }, [createSuccess, onClose]);

    return (
        <form onSubmit={updateTask} className="task-form">
            <section className="input-field">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    placeholder="Enter task name"
                    onChange={handleInputChange}
                />
            </section>
            <section className="input-field">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={taskData.description}
                    rows={6}
                    placeholder="Enter task description"
                    onChange={handleInputChange}
                />
            </section>
            <section className="input-field">
                <label htmlFor="dueDate">Due date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleInputChange}
                />
            </section>
            <section className="input-field">
                <label htmlFor="priority">Priority</label>
                <input
                    onClick={togglePriority}
                    readOnly
                    type="text"
                    name="priority"
                    value={taskData.priority}
                    placeholder="Select priority level"
                />
                <span onClick={togglePriority}>
                    <IoIosArrowDown />
                </span>
                {openPriority && (
                    <ul className="form-dropdown">
                        {priorities.map((priority, index) => (
                            <li key={index} onClick={() => selectPriority(priority)}>
                                {priority}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <section className="input-field">
                <label htmlFor="status">Status</label>
                <input
                    onClick={toggleStatus}
                    readOnly
                    type="text"
                    name="status"
                    value={taskData.status}
                    placeholder="Select status"
                />
                <span onClick={toggleStatus}>
                    <IoIosArrowDown />
                </span>
                {openStatus && (
                    <ul className="form-dropdown">
                        {todoStatuses.map((status, index) => (
                            <li key={index} onClick={() => selectStatus(status)}>
                                {status}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            <div className="form-controls">
                <button type="submit">{loading ? "Loading..." : "Update"}</button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default UpdateTask;
