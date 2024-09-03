import React, { useState } from 'react';
import useStore from '../store/CommentStore';

const Reply = ({ reply, commentId }) => {
  const { deleteReply, editReply ,currentUser,updateReplyScore} = useStore(state => ({
    deleteReply: state.deleteReply,
    editReply: state.editReply,
    currentUser: state.currentUser,
    updateReplyScore: state.updateReplyScore,
  }));

  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);

  const handleEdit = () => {
    editReply(commentId, reply.id, editContent);
    setEditMode(false);
  };

  const handleDelete = () => {
    deleteReply(commentId, reply.id);
  };
  const incrementScore = () => {
    updateReplyScore(commentId, reply.id, reply.score + 1);
  };

  const decrementScore = () => {
    updateReplyScore(commentId, reply.id, reply.score - 1);
  };

  return (
    <div style={{ marginLeft: '20px', marginTop: '10px' }}>
      <img src={reply.user.image.png} alt={reply.user.username} style={{ borderRadius: '50%', marginRight: '10px' }} />
      <h3>{reply.user.username}</h3>
      <div>
        <button onClick={decrementScore}>-</button>
        <span>{reply.score}</span>
        <button onClick={incrementScore}>+</button>
      </div>
      {editMode ? (
        <div>
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <p>{reply.content}</p>
      )}
      {currentUser && reply.user.username === currentUser.username && (
        <div>
          <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel' : 'Edit'}</button>
      <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      
    </div>
  );
};

export default Reply;
