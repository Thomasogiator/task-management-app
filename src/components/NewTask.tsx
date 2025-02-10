import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";

interface NewTaskProps{
    onClose: ()=> void
}

const NewTask: React.FC<NewTaskProps> = ({onClose}) => {
    const [priority, setPriority] = useState('')
    const [todoStatus, setTodoStatus] = useState('')
    const [openPriority, setOpenPriority] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)
    const [data, setData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: priority,
        status: todoStatus
    })

    const priorities = ['low', 'medium', 'high']
    const todoStatuses = ['to-do', 'in-progress', 'done']

    const handleDataChange=(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{
        const {name, value} = e.target
        setData((prev)=> ({...prev, [name]: value}))
    }

    const togglePriority =()=>{
        setOpenPriority(prev=>!prev)
    }

    const toggleStatus =()=>{
        setOpenStatus(prev=>!prev)
    }

    const selectPriority=(priority: string)=>{
        setPriority(priority)
        setOpenPriority(false)
    }

    const selectStatus=(status: string)=>{
        setTodoStatus(status)
        setOpenStatus(false)
    }

    const dataToSubmit = {...data, priority: priority, status: todoStatus}
    console.log(dataToSubmit)
  return (
    <form className="task-form">
        <section className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={data.title} placeholder='Enter task name' onChange={handleDataChange}/>
        </section>
        <section className="input-field">
            <label htmlFor="description">Description</label>
            <textarea name="description" value={data.description} rows={6} placeholder='Enter task description' onChange={handleDataChange}/>
        </section>
        <section className="input-field">
            <label htmlFor="dueDate">Due date</label>
            <input type="date" name="dueDate" value={data.dueDate} onChange={handleDataChange}/>
        </section>
        <section className="input-field">
            <label htmlFor="priority">Priority</label>
            <input onClick={togglePriority} readOnly type="text" name="priority" value={priority} placeholder='Select priority level'/>
            <span onClick={togglePriority}><IoIosArrowDown/></span>
            {openPriority && <ul className="form-dropdown">
                {priorities.length > 0 ? priorities.map((priority, index)=> <li onClick={()=>selectPriority(priority)} key={index}>{priority}</li>) : 'No priorities to display'}
            </ul>}
        </section>
        <section className="input-field">
            <label htmlFor="status">Status</label>
            <input onClick={toggleStatus} readOnly type="text" name="status" value={todoStatus} placeholder='Select status'/>
            <span onClick={toggleStatus}><IoIosArrowDown/></span>
            {openStatus && <ul className="form-dropdown">
                {todoStatuses.length > 0 ? todoStatuses.map((status, index)=> <li onClick={()=>selectStatus(status)} key={index}>{status}</li>) : 'No status to display'}
            </ul>}
        </section>
        <div className="form-controls">
            <button>Done</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </form>
  )
}

export default NewTask