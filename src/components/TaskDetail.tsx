import { useState } from "react"
import useFetch, { Task } from "./useFetchTodos"
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
    const url = 'https://67a9967e6e9548e44fc40ffa.mockapi.io/api/todos'
    const {data, error, updateData} = useFetch(url)
    const priorities = ['low', 'medium', 'high']
    const todoStatuses = ['to-do', 'in-progress', 'done']
    
    const togglePriority =()=>{
        setOpenPriority(prev=>!prev)
    }

    const toggleStatus =()=>{
        setOpenStatus(prev=>!prev)
    }

    const selectPriority=async(priority: string, e: React.FormEvent, id: number)=>{
        setPriority(priority)
        e.preventDefault()
        const dataToSubmit = {priority: priority}
        await updateData(id, dataToSubmit);
        setOpenPriority(false)
    }

    const selectStatus=async(todoStatus: string, e: React.FormEvent, id: number)=>{
        setTodoStatus(todoStatus)
        e.preventDefault()
        const dataToSubmit = {status: todoStatus}
        await updateData(id, dataToSubmit);
        setOpenStatus(false)
    }

  return (
    <>
        <div onClick={(e)=>{e.stopPropagation(); onClose()}} className="overlay"></div>
        <div className="task-detail-wrapper">
            <h6><b>Name</b>: {todos?.title}</h6>
            <p><b>Description</b>: {todos?.description}</p>
            <sub><b>Due date:</b> {todos?.dueDate}</sub>
            <div>
                <b>Priority</b>: {priority.length < 1 ? todos?.priority : priority} <IoIosArrowDown onClick={togglePriority}/>
                {openPriority && <ul className="form-dropdown">
                    {priorities.length > 0 ? priorities.map((priority, index)=> <li onClick={(e)=>selectPriority(priority, e, todos?.id ?? 0)} key={index}>{priority}</li>) : 'No priorities to display'}
                </ul>}
                <div>{error}</div>
            </div>
            <div>
                <b>Status</b>: {todoStatus.length < 1 ? todos?.status : todoStatus} <IoIosArrowDown onClick={toggleStatus}/>
                    {openStatus && <ul className="form-dropdown">
                        {todoStatuses.length > 0 ? todoStatuses.map((todoStatus, index)=> <li onClick={(e)=>selectStatus(todoStatus, e, todos?.id ?? 0)} key={index}>{todoStatus}</li>) : 'No status to display'}
                </ul>}
                <div>{error}</div>
            </div>
        </div>
    </>
  )
}

export default TaskDetail