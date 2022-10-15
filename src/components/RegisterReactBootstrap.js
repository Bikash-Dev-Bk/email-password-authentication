import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {createUserWithEmailAndPassword, sendEmailVerification, getAuth, updateProfile} from 'firebase/auth'
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const RegisterReactBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState('')

    const handleRegisterWithReact = (event) => {
        setSuccess(false);
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const name = form.name.value;
        const password = form.password.value;
        console.log(email, password);

        // validate password
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Please provide at least two uppercase');
            return;
        }
        if (password.length < 6) {
            setPasswordError('Please should be at least 6 characters.');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setPasswordError('Please add at least one special character');
            return
        }
        setPasswordError('');

        createUserWithEmailAndPassword(auth, email, password)
        .then( result => {
            const user = result.user;
            setSuccess(true);
            form.reset();
            verifyEmail();
            updateUserName(name);
            console.log(user);
        })
        .catch( error => {
            console.error('error', error);
            setPasswordError(error.message);
        })

        const verifyEmail = () => {
            sendEmailVerification(auth.currentUser)
            .then( ()=>{
                alert('Please check your email and verify your email')
            })
        }

        const updateUserName = (name) => {
            updateProfile(auth.currentUser, {
                displayName: name
            })
            .then( ()=>{
                console.log('display name updated')
            })
            .catch( error => console.log(error))
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary'>Please Register!!!</h3>
            <Form onSubmit={handleRegisterWithReact}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                {success && <p className='text-success'>User Created Successfully</p>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p><small>Already have an account? please <Link to='/login'>Log In</Link></small></p>
            
        </div>
    );
};

export default RegisterReactBootstrap;