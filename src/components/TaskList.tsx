import { useState, useMemo, useCallback } from "react"
import { IoTrash } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import TaskDetail from "./TaskDetail";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import useFetch, { Task } from "./useFetchTodos";
import UpdateTask from "./UpdateTask";
import TaskItem from "./TaskItem";

type Priority = "low" | "medium" | "high";

export const TaskList = () => {
    const [status, setStatus] = useState('All')
    const [priority, setPriority] = useState('')
    const [selectedTodo, setSelectedToDo] = useState<Task | null>(null)
    const [openDate, setOpenDate] = useState(false)
    const [openPriority, setOpenPriority] = useState(false)
    const [openForm, setOpenForm] = useState<Task | null>(null)
    const [searchTerm, setSearchTerm] = useState("");
    type SortType = "priority-asc" | "priority-desc" | "dueDate-asc" | "dueDate-desc";
    const [sortType, setSortType] = useState<SortType>("priority-asc");
    const url = 'https://67a9967e6e9548e44fc40ffa.mockapi.io/api/todos'
    const {data: todoData, loading, error, deleteData, refetch} = useFetch(url)

    const filteredTodos = useMemo(() => {
        if (!Array.isArray(todoData)) return [];
        return todoData.filter((todo) => {
            const matchesStatus = status === "All" || todo.status === status?.toLowerCase();
            const matchesPriority = !priority || todo.priority === priority?.toLowerCase();
            const matchesSearch = todo.title?.toLowerCase().includes(searchTerm?.toLowerCase()) || todo.description?.toLowerCase().includes(searchTerm?.toLowerCase());
    
            return matchesStatus && matchesPriority && matchesSearch;
        });
    }, [todoData, status, priority, searchTerm]);

    
  
    const priorityOrder: Record<Priority, number> = { low: 1, medium: 2, high: 3 };
  
    // Sorting function
    const sortedTodos = useMemo(() => {
        return [...filteredTodos].sort((a, b) => {
            if (sortType.includes("priority")) {
                const priorityComparison = priorityOrder[a.priority as Priority] - priorityOrder[b.priority as Priority];
                if (priorityComparison !== 0) {
                    return sortType === "priority-asc" ? priorityComparison : -priorityComparison;
                }
            }
    
            if (sortType.includes("dueDate")) {
                const dateA = new Date(a.dueDate).getTime();
                const dateB = new Date(b.dueDate).getTime();
                return sortType === "dueDate-asc" ? dateA - dateB : dateB - dateA;
            }
    
            return 0;
        });
    }, [filteredTodos, sortType]);
  

    const changeStatus = useCallback((e: React.MouseEvent<HTMLParagraphElement>) => {
        const newStatus = e.currentTarget.innerText;
        if (status !== newStatus) {
            setStatus(newStatus);
        }
    }, [status]);
    
    const changePriority = useCallback((e: React.MouseEvent<HTMLParagraphElement>) => {
        const newPriority = e.currentTarget.innerText;
        if (priority !== newPriority) {
            setPriority(newPriority);
        }
    }, [priority]);

    const showDateSort=()=>{
        setOpenDate(prev=>!prev)
    }

    const showPrioritySort=()=>{
        setOpenPriority(prev=>!prev)
    }

    const closeTodoDetail=()=>{
        setSelectedToDo(null)
    }

    const closeForm=()=>{
        setOpenForm(null)
    }

    const deleteTask = useCallback(async (e: React.FormEvent, id: number) => {
        e.preventDefault();
        await deleteData(id);
        refetch();
    }, [deleteData, refetch]);

  return (
    <div className="task-main-body">
        <header className="task-search">
            <input type="search" placeholder="Search task" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <span><IoIosSearch/></span>
        </header>
        <section>
            <div className="status-filter">
                <span className={status === 'All' ? 'filter-bg' : ''} onClick={changeStatus}>All</span>
                <span className={status === 'To-do' ? 'filter-bg' : ''} onClick={changeStatus}>To-do</span>
                <span className={status === 'In-progress' ? 'filter-bg' : ''} onClick={changeStatus}>In-progress</span>
                <span className={status === 'Done' ? 'filter-bg' : ''} onClick={changeStatus}>Done</span>
            </div>
            <div className="status-filter">
                Priority:
                <span className={priority === 'Low' ? 'filter-bg' : ''} onClick={changePriority}>Low</span>
                <span className={priority === 'Medium' ? 'filter-bg' : ''} onClick={changePriority}>Medium</span>
                <span className={priority === 'High' ? 'filter-bg' : ''} onClick={changePriority}>High</span>
            </div>
        </section>
        <div className="task-sorting">Sort:
            <span onClick={showDateSort}>
                Due date <IoIosArrowDown/>
                {openDate && <ul className="form-dropdown">
                    <li onClick={() => setSortType("dueDate-asc")}>Ascending</li>
                    <li onClick={() => setSortType("dueDate-desc")}>Descending</li>
                </ul>}
            </span>
            <span onClick={showPrioritySort}>
                Priority <IoIosArrowDown/>
                {openPriority && <ul className="form-dropdown">
                    <li onClick={() => setSortType("priority-asc")}>Ascending</li>
                    <li onClick={() => setSortType("priority-desc")}>Descending</li>
                </ul>}
            </span>
        </div>
        {loading ? <div>Loading...</div> : sortedTodos.length > 0 ? sortedTodos.map((todo)=> <TaskItem key={todo.id} todo={todo} setOpenForm={setOpenForm} deleteTask={deleteTask} setSelectedToDo={setSelectedToDo} />) : error ? <div>{error}</div>: <div>No task(s) to display</div>}
        {openForm && <div className="update-form"><UpdateTask todos={openForm} onClose={closeForm}/></div>}
        {selectedTodo && <TaskDetail todos={selectedTodo} onClose={closeTodoDetail}/>}
    </div>
  )
}

export default TaskList