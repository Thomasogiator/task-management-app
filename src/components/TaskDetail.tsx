import { useState } from "react"

const TaskDetail = () => {
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
    <div>
        <div>
            <h6>Title</h6>
            <p>Description</p>
            <sub>Due date: </sub>
        </div>
        <div>
            <div>
                Priority
                {openPriority && <ul>
                    {priorities.length > 0 ? priorities.map((priority, index)=> <li onClick={()=>selectPriority(priority)} key={index}>{priority}</li>) : 'No priorities to display'}
                </ul>}
            </div>
            <div>
                Status
                {openStatus && <ul>
                {todoStatuses.length > 0 ? todoStatuses.map((status, index)=> <li onClick={()=>selectStatus(status)} key={index}>{status}</li>) : 'No status to display'}
            </ul>}
            </div>
        </div>
    </div>
  )
}

export default TaskDetail