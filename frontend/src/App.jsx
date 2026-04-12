import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import CommentItem from './components/CommentItem'
import { useEffect, useState } from 'react'

function App() {
  const [comments, setComments] = useState([])
  const [nextPage, setNextPage] = useState(null); 
  const [prevPage, setPrevPage] = useState(null); 
  const [url, setUrl] = useState('http://127.0.0.1:8000/api/comments/');
  const [sortField, setSortField] = useState('-created_at'); 

  const loadComments = () => {
    fetch(`http://127.0.0.1:8000/api/comments/?ordering=${sortField}`) 
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

  return (
    <div>
    
    <div>
      {/* <h1>Комментарии</h1> */}
      
      <table border="1" style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th onClick={() => setSortField('user_name')} style={{ cursor: 'pointer' }}>
              Имя {sortField === 'user_name' ? '▲' : '▼'}
            </th>
            <th onClick={() => setSortField('email')} style={{ cursor: 'pointer' }}>
              E-mail {sortField === 'email' ? '▲' : '▼'}
            </th>
            <th onClick={() => setSortField('-created_at')} style={{ cursor: 'pointer' }}>
              Дата {sortField === '-created_at' ? '▲' : '▼'}
            </th>
          </tr>
        </thead>
      </table>
      
      <div>
        {comments.map(comment => 
          <CommentItem key={comment.id} comment={comment} />
        )}
      </div>
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
      </div>
  )
}

export default App
