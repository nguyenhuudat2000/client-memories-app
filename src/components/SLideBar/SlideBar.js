import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import Form from '../Form/Form'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import './SlideBar.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  boxShadow: 24,
  p: 4,
  padding: '0'
};

const SlideBar = ({ currentId, setCurrentId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: LOGOUT })

    navigate('/auth/login');
  }

  const handleModal = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div className='side-bar'>
        <div className='top-section'>
          <div className='brand-name'>
            <span className='logo'>Memories</span>
            <InstagramIcon />
          </div>
          <div className='link-logo'>
            <a href='/'>
              <HomeOutlinedIcon />
              <span>Home</span>
            </a>
          </div>
          <div className='link-logo'>
            <a href='# '>
              <SearchIcon />
              <span>Search</span>
            </a>
          </div>
          <div className='link-logo'>
            <button className='link-logo button-create' onClick={handleModal}>
              <AddBoxOutlinedIcon />
              <span>Create</span>
            </button>
          </div>
        </div>
        <div className='bottom-section' >
          <button className='link-logo button-logout' onClick={handleLogout}>
            <LogoutOutlinedIcon />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className='bottom-navbar'>
        <div className='bottom-link'>
          <a href='/'>
            <HomeOutlinedIcon />
          </a>
        </div>
        <div className='bottom-link'>
          <a href='# '>
            <SearchIcon />
          </a>
        </div>
        <div className='bottom-link'>
          <button onClick={handleModal} >
            <AddBoxOutlinedIcon />
          </button>
        </div>
        <div className='bottom-link'>
          <button onClick={handleLogout}>
            <LogoutOutlinedIcon />
          </button>
        </div>
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
            setOpen={setOpen}
          />
        </Box>
      </Modal>
    </>
  )
}

export default SlideBar;