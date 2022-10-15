import { getAuth,  sendPasswordResetEmail,  signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';


const auth = getAuth(app);

const Login = () => {

    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleLogIn = (event) => {
        event.preventDefault()
        setSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            setSuccess(true);
            form.reset();
            console.log(user);
        })
        .catch( error => {
            console.log('error', error);
        })
    }

    const handleEmailBlur = (event) =>{
        const email = event.target.value;
        setUserEmail(email);
        console.log(email);
    }


    const handleForgetPassword = () => {
        if(!userEmail){
            alert('please enter your email');
            return;
        }

        sendPasswordResetEmail(auth, userEmail)
        .then( ()=>{
            alert('password reset email send, please check your email.')
        })
        .catch( error =>{
            console.error(error);
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please login!!!</h3>
            <Form onSubmit={handleLogIn}>
                <Form.Group onBlur={handleEmailBlur} className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>

                { success && <p className='text-success'><small> Successfully Log in to the account</small></p>}
                
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
            
            <p><small>New to this website? please <Link to='/register'>Register</Link></small></p>
            <p>Forget password? <button onClick={handleForgetPassword} type="button" className="btn btn-link">Reset password</button></p>
        </div>
    );
};

export default Login;