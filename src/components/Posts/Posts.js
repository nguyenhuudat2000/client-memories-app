import React from 'react'
import Post from './Post/Post'
import { CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import './Posts.css'

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  return (
    !posts.length ? <CircularProgress /> : (
      <>
        {posts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </>
    )
  )
}

export default Posts