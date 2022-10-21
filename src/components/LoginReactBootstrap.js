import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const LoginReactBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleLogin = (event) =>{
        event.preventDefault();
        setSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setSuccess(true);
        })
        .catch(error => {
            console.error('error: ', error);
        })
    }

    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }

    const handleForgotPassword = () => {
        if(!userEmail){
            alert('Please enter your Email address!')
        }
        sendPasswordResetEmail(auth, userEmail)
        .then(() => {
            alert('Password reset email has been sent. Please check your email.')
        })
        .catch( error => {
            console.error('error: ', error);
        })
    }

    return (
        <div className='container'>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className='col-md-4 shadow border rounded p-5'>
                    <Form onSubmit={handleLogin}>
                        <h3>Please Login!!</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onBlur={handleEmailBlur} type="email" name='email' placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder="Password" required />
                        </Form.Group>
                        {success && <p className='text-success'>Successfully login to the account.</p>}
                        <Button variant="primary w-100" type="submit">
                            Login
                        </Button>
                    </Form>
                    <Button onClick={handleForgotPassword} variant="light w-100 mt-2" type="submit">Forgot Password?</Button>
                    <p className='mt-2'><small>New to this website? Please <Link to='/register'>Register</Link> </small></p>
                </div>
            </div>
        </div>
    );
};

export default LoginReactBootstrap;