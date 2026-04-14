import { useEffect, useState } from 'react'
import '../Form.css'; 

const CommentForm = ({ parentId = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    homepage: '',
    text: '',
    captcha_input: '',
    file: null
  });
  const [preview, setPreview] = useState(false);
  const [captchaData, setCaptchaData] = useState({ key: '', url: '' });


  const fetchCaptcha = () => {
    fetch('http://127.0.0.1:8000/api/get-captcha/')
      .then(res => res.json())
      .then(data => setCaptchaData({ key: data.hashkey, url: data.image_url }));
  };


  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleNameChange = (e) => {
    setFormData({ ...formData, user_name: e.target.value });
  };
  
  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };
  
  const handleHomepageChange = (e) => {
    setFormData({ ...formData, homepage: e.target.value });
  };
  
  const handleTextChange = (e) => {
    setFormData({ ...formData, text: e.target.value });
  };

  const handleCaptchaChange = (e) => {
    setFormData({ ...formData, captcha_input: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const insertTag = (tag) => {
    const textarea = document.getElementById('comment-text');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    const selected = text.substring(start, end);

    let newText = "";
    if (tag === 'a') newText = `${before}<a href="" title="">${selected}</a>${after}`;
    else newText = `${before}<${tag}>${selected}</${tag}>${after}`;

    setFormData({ ...formData, text: newText });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('captcha_0', captchaData.key); 
    data.append('captcha_1', formData.captcha_input);

    Object.keys(formData).forEach(key => {
      if (formData[key]) data.append(key, formData[key]);
    });
    if (parentId) data.append('parent', parentId);

    fetch('http://127.0.0.1:8000/api/comments/', {
      method: 'POST',
      body: data,
    }).then(res => {
      if (res.ok) {
        alert("Опубликовано!");
        onSuccess();
      } else {
        alert("Ошибка валидации на сервере");
      }
    });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h3>Новое сообщение</h3>

        <div className="toolbar">
          {['i', 'strong', 'code', 'a'].map(tag => (
            <button key={tag} type="button" onClick={() => insertTag(tag)}>
              [{tag}]
            </button>
          ))}
          <button type="button" className="preview-btn" onClick={() => setPreview(!preview)}>
            {preview ? 'Правка' : 'Предпросмотр'}
          </button>
        </div>

        {preview ? (
          <div className="preview-box">
            <p><strong>{formData.user_name || 'Имя не указано'}</strong></p>
            <div dangerouslySetInnerHTML={{ __html: formData.text || '<i>Текст отсутствует...</i>' }} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="comment-form">
            <input 
              name="user_name" className="form-input" placeholder="User Name (латиница/цифры)*" 
              required pattern="[a-zA-Z0-9]+" onChange={handleNameChange} value={formData.user_name} 
            />
            <input 
              name="email" type="email" className="form-input" placeholder="E-mail*" 
              required onChange={handleEmailChange} value={formData.email} 
            />
            <input 
              name="homepage" type="url" className="form-input" placeholder="Home Page (URL)" 
              onChange={handleHomepageChange} value={formData.homepage} 
            />

            <div className="captcha-block" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <img src={captchaData.url} alt="captcha" onClick={fetchCaptcha} style={{ cursor: 'pointer' }} title="Нажми, чтобы обновить" />
            <input 
                name="captcha_input" 
                placeholder="Код с картинки*" 
                required 
                className="form-input"
                value={formData.captcha_input}
                onChange={handleCaptchaChange}
            />
            </div>

            <textarea 
              id="comment-text" name="text" className="form-textarea" placeholder="Ваш текст (HTML разрешен)*" 
              required onChange={handleTextChange} value={formData.text} 
            />
            <div className="file-input-container">
              <label>Прикрепить файл (JPG, PNG, GIF, TXT):</label>
              <input type="file" name="file" accept=".jpg,.png,.gif,.txt" onChange={handleFileChange} />
            </div>
            <button type="submit" className="submit-btn">Отправить комментарий</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentForm;