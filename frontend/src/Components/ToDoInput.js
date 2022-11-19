import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap'; 

function ToDoInput ({ addTask }) {

    const [ newTask, setNewTask ] = useState('');

    //  Function handles the local state’s changes. Every time a user types in the input box, the state will change to reflect the most recent input.
    const handleChange = (e) => {
        setNewTask(e.currentTarget.value)
    };
    
    /* Add tasks to todolist array
        e.preventDefault() in forms prevents the default action from taking place. 
        Prevents the reloading of the page and everything changed will go back to how it initially rendered.
        userInput set back to an empty string after the addTask function has run. This will set the form back to an empty input.
    */
    const handleAddTaskButtonClick = () => {
        addTask(newTask);
        setNewTask(" "); // Sets form back to empty after addTask function has run.
    };

    return (
        <div className="addTaskFormDiv">
            <Form>
                <Form.Group className="mb-3" controlId="formAddTask">
                    <Form.Control
                        type="text"
                        placeholder="What do you need to do?"
                        onChange={handleChange}
                        value={newTask}
                    />
                </Form.Group>
                <Button variant="outline-dark" onClick={handleAddTaskButtonClick}>Add Task</Button>
            </Form>
        </div>    
    );
};  

export default ToDoInput;
