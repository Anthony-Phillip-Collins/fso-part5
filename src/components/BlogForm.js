import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = forwardRef(({ create }, ref) => {
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
    create({ title, author, url });
  };

  useImperativeHandle(ref, () => ({
    clearFields,
  }));

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      data-test="blog-form"
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
});

BlogForm.propTypes = {
  create: PropTypes.func.isRequired,
};

BlogForm.displayName = 'BlogForm';

export default BlogForm;
