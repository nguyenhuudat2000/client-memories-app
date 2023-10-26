import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import './Form.css'
import { createPost, updatePost } from '../../actions/posts'
import CloseIcon from '@mui/icons-material/Close';

function Form({ currentId, setCurrentId, setOpen }) {
  const [postData, setPostData] = useState({ title: '', message: '', tag: '', selectedFile: '' });
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((message) => message._id === currentId) : null);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post]);

  const clear = () => {
    setPostData({ title: '', message: '', tag: '', selectedFile: '' })
  }

  const clearEdit = () => {
    setCurrentId(null)
  }

  const handleSubmit = async (e) => {
    console.log('running')
    e.preventDefault();
    if (!currentId) {
      await dispatch(createPost({ ...postData, name: user?.result.name }));
      clear();
    }
    else {
      await dispatch(updatePost(currentId, { ...postData, likes: post?.likes }));
      clearEdit();
    }
    setOpen(false);
    console.log('done')
  }

  return (
    <>
      <button className='icon-close' onClick={() => {
        setOpen(false);
        currentId ? clearEdit() : clear();
      }}>
        <CloseIcon />
      </button>
      <form id='form' onSubmit={handleSubmit}>
        <h1 id='form-title' style={{ marginBottom: '20px' }}>Creating</h1>
        <div className='input-group'>
          <input
            type='text'
            className='user-input'
            id='title'
            value={postData.title}
            placeholder='Title'
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
        </div>
        <div className='input-group'>
          <input
            type='text'
            className='user-input'
            id='message'
            value={postData.message}
            placeholder='Message'
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />
        </div>
        <div className='input-group'>
          <input
            type='text'
            className='user-input'
            id='tag'
            value={postData.tag}
            placeholder='Tag'
            onChange={(e) => setPostData({ ...postData, tag: e.target.value.split(',') })}
          />
        </div>
        {
          !currentId && (
            <div className='input-image'>
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            </div>
          )
        }
        <div className='button-group'>
          <button className='submit' type='submit'>Submit</button>
        </div>
      </form>
    </>
  )
}

export default Form