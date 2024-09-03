import {create} from 'zustand';

const useStore = create((set) => ({
  comments: [],
  currentUser: null,

  fetchComments: async () => {
    const response = await fetch('http://localhost:3000/comments');
    const data = await response.json();
    set({ comments: data });
  },

  fetchCurrentUser: async () => {
    const response = await fetch('http://localhost:3000/currentUser');
    const data = await response.json();
    set({ currentUser: data });
  },

  addComment: (newComment) => set((state) => ({
    comments: [...state.comments, newComment],
  })),

  deleteComment: (id) => set((state) => ({
    comments: state.comments.filter(comment => comment.id !== id),
  })),

  editComment: (id, updatedContent) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === id ? { ...comment, content: updatedContent } : comment
    ),
  })),

  addReply: (commentId, newReply) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
    ),
  })),
  updateCommentScore: (commentId, newScore) => set((state) => ({
    comments: state.comments.map((comment) =>
      comment.id === commentId ? { ...comment, score: newScore } : comment
    ),
  })),
  deleteReply: (commentId, replyId) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
        : comment
    ),
  })),

  editReply: (commentId, replyId, updatedContent) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId ? { ...reply, content: updatedContent } : reply
            )
          }
        : comment
    ),
  })),
  updateReplyScore: (commentId, replyId, newScore) => set((state) => ({
    comments: state.comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === replyId ? { ...reply, score: newScore } : reply
            ),
          }
        : comment
    ),
  })),
}));

export default useStore;
