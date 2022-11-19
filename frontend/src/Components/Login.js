import React from 'react';
import {Form, Button} from 'react-bootstrap'; 

// The component below displays the login form
function Login( {handleUserNameChange, handlePasswordChange, handleCreateUserButtonClick, handleLoginButtonClick} ) {


    return (
        <div>
            <h5> Enter Your Login Details</h5>
            <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Your Username"
                        onChange={handleUserNameChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
      
                <Button
                    variant="outline-dark"
                    className='me-3'
                    onClick={handleLoginButtonClick}>
                    Login
                </Button>
                <Button
                    variant="outline-dark"
                    onClick={handleCreateUserButtonClick}>
                    Create New User
                </Button>
            </Form>
        </div>
    );
};

export default Login;