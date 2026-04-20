import { useEffect, useState } from 'react';
import '../App.css';
import CommentForm from './CommentForm';
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const CommentItem = ({ comment, onRefresh }) => {
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const fileUrl = comment.file && (comment.file.startsWith('http') 
    ? comment.file 
    : `${API_BASE}${comment.file}`);


    const handleSuccess = () => {
      setIsReplying(false); 
      onRefresh(); 
    };

    return (
    <div className="comment-wrapper">
    <div className="comment-container">

      <div className="comment-header">
        <div className="avatar">
          <img src={defaultAvatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        <span className="username">{comment.user_name}</span>
        <span className="date">{new Date(comment.created_at).toLocaleString()}</span>
      </div>
  
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '80%' }}>
          <div 
            className="comment-text" 
            dangerouslySetInnerHTML={{ __html: comment.text }} 
          />
          
          {fileUrl && (
            <div className="comment-actions">
              {fileUrl.toLowerCase().endsWith('.jpg') || 
               fileUrl.toLowerCase().endsWith('.png') || 
               fileUrl.toLowerCase().endsWith('.gif') || 
               fileUrl.toLowerCase().endsWith('.jpeg') ? (
                <a 
                  href={fileUrl} 
                  data-lightbox={`roadtrip-${comment.id}`} 
                  data-title={`От: ${comment.user_name}`}
                  className="view-btn"
                  style={{ textDecoration: 'none', padding: '2px 8px', border: '1px solid #007bff', borderRadius: '4px', display: 'inline-block' }}
                >
                  Посмотреть фото
                </a>
              ) : (
                <a 
                  href={fileUrl} 
                  download 
                  style={{ padding: '2px 8px', border: '1px solid #ccc', textDecoration: 'none', color: 'blue', borderRadius: '4px', display: 'inline-block' }}
                >
                  Посмотреть файл
                </a>
              )}
            </div>
          )}
        </div>

        <button 
          onClick={() => setIsReplying(!isReplying)} 
          className="reply-btn"
          style={{ color: '#007bff', background: 'none', border: '1px solid #007bff', cursor: 'pointer', padding: '4px 12px', borderRadius: '4px' }}
        >
          {isReplying ? 'Отмена' : 'Ответить'}
        </button>
      </div>
  

      {isReplying && (
        <div style={{ marginTop: '15px', borderLeft: '2px solid #007bff', paddingLeft: '15px' }}>
          <CommentForm onSuccess={handleSuccess} parentId={comment.id} />
        </div>
      )}
    </div>
  

    {comment.replies && comment.replies.length > 0 && (
      <div className="replies-container" style={{ marginLeft: '40px', borderLeft: '1px solid #ddd' }}>
        {comment.replies.map(reply => (
          <CommentItem key={reply.id} comment={reply} onRefresh={onRefresh} />
        ))}
      </div>
    )}
  </div>
  );
};

export default CommentItem;