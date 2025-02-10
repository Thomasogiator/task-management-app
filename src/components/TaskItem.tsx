import React from "react";
import { IoTrash } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { Task } from "./useFetchTodos";

type TaskItemProps = {
    todo: Task;
    setOpenForm: (task: Task) => void;
    deleteTask: (e: React.FormEvent, id: number) => void;
    setSelectedToDo: (task: Task) => void;
};

const TaskItem = React.memo(({ todo, setOpenForm, deleteTask, setSelectedToDo }: TaskItemProps) => {
    return (
        <div key={todo.id} className="task-wrapper" onClick={() => setSelectedToDo(todo)}>
            <div className="task-part1">
                <h6>{todo.title}</h6>
                <p>{todo.description}</p>
                <sub>Due date: {todo.dueDate}</sub>
            </div>
            <div className="task-part2">
                <div>{todo.priority}</div>
                <div>{todo.status}</div>
                <div>
                    <span className="task-controls" onClick={(e) => { e.stopPropagation(); setOpenForm(todo); }}>
                        <AiOutlineEdit /> Edit
                    </span>
                    <span className="task-controls" onClick={(e) => { e.stopPropagation(); deleteTask(e, todo.id); }}>
                        <IoTrash color="red" /> Delete
                    </span>
                </div>
            </div>
        </div>
    );
});

export default TaskItem;
