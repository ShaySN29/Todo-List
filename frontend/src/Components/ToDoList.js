import React, { useEffect } from "react";
// Import Components
import ToDo from './ToDo';

// Function retrieves the todolist from the database and maps over the list sending individual todos to the todo component
function ToDoList({ toDoList, toggleToDo, getToDoListFromDatabase }) {
      
    useEffect(() => {
        getToDoListFromDatabase();
    }, []);

    return (
        <div>
            {/* Map over the todoList array that was passed down as props to create individual todos. */}
            {toDoList.map(todo => {
                return (
                    // The individual todo passed down as props to the ToDo component.
                    <ToDo key={todo.id} toggleToDo={toggleToDo} todo={todo}/>
                )
            })}
        </div>
    );
};

export default ToDoList;