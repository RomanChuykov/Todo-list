import { useState,useEffect } from "react";
import List from "./components/List";
import {v4 as uuidv4} from 'uuid'

 function Main() {
    const [tasks,setTasks]=useState(()=>{
        const storedTodos=localStorage.getItem('tasks')
        if (!storedTodos) {
            return []
        }else{
            return JSON.parse(storedTodos)
        }
    }
       
    )
    const [tasksTitle,setTasksTitle]=useState('')
    const date=new Date();
    const monthNames=['january','February','March','Apryl','May','June','July','August','September','October','November','December'];
    const month=monthNames[date.getMonth()];
    const day=date.getDay();
    const year=date.getFullYear();

    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks))
    },[tasks])

    const addTask=(e)=>{
        const storedTodos=JSON.parse(localStorage.getItem('tasks'))
        if (e.key==='Enter' && e.target.value!=='') {
            setTasks([
                ...storedTodos,{
                    id:uuidv4(),
                    title: tasksTitle,
                    status:false
                }
            ]);
            setTasksTitle('');
        }
    }

    return(
        <div className="container">
            <h1>Note your task</h1>
            <span>{month+ ' ' +day+' '+year }</span>
        <div className="input-filed">
            <input type="text" 
            value={tasksTitle}
            onChange={event=>setTasksTitle(event.target.value)}
            onKeyDown={addTask}></input>
             <label htmlFor="">Task name</label>
        </div>
        <List tasks={tasks}/>
        </div>
    );
};

export default Main;