
// import './App.css'
// import CommentItem from './components/CommentItem'
// import { useEffect, useState } from 'react'
// import 'lightbox2/dist/css/lightbox.min.css';
// import 'lightbox2/dist/js/lightbox-plus-jquery.min.js';
// import lightbox from 'lightbox2';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import CommentForm from './components/CommentForm'; 
// const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// function App() {
//   const [comments, setComments] = useState([])
//   const [nextPage, setNextPage] = useState(null); 
//   const [prevPage, setPrevPage] = useState(null); 
//   const [url, setUrl] = useState(`${API_BASE}/api/comments/`);
//   const [sortField, setSortField] = useState('-created_at'); 
//   console.log(API_BASE)

//   const loadComments = () => {
//     fetch(`${API_BASE}/api/comments/?ordering=${sortField}`) 
//       .then(response => response.json())
//       .then(data => {
//         setComments(data.results || []); 
//         setNextPage(data.next);
//         setPrevPage(data.previous);
//       })
//       .catch(error => console.error('Ошибка:', error))
//   }

//   useEffect(() => {
//     loadComments();
//   }, [sortField, url]);


//   useEffect(() => {
//     lightbox.option({
//       'resizeDuration': 1,
//       'wrapAround': true,
//     })
//   }, []);

//   const toggleSort = (field) => {
//     if (sortField === field) {
//       setSortField(`-${field}`);
//     } else {
//       setSortField(field);
//     }
//   };


//   return (
//     <BrowserRouter>
//       <div className="container">
//         <nav style={{ marginBottom: '20px' }}>
//           <Link to="/" style={{ marginRight: '15px'}}>Комментарии</Link>
//           <Link to="/create" style={{ padding: '8px 16px', background: '#007bff', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>
//             + Добавить комментарий
//           </Link>

        
//         </nav> 
        
//          <Routes>
//           <Route path="/" element={
//             <>
//              <table border="1" style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
//               <thead>
//                 <tr>
//                   <th onClick={() => toggleSort('user_name')} style={{ cursor: 'pointer' }}>
//                     Имя {sortField.includes('user_name') ? (sortField.startsWith('-') ? '▲' : '▼') : ''}
//                   </th>
//                   <th onClick={() => toggleSort('email')} style={{ cursor: 'pointer' }}>
//                     E-mail {sortField.includes('email') ? (sortField.startsWith('-') ? '▲' : '▼') : ''}
//                   </th>
//                   <th onClick={() => toggleSort('created_at')} style={{ cursor: 'pointer' }}>
//                     Дата {sortField.includes('created_at') ? (sortField.startsWith('-') ? '▼' : '▲'): ''}
//                   </th>
//                 </tr>
//               </thead>
//             </table>
      
//             <div>
//               {comments.map(comment => 
//                 <CommentItem key={comment.id} comment={comment} onRefresh={loadComments}/>
//               )}
//             </div>

//             <div className="pagination">
//                 <button 
//                   onClick={() => setUrl(prevPage)} 
//                   disabled={!prevPage}
//                 >
//                   Назад
//                 </button>

//                 <button 
//                   onClick={() => setUrl(nextPage)} 
//                   disabled={!nextPage}
//                 >
//                   Вперед
//                 </button>
//             </div>
//             </> }/>
//           <Route path="/create" element={<CommentForm onSuccess={() => window.location.href = '/'} />} />
//         </Routes>  
//       </div>
//     </BrowserRouter>
//   )
// }

// export default App
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Библиотеки для галереи
import 'lightbox2/dist/css/lightbox.min.css';
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js';
import lightbox from 'lightbox2';

// Компоненты
import CommentItem from './components/CommentItem';
import CommentForm from './components/CommentForm';

// Базовый URL API
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function App() {
  const [comments, setComments] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [prevPage, setPrevPage] = useState(false);
  
  // Состояние для управления параметрами запроса
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('-created_at');

  // Функция загрузки данных
  const loadComments = () => {
    const fetchUrl = `${API_BASE}/api/comments/?page=${page}&ordering=${sortField}`;
    
    fetch(fetchUrl)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка сети');
        return response.json();
      })
      .then(data => {
        // DRF возвращает массив в results при включенной пагинации
        setComments(data.results || []);
        setNextPage(!!data.next);
        setPrevPage(!!data.previous);
      })
      .catch(error => console.error('Ошибка загрузки:', error));
  };

  // Следим за изменением страницы или сортировки
  useEffect(() => {
    loadComments();
  }, [page, sortField]);

  // Инициализация Lightbox
  useEffect(() => {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'albumLabel': "Изображение %1 из %2"
    });
  }, []);

  // Переключение сортировки
  const toggleSort = (field) => {
    const newSort = sortField === field ? `-${field}` : field;
    setSortField(newSort);
    setPage(1); // При смене сортировки всегда возвращаемся на начало
  };

  // Хелпер для отображения стрелочек в шапке таблицы
  const getSortIcon = (field) => {
    if (!sortField.includes(field)) return '';
    return sortField.startsWith('-') ? ' ▼' : ' ▲';
  };

  return (
    <BrowserRouter>
      <div className="container" style={{ padding: '20px' }}>
        
        {/* Навигация */}
        <nav style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
            💬 CommentsProject
          </Link>
          <Link to="/create" style={{ 
            padding: '10px 20px', 
            background: '#007bff', 
            color: '#fff', 
            borderRadius: '5px', 
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            + Добавить комментарий
          </Link>
        </nav>

        <Routes>
          {/* Главная страница со списком и пагинацией */}
          <Route path="/" element={
            <>
              <table border="1" style={{ width: '100%', textAlign: 'left', marginBottom: '10px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f4f4f4' }}>
                    <th onClick={() => toggleSort('user_name')} style={{ cursor: 'pointer', padding: '12px' }}>
                      Имя {getSortIcon('user_name')}
                    </th>
                    <th onClick={() => toggleSort('email')} style={{ cursor: 'pointer', padding: '12px' }}>
                      E-mail {getSortIcon('email')}
                    </th>
                    <th onClick={() => toggleSort('created_at')} style={{ cursor: 'pointer', padding: '12px' }}>
                      Дата {getSortIcon('created_at')}
                    </th>
                  </tr>
                </thead>
              </table>

              <div className="comments-list">
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <CommentItem 
                      key={comment.id} 
                      comment={comment} 
                      onRefresh={loadComments}
                    />
                  ))
                ) : (
                  <p style={{ textAlign: 'center', padding: '40px' }}>Комментариев пока нет...</p>
                )}
              </div>

              {/* Блок пагинации */}
              <div className="pagination" style={{ 
                marginTop: '30px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '15px' 
              }}>
                <button 
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))} 
                  disabled={!prevPage}
                  style={{ padding: '8px 16px', cursor: prevPage ? 'pointer' : 'not-allowed' }}
                >
                  ← Назад
                </button>

                <span style={{ fontWeight: 'bold' }}>Страница {page}</span>

                <button 
                  onClick={() => setPage(prev => prev + 1)} 
                  disabled={!nextPage}
                  style={{ padding: '8px 16px', cursor: nextPage ? 'pointer' : 'not-allowed' }}
                >
                  Вперед →
                </button>
              </div>
            </>
          } />

          {/* Страница создания комментария */}
          <Route path="/create" element={
            <CommentForm onSuccess={() => window.location.href = '/'} />
          } />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;