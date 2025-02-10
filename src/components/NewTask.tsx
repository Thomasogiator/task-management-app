import { useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io";
import useFetch from "./useFetchTodos";

interface NewTaskProps{
    onClose: ()=> void
}

const NewTask: React.FC<NewTaskProps> = ({onClose}) => {
    const [priority, setPriority] = useState('')
    const [todoStatus, setTodoStatus] = useState('')
    const [openPriority, setOpenPriority] = useState(false)
    const [openStatus, setOpenStatus] = useState(false)
    const [createSuccess, setCreateSuccess] = useState(false)
    const url = 'https://67a9967e6e9548e44fc40ffa.mockapi.io/api/todos'
    const {data: todoData, loading, error, postData} = useFetch(url)
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
    
    const createNewTask = async (e: React.FormEvent) => {
        e.preventDefault()
        await postData(dataToSubmit);
        setCreateSuccess(true)
    };

    useEffect(()=>{
        if(createSuccess){
            onClose()
            setCreateSuccess(false)
        }
    }, [createSuccess])

  return (
    <form onSubmit={createNewTask} className="task-form">
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
            <button type="submit">Done</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </form>
  )
}

export default NewTask