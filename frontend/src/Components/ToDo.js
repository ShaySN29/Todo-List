import React from "react";
import {InputGroup, Form} from 'react-bootstrap';


// Function displays the task from each of the todo objects.
function ToDo ({todo, toggleToDo}) {

    // toggleToDo function to the item with the ID of the specific class
    function handleToDoClick() {
        toggleToDo(todo.id);
    };

    return (
        <div>
            <label>
                <InputGroup className="mb-3">
                    <InputGroup.Checkbox checked={todo.complete} onChange={handleToDoClick} />
                    <Form.Control type="text" defaultValue={todo.task}/>
                </InputGroup>
            </label>
        </div>
    );
};


export default ToDo;