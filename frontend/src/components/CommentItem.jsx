import { useEffect, useState } from 'react';
import '../App.css';


const CommentItem = ({ comment, onRefresh }) => {
  const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileUrl = comment.file && (comment.file.startsWith('http') 
    ? comment.file 
    : `http://127.0.0.1:8000${comment.file}`);


  console.log(comment)
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
            style={{ textDecoration: 'none', padding: '2px 8px', border: '1px solid #007bff', borderRadius: '4px' }}
          >
            Посмотреть
      </a>
      
          ) : (
            
            <a 
              href={fileUrl} 
              download 
              style={{ padding: '2px 8px', border: '1px solid #ccc', textDecoration: 'none', color: 'blue' }}
            >
              Скачать файл
            </a>
            
          )}
        </div>
      )}

      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies-container">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} onRefresh={onRefresh} />
          ))}
        </div>
      )}

{isModalOpen && (
  <div className="custom-modal-overlay" onClick={() => setIsModalOpen(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      
      <img 
        src={fileUrl} 
        alt="Full view" 
        className="modal-image" 
      />
      
      <div className="modal-footer">
        <button 
          className="modal-close-btn" 
          onClick={() => setIsModalOpen(false)}
        >
          Закрыть
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default CommentItem;