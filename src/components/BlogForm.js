import { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

function BlogForm({ onSuccess, onFail }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const clearFields = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await blogService.create({ title, author, url });
      clearFields();
      onSuccess(data);
    } catch (error) {
      onFail(error);
    }
  };

  return (
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
          type="text"
          name="title"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
      </label>
      <label>
        Author
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target: { value } }) => setAuthor(value)}
        />
      </label>
      <label>
        URL
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target: { value } }) => setUrl(value)}
        />
      </label>
      <button type="submit">create</button>
    </form>
  );
}

BlogForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
};

export default BlogForm;
