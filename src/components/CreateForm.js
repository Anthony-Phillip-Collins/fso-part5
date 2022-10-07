import { useState } from 'react';
import blogService from '../services/blogs';

const CreateForm = ({ onSuccess, onFail }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await blogService.create({ title, author, url });
      onSuccess(data);
    } catch (error) {
      onFail(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <label>
          Title
          <input
            type='text'
            name='title'
            value={title}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </label>
        <label>
          Author
          <input
            type='text'
            name='author'
            value={author}
            onChange={({ target: { value } }) => setAuthor(value)}
          />
        </label>
        <label>
          URL
          <input
            type='text'
            name='url'
            value={url}
            onChange={({ target: { value } }) => setUrl(value)}
          />
        </label>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default CreateForm;
