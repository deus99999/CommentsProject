
import './App.css'
import CommentItem from './components/CommentItem'
import { useEffect, useState } from 'react'
import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js';
import lightbox from 'lightbox2';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CommentForm from './components/CommentForm'; 
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8004';

function App() {
  const [comments, setComments] = useState([])
  const [nextPage, setNextPage] = useState(null); 
  const [prevPage, setPrevPage] = useState(null); 
  const [url, setUrl] = useState(`${API_BASE}/api/comments/`);
  const [sortField, setSortField] = useState('-created_at'); 
  console.log(API_BASE)

  const loadComments = () => {
    fetch(`${API_BASE}/api/comments/?ordering=${sortField}`) 
      .then(response => response.json())
      .then(data => {
        setComments(data.results || []); 
        setNextPage(data.next);
        setPrevPage(data.previous);
      })
      .catch(error => console.error('Ошибка:', error))
  }

  useEffect(() => {
    loadComments();
  }, [sortField, url]);


  useEffect(() => {
    lightbox.option({
      'resizeDuration': 1,
      'wrapAround': true,
    })
  }, []);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortField(`-${field}`);
    } else {
      setSortField(field);
    }
  };


  return (
    <BrowserRouter>
      <div className="container">
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px'}}>Комментарии</Link>
          <Link to="/create" style={{ padding: '8px 16px', background: '#007bff', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>
            + Добавить комментарий
          </Link>

        
        </nav> 
        
         <Routes>
          <Route path="/" element={
            <>
             <table border="1" style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th onClick={() => toggleSort('user_name')} style={{ cursor: 'pointer' }}>
                    Имя {sortField.includes('user_name') ? (sortField.startsWith('-') ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => toggleSort('email')} style={{ cursor: 'pointer' }}>
                    E-mail {sortField.includes('email') ? (sortField.startsWith('-') ? '▲' : '▼') : ''}
                  </th>
                  <th onClick={() => toggleSort('created_at')} style={{ cursor: 'pointer' }}>
                    Дата {sortField.includes('created_at') ? (sortField.startsWith('-') ? '▼' : '▲'): ''}
                  </th>
                </tr>
              </thead>
            </table>
      
            <div>
              {comments.map(comment => 
                <CommentItem key={comment.id} comment={comment} onRefresh={loadComments}/>
              )}
            </div>

            <div className="pagination">
                <button 
                  onClick={() => setUrl(prevPage)} 
                  disabled={!prevPage}
                >
                  Назад
                </button>

                <button 
                  onClick={() => setUrl(nextPage)} 
                  disabled={!nextPage}
                >
                  Вперед
                </button>
            </div>
            </> }/>
          <Route path="/create" element={<CommentForm onSuccess={() => window.location.href = '/'} />} />
        </Routes>  
      </div>
    </BrowserRouter>
  )
}

export default App
