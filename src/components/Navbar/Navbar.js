import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { LOGOUT } from '../../constants/actionTypes';
import imageUser from '../../image/user-2.jpg';
import decode from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {

    dispatch({ type: LOGOUT })

    navigate('/auth/login');

    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout()
      };
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <>
      <div className='profile'>
        <div className='profile-image'>
          <img
            src={user?.result.imageUrl ? user.result.imageUrl : imageUser}
            alt='avatar-user'
            style={{ borderRadius: '50%', border: '1px solid black' }}
          />
        </div>
        <div className='profile-information'>
          <div className='profile-user-settings'>
            <h1 className='profile-user-name'>
              {user?.result?.name}
            </h1>
            <button className='btn profile-edit-btn'>
              Edit Profile
            </button>
          </div>
          <div className='profile-stats'>
            <p><span className="profile-stat-count">164</span> posts</p>
          </div>
          <div className='profile-bio'>
            <p>
              <span className="profile-real-name">
                {user?.result?.name}
              </span>
              &nbsp; I love sky
            </p>
          </div>
        </div>
      </div>
    </>

  )
}

export default Navbar;