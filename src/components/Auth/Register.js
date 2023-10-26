import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { Link } from 'react-router-dom';
import { signUp } from '../../actions/auth';


const initialState = { firstName: '', lastName: '', email: '', password: '' };

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(formData, navigate));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <section className='auth-container'>
      <div className='form-div form-div-register'>
        <form onSubmit={handleSubmit}>
          <h2>𝓢𝓲𝓰𝓷 𝓤𝓹</h2>
          <input
            type="text"
            id="fname"
            name="firstName"
            onChange={handleChange}
            required
            className='input'
            placeholder='first Name'
          />
          <input
            type="text"
            id="lname"
            name="lastName"
            onChange={handleChange}
            required
            className='input'
            placeholder='Last Name'
          />
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
            className='input'
            placeholder='Email'
          />
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
            className='input'
            placeholder='Password'
          />
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            required
            className='input'
            placeholder='Confirm Password'
          />
          <button
            className='login-btn'
            type='submit'>
            Sign up
          </button>
        </form>
        <div className='sign-up'>
          <span>Already have an account,</span>
          <Link to='/auth/login'>
            &nbsp;Sign in
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Register;