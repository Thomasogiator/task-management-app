import { useState } from "react"
import { Task } from "./useFetchTodos"
import { IoIosArrowDown } from "react-icons/io";

interface TaskDetailProps{
    onClose: ()=> void,
    todos: Task | null
}

const TaskDetail: React.FC<TaskDetailProps> = ({onClose, todos}) => {
    const [priority, setPriority] = useState('')
    const [todoStatus, setTodoStatus] = useState('')
    const [openPriority, setOpenPriority] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)

    const priorities = ['low', 'medium', 'high']
    const todoStatuses = ['to-do', 'in-progress', 'done']
    
    const togglePriority =()=>{
        setOpenPriority(prev=>!prev)
    }

    const toggleStatus =()=>{
        setOpenStatus(prev=>!prev)
    }

    const selectPriority=(priority: string)=>{
        setPriority(priority)
    }

    const selectStatus=(status: string)=>{
        setTodoStatus(status)
    }

  return (
    <>
        <div onClick={(e)=>{e.stopPropagation(); onClose()}} className="overlay"></div>
        <div className="task-detail-wrapper">
            <h6><b>Name</b>: {todos?.title}</h6>
            <p><b>Description</b>: {todos?.description}</p>
            <sub><b>Due date:</b> {todos?.dueDate}</sub>
            <div>
                <b>Priority</b>: {todos?.priority || priority} <IoIosArrowDown onClick={togglePriority}/>
                {openPriority && <ul className="form-dropdown">
                    {priorities.length > 0 ? priorities.map((priority, index)=> <li onClick={()=>selectPriority(priority)} key={index}>{priority}</li>) : 'No priorities to display'}
                </ul>}
            </div>
            <div>
                <b>Status</b>: {todos?.status || todoStatus} <IoIosArrowDown onClick={toggleStatus}/>
                {openStatus && <ul className="form-dropdown">
                {todoStatuses.length > 0 ? todoStatuses.map((status, index)=> <li onClick={()=>selectStatus(status)} key={index}>{status}</li>) : 'No status to display'}
            </ul>}
            </div>
        </div>
    </>
  )
}

export default TaskDetail