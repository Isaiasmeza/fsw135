import React, { useContext } from 'react'
import TodoList from './TodoList.js'
import  TodoForm from './TodoForm.js'
import { UserContext } from '../Context/UserContext.js'

export default function Profile(){
    const{
        user: {
            username
        },
        addTodo,
        todos
    } = useContext(UserContext)
    return (
        <div className="profile">
          <h1>Welcome @{username}!</h1>
          <h3>Add Todo here</h3>
          <TodoForm addTodo={addTodo}/>
          <h3>Your issues</h3>
          <TodoList Todos={todos}/>
        </div>
      )
}
