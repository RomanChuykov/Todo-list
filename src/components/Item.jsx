import { useState } from "react"

export default function Item({id,title,status}) {
    const [checked,setCheked]=useState(status);
    const classes=['todo']

    if (checked) {
        classes.push('status')
    }

    const updateStatus=()=>{
        setCheked(!checked);
        const storedTodos=JSON.parse(localStorage.getItem('tasks'));
        storedTodos.map((item)=>{
            if (item.id===id) {
                item.status=!checked;
                
            }
            return true;
        })
        localStorage.setItem('tasks',JSON.stringify(storedTodos))
    }

    const [visible,setVisible]=useState(true)
    const removeElement=()=>{
         setVisible(prev=>!prev)
         const storedTodos= JSON.parse(localStorage.getItem('tasks'));
         let removeTodos= storedTodos.filter(item=>{
            if (item.id!==id) {
                return true
            }
            return false
         });
         localStorage.setItem('tasks',JSON.stringify(removeTodos))
    }
    
    return(
        <>
        {visible &&(
        <li className={classes.join(' ')}>
            <label>
                <input type="checkbox"  
                checked={checked}
                onChange={updateStatus}/>
                <span>{title}</span>
                <i className="materials-icons red-text"
                onClick={removeElement}>X</i>
            </label>
        </li>)}
        </>
    )
};
