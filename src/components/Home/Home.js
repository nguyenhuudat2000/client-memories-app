import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

import Navbar from '../Navbar/Navbar';
// import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import SlideBar from '../SLideBar/SlideBar';
import './Home.css'



const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch])

  return (
    <div className='body'>
      <SlideBar currentId={currentId} setCurrentId={setCurrentId} />
      <div className='main-container'>
        <div className='wrapper'>
          <div className='nav-container'>
            <Navbar />
          </div>
          <div className='posts-container'>
            <Posts setCurrentId={setCurrentId} />
          </div>
        </div>
      </div>
      {/* <div className='form'>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div> */}
    </div>
  )
}

export default Home