import { useState } from "react"
import { IoTrash } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import TaskDetail from "./TaskDetail";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";

export const TaskList = () => {
    const [status, setStatus] = useState('All')
    const [priority, setPriority] = useState('')
    const [openDate, setOpenDate] = useState(false)
    const [openPriority, setOpenPriority] = useState(false)

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
        <div className="task-wrapper">
            <div className="task-part1">
                <h6>Title</h6>
                <p>DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription</p>
                <sub>Due date: </sub>
            </div>
            <div className="task-part2">
                <div>Priority</div>
                <div>Status</div>
                <div>
                    <span><AiOutlineEdit/> Edit</span>
                    <span><IoTrash/> Delete</span>
                </div>
            </div>
        </div>
        <TaskDetail/>
    </div>
  )
}

export default TaskList