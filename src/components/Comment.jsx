import React, { useState } from 'react';
import useStore from '../store/CommentStore';
import Reply from './Reply';
import './comment.css'
const Comment = ({ comment }) => {
  const { deleteComment, editComment, addReply, currentUser,updateCommentScore } = useStore(state => ({
    deleteComment: state.deleteComment,
    editComment: state.editComment,
    addReply: state.addReply,
      currentUser: state.currentUser,
    updateCommentScore: state.updateCommentScore,
  }));

  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState('');
    const [open, setOpen] = useState(false);
  const handleEdit = () => {
    editComment(comment.id, editContent);
    setEditMode(false);
  };

  const handleDelete = () => {
    deleteComment(comment.id);
  };

    const handleReply = () => {
    const newReply = {
      id: Date.now(), // Generate a unique ID for the reply
      content: replyContent,
      createdAt: 'just now',
      replyingTo: comment.user.username,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
      };
    //   setOpen(true);
    addReply(comment.id, newReply);
    setReplyContent('');
  };

  const incrementScore = () => {
    updateCommentScore(comment.id, comment.score + 1);
  };

  const decrementScore = () => {
    updateCommentScore(comment.id, comment.score - 1);
  };
  // Ensure currentUser is available before rendering edit/delete buttons
  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px',backgroundColor:'white',display:'flex',rowGap:'20px',flexDirection:'column' }}>
      <img src={comment.user.image.png} alt={comment.user.username} style={{ borderRadius: '50%', marginRight: '10px' }} />
          <h2>{comment.user.username}</h2>
          <div>
             <div className='d-column'>
        <button onClick={decrementScore}>-</button>
        <span>{comment.score}</span>
        <button onClick={incrementScore}>+</button>
      </div>
        
      </div>
      {editMode ? (
        <div>
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}
      {currentUser && comment.user.username === currentUser.username && (
        <div>
          <button className='blue' onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel' : 'Edit'}</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      <div>
        <textarea value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
        <button onClick={handleReply}>Reply</button>
      </div>
      {/* Render replies */}
      {comment.replies.map(reply => (
        <Reply key={reply.id} reply={reply} commentId={comment.id} />
      ))}
    </div>
  );
};

export default Comment;
