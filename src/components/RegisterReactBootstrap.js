import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = (event) => {
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        // validate password
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Provide at least two uppercase letters.');
            return;
        }
        if(password.length < 6){
            setPasswordError('Password should be atleast 6 characters.');
            return;
        }
        if(!/(?=.*[!@#$&*])/.test(password)){
            setPasswordError('Please add at least one special character.');
            return;
        }
        setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
        .then( result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
            form.reset();
            verifyEmail();
            updateUserName(name);
        })
        .catch(error => {
            console.error('error: ', error);
            setPasswordError(error.message);
        })
    }

    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
        .then(() => {
            alert('Please check your email and verify it.');
        })
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        .then(() => {
            console.log('display name updated.')
        })
        .catch(error => console.error(error));
    }

    return (
        <div className='container'>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className='col-md-4 shadow border rounded p-5'>
                    <Form onSubmit={handleRegister}>
                        <h3>Register here!</h3>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" name='name' placeholder="Enter Name" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder="Password" required />
                        </Form.Group>
                        <p className='text-danger'>{passwordError}</p>
                        {success && <p className='text-success'>User Created Successfully.</p>}
                        <Button variant="primary w-100" type="submit">
                            Register
                        </Button>
                    </Form>
                    <p className='mt-2'><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterReactBootstrap;