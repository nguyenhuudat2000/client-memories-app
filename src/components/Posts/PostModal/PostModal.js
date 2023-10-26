import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import moment from 'moment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import './PostModal.css'
import { Modal, Box } from '@mui/material';
import Form from '../../Form/Form';

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

const PostModal = ({ post, setOpen, setCurrentId }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  const handleDelete = () => {
    console.log('delete');
    dispatch(deletePost(post._id));
  }

  const handleLike = () => {
    console.log('like');
    dispatch(likePost(post._id));
  }

  const handleClose = () => {
    setOpenEdit(false);
  }

  const Likes = () => {
    if (post?.likes.length) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><FavoriteIcon sx={{ color: '#FA383E' }} />&nbsp;{post?.likes.length}&nbsp;like</>
        ) : (
          <><FavoriteBorderIcon sx={{ color: '#FA383E' }} />&nbsp;{post?.likes.length}&nbsp;like</>
        )
    }
    return <><FavoriteBorderIcon sx={{ color: '#FA383E' }} />&nbsp;Like</>;
  }

  return (
    <div className='post-container'>
      <div className='image-post'>
        <img src={post.selectedFile} alt='post' />
      </div>
      <div className='overload'>
        <p>{post.name}</p>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>
      {
        (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)
        && (
          <button
            className=' button-icon-post button-icon-edit'
            onClick={() => {
              setOpenEdit(true);
            }}>
            <EditNoteRoundedIcon sx={{ fontSize: '35px', color: 'white' }} />
          </button>
        )
      }
      <div className='content-post'>
        <h2>{post.title}</h2>
        <p>{post.message}</p>
        <p>{post.tag.map((tag) => `#${tag} `)}</p>
      </div>
      <div className='icon-post'>
        <button className='button-icon-post button-icon-like' onClick={handleLike}>
          <Likes />
        </button>
        {
          (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator)
            ? (
              <>
                <button className='button-icon-post' onClick={handleDelete}>
                  <DeleteIcon sx={{ color: 'rgb(1, 183, 255)' }} />
                </button>

              </>

            ) : (
              <button className='button-icon-post' onClick={() => { alert('you cant delete post') }}>
                <DeleteOutlineIcon sx={{ color: 'rgb(1, 183, 255)' }} />
              </button>
            )
        }
      </div>
      <Modal
        keepMounted
        open={openEdit}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Form
            currentId={post._id}
            setCurrentId={setCurrentId}
            setOpen={setOpenEdit}
          />
        </Box>
      </Modal>
    </div>
  )
}

export default PostModal