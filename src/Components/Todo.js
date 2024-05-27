import React from 'react'
import './Todo.css';
import { useState, useRef, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

function Todo() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0)
    const [message, setMessage] = useState('')
    const inputref = useRef('null');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const addTodo = () => {
        const isDuplicate = todos.some((item)=> item.list === todo )
        console.log("duplicate:",isDuplicate);
        if(isDuplicate){
            setMessage('To do Already in alist')
            return;
        }else{
            if(todo !== ''){
                setTodos([...todos, {list : todo,id : Date.now() , status : false}])
                console.log(todos);
                setTodo('')
            }
            if(editId){
                const editTodo = todos.find((item)=> item.id === editId)
                const updateTodo = todos.map((item)=>item.id === editTodo.id
                ? (item = { id : item.id , list : todo})
                : (item = { id : item.id , list : item.list}))
                setTodos(updateTodo);
                setEditId(0)                   
                setTodo(' ')
            }
        }
      

        
        
    }
    useEffect(() => {
        inputref.current.focus();
    })
 
    const onDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id)
    )}

    const onComplete =(id)=>{
        let complete = todos.map((list)=> {
            if( list.id === id){
                return ({...list , status : !list.status })
            }
            return list
        })
        setTodos(complete)
    }

    const onEdit = (id)=>{
        const editTodo = todos.find((item) => item.id === id)
        setTodo(editTodo.list);
        setEditId(editTodo.id)
    }

    const onHandle = ()=>{
        setTodo('')
        inputref.current.focus();
        setMessage('')
    }

    return (
        <div className='container'>
            <h1>To-Do App</h1>

            < form class="add-todo" onSubmit={handleSubmit}>
                <input type="text" value={todo} ref={inputref} id="todoInput" placeholder="Enter your todo..." onChange={(e) => setTodo(e.target.value)} />
                <button id="addButton" onClick={addTodo}>{editId ? 'Edit' : 'Add'}</button>
            </form>
            <ul id="todoList">
                {
                    todos.map((todo, index) => (
                        <li id ={todo.status ? 'list-item' : ''} key={index}>
                            {todo.list}
                            <span>
                                <IoMdDoneAll title="Complete" onClick = {()=>onComplete(todo.id)}/>
                                <FiEdit title="Edit" onClick={ ()=> onEdit(todo.id)}/>
                                <MdDelete title="Delete" onClick={()=>onDelete(todo.id)} />
                            </span>
                        </li>
                    ))
                }

            </ul> 
            {message && <div><p>{message}</p><button onClick = {onHandle}>ok</button></div>}
        </div>
    )
}

export default Todo
