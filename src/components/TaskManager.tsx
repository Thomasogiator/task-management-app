import { useState } from 'react'
import NewTask from './NewTask'
import TaskList from './TaskList'
import { FiPlus } from "react-icons/fi";

const TaskManager = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const openForm=()=>{
        setIsFormOpen(true)
    }

    const closeForm=()=>{
        setIsFormOpen(false)
    }

  return (
    <div className='task-manager-container'>
      <h1>Task Management App</h1>
        {isFormOpen ?
        <NewTask onClose={closeForm}/> :
        <button className='add-task-button' onClick={openForm}>Add Task <FiPlus/></button>}
        <TaskList/>
    </div>
  )
}

export default TaskManager