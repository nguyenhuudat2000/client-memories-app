import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import IconGoogle from './Icon'
import { AUTH } from '../../constants/actionTypes'
import { signIn } from '../../actions/auth';
import imageIG from '../../image/rose-login.jpg';

const initialState = { email: '', password: '' }

const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signIn(formData, navigate));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <section className='auth-container'>
      <img src={imageIG} alt='instagram' className='image-IG' />
      <div className='form-div'>
        <form onSubmit={handleSubmit} >
          <h2>𝓢𝓲𝓰𝓷 𝓘𝓷</h2>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
            placeholder='email'
            className='input'
          />
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
            placeholder='password'
            className='input'
          />
          <button className='login-btn'>Sign up</button>
          <div className='line-background'>
            <div className='line'></div>
            <div className='text'>or</div>
            <div className='line'></div>
          </div>
          <GoogleLogin
            clientId='82201753124-s72mmfvkvlktmvcnflbpv3pb9m60cd0a.apps.googleusercontent.com'
            render={(renderProps) => (
              <button
                className='google-login'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <IconGoogle />
                <span>Google Sign In</span>
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
        </form>
        <div className='sign-up'>
          <span>You don't have an account,</span>
          <Link to='/auth/register' replace>
            &nbsp;Sign up
          </Link>
        </div>
      </div>
    </section >
  )
}

export default Auth