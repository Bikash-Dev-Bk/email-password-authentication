import React from 'react';

const Register = () => {
    return (
        <div>
            <form onSubmit={handleRegister}>
                <input onChange={handleEmailChange} type="email" name="email" id="" placeholder='Your Email' />
                <br />
                <input type="password" name="password" id="" placeholder='Your Password' />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;