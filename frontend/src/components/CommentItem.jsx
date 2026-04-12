import { useEffect, useState } from 'react';
import '../App.css';

// Only one comment
const CommentItem = ({ comment }) => {
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <div className="comment-wrapper">
      <div className="comment-container">
        <div className="comment-header">
          <div className="avatar">
          <img 
              src={defaultAvatar} 
              alt="avatar" 
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover' 
              }} 
            />
          </div>
          <span className="username">
            {comment.user_name}
          </span>
          <span className="date">{new Date(comment.created_at).toLocaleString()}</span>
        </div>
        
        <div className="comment-text">
          {comment.text}
        </div>

        {comment.file && (
          <div className="comment-file">
            <a 
             href={comment.file}
             data-lightbox="image-1" 
             data-title="My File"
             target="_blank" rel="noreferrer">File</a>
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