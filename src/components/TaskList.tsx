import { useState } from "react"
import { IoTrash } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import TaskDetail from "./TaskDetail";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import useFetch, { Task } from "./useFetchTodos";

export const TaskList = () => {
    const [status, setStatus] = useState('All')
    const [priority, setPriority] = useState('')
    const [selectedTodo, setSelectedToDo] = useState<Task | null>(null)
    const [openDate, setOpenDate] = useState(false)
    const [openPriority, setOpenPriority] = useState(false)
    const [openModal, setOpenModal] = useState<boolean | number>(false)
    const url = 'https://67a9967e6e9548e44fc40ffa.mockapi.io/api/todos'
    const {data: todoData, loading, error, deleteData} = useFetch(url)
    console.log(todoData)

    const filteredTodos = todoData?.filter((todo)=> status === 'All' ? todo : status === 'To-do' ? todo.status === 'to-do' : status === 'In-progress' ? todo.status === 'in-progress' : status === 'Done' ? todo.status === 'done' : priority === 'Low' ? todo.priority === 'low' : priority === 'Medium' ? todo.priority === 'medium' : priority === 'High' ? todo.priority === 'high' : todo.priority === '')
    const changeStatus=(e:React.MouseEvent<HTMLParagraphElement>)=>{
        setStatus(e.currentTarget.innerText)
    }

    const changePriority=(e:React.MouseEvent<HTMLParagraphElement>)=>{
        setPriority(e.currentTarget.innerText)
    }

    const showDateSort=()=>{
        setOpenDate(prev=>!prev)
    }

    const showPrioritySort=()=>{
        setOpenPriority(prev=>!prev)
    }

    const showTodoDetail=(id: number, todo: Task)=>{
        if(openModal === id){
            return setOpenModal(false)
        }
        setOpenModal(id)
        setSelectedToDo(todo)
    }

    const closeTodoDetail=()=>{
        setSelectedToDo(null)
    }

    const deleteTask = async (e: React.FormEvent, id:number) => {
        e.preventDefault()
        await deleteData(id);
    };

  return (
    <div className="task-main-body">
        <header className="task-search">
            <input type="search" placeholder="search task"/>
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
                    <li>Ascending</li>
                    <li>Descending</li>
                </ul>}
            </span>
            <span onClick={showPrioritySort}>
                Priority <IoIosArrowDown/>
                {openPriority && <ul className="form-dropdown">
                    <li>Ascending</li>
                    <li>Descending</li>
                </ul>}
            </span>
        </div>
        {loading ? <div>Loading...</div> : filteredTodos.length > 0 ? filteredTodos.map((todo)=> <div key={todo.id} className="task-wrapper" onClick={()=>setSelectedToDo(todo)}>
            <div className="task-part1">
                <h6>{todo.title}</h6>
                <p>{todo.description}</p>
                <sub>Due date: {todo.dueDate}</sub>
            </div>
            <div className="task-part2">
                <div>{todo.priority}</div>
                <div>{todo.status}</div>
                <div>
                    <span className="task-controls"><AiOutlineEdit/> Edit</span>
                    <span className="task-controls" onClick={(e)=>deleteTask(e, todo.id)}><IoTrash color="red"/> Delete</span>
                </div>
            </div>
            
        </div>) : error ? <div>{error}</div>: <div>No task(s) to display</div>}
        {selectedTodo && <TaskDetail todos={selectedTodo} onClose={closeTodoDetail}/>}
    </div>
  )
}

export default TaskList