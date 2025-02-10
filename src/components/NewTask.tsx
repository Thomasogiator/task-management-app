import { useEffect, useState, useCallback, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import useFetch from "./useFetchTodos";
import { Task } from "./useFetchTodos";

export interface NewTaskProps {
  onClose?: () => void;
  todos?: Task | null;
}

const NewTask: React.FC<NewTaskProps> = ({ onClose }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  const [openDropdown, setOpenDropdown] = useState<{ priority: boolean; status: boolean }>({
    priority: false,
    status: false,
  });

  const [createSuccess, setCreateSuccess] = useState(false);
  const url = "https://67a9967e6e9548e44fc40ffa.mockapi.io/api/todos";
  const { loading, error, postData } = useFetch(url);

  const priorities = useMemo(() => ["low", "medium", "high"], []);
  const todoStatuses = useMemo(() => ["to-do", "in-progress", "done"], []);

  const handleDataChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const toggleDropdown = useCallback(
    (type: "priority" | "status") => {
      setOpenDropdown((prev) => ({ ...prev, [type]: !prev[type] }));
    },
    []
  );

  const selectOption = useCallback((type: "priority" | "status", value: string) => {
    setData((prev) => ({ ...prev, [type]: value }));
    setOpenDropdown((prev) => ({ ...prev, [type]: false }));
  }, []);

  const dataToSubmit = useMemo(() => data, [data]);

  const createNewTask = async (e: React.FormEvent) => {
    e.preventDefault();
    await postData(dataToSubmit);
    setCreateSuccess(true);
  };

  useEffect(() => {
    if (createSuccess && onClose) {
      onClose();
      setCreateSuccess(false);
    }
  }, [createSuccess, onClose]);

  return (
    <form onSubmit={createNewTask} className="task-form">
      <section className="input-field">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={data.title} placeholder="Enter task name" onChange={handleDataChange} />
      </section>
      <section className="input-field">
        <label htmlFor="description">Description</label>
        <textarea name="description" value={data.description} rows={6} placeholder="Enter task description" onChange={handleDataChange} />
      </section>
      <section className="input-field">
        <label htmlFor="dueDate">Due date</label>
        <input type="date" name="dueDate" value={data.dueDate} onChange={handleDataChange} />
      </section>
      <section className="input-field">
        <label htmlFor="priority">Priority</label>
        <input onClick={() => toggleDropdown("priority")} readOnly type="text" name="priority" value={data.priority} placeholder="Select priority level" />
        <span onClick={() => toggleDropdown("priority")}>
          <IoIosArrowDown />
        </span>
        {openDropdown.priority && (
          <ul className="form-dropdown">
            {priorities.map((priority, index) => (
              <li onClick={() => selectOption("priority", priority)} key={index}>
                {priority}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="input-field">
        <label htmlFor="status">Status</label>
        <input onClick={() => toggleDropdown("status")} readOnly type="text" name="status" value={data.status} placeholder="Select status" />
        <span onClick={() => toggleDropdown("status")}>
          <IoIosArrowDown />
        </span>
        {openDropdown.status && (
          <ul className="form-dropdown">
            {todoStatuses.map((status, index) => (
              <li onClick={() => selectOption("status", status)} key={index}>
                {status}
              </li>
            ))}
          </ul>
        )}
      </section>
      <div className="form-controls">
        <button type="submit">{loading ? "Loading..." : "Done"}</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};

export default NewTask;
