import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import './Post.css';
import { Modal, Box } from '@mui/material';
import PostModal from '../PostModal/PostModal';

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

const Post = ({ post, setCurrentId }) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <>
      <div className='gallery-item' >
        <button className='post-button' onClick={handleModal}>
          <img src={post.selectedFile} alt='Quynh Anh' className='gallery-image' />

          <div className='gallery-item-info'>
            <ul>
              <li className='gallery-item-likes'>
                <FavoriteIcon sx={{ color: 'white' }} />
                &nbsp;
                <span>{post?.likes.length}</span>
              </li>
              <li className='gallery-item-comments'>
                <ModeCommentIcon sx={{ color: 'white' }} />
                &nbsp;<span>0</span>
              </li>
            </ul>
          </div>
        </button>
      </div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <PostModal post={post} setOpen={setOpen} setCurrentId={setCurrentId} />
        </Box>
      </Modal>
    </>
  )
}

export default Post