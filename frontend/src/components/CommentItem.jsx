import { useEffect, useState } from 'react';
import '../App.css';

// Only one comment
const CommentItem = ({ comment }) => {
  return (
    <div className="comment-wrapper">
      <div className="comment-container">
        <div className="comment-header">
          <div className="avatar"></div>
          <span className="username">{comment.user_name}</span>
          <span className="date">{new Date(comment.created_at).toLocaleString()}</span>
        </div>
        
        <div className="comment-text">
          {comment.text}
        </div>

        {comment.file && (
          <div className="comment-file">
            <a href={comment.file} target="_blank" rel="noreferrer">📎 Файл</a>
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-container">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;