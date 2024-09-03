import React, { useEffect } from 'react';
import useStore from './store/CommentStore';
import Comment from './components/Comment';
import './App.css'
import { useState } from 'react';
const App = () => {
  const { fetchComments, fetchCurrentUser, comments, currentUser, addComment } = useStore(state => ({
    fetchComments: state.fetchComments,
    fetchCurrentUser: state.fetchCurrentUser,
    comments: state.comments,
    currentUser: state.currentUser,
    addComment: state.addComment,
  }));

  const [newCommentContent, setNewCommentContent] = useState('');

  useEffect(() => {
    fetchComments();
    fetchCurrentUser();
  }, [fetchComments, fetchCurrentUser]);

  const handleAddComment = () => {
    const newComment = {
      id: Date.now(), // Generate a unique ID for the comment
      content: newCommentContent,
      createdAt: 'just now',
      score: 0,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
      replies: [],
    };
    addComment(newComment);
    setNewCommentContent('');
  };

  return (
    <div className='main'>
      <div className='wrapperApp'>
        <header>
        <h1>Comments</h1>
      </header>

      <main>
        {/* New Comment Form */}
        <div>
          <textarea
            placeholder="Add a comment..."
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          <button onClick={handleAddComment}>Post Comment</button>
        </div>

        {/* Render Comments */}
        {comments.length > 0 ? (
          comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p>Loading comments...</p>
        )}
      </main>
      </div>
      
    </div>
  );
};

export default App;
