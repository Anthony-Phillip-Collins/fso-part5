import { useState } from 'react';
import PropTypes from 'prop-types';

function Blog(props) {
  const [expand, setExpand] = useState(false);
  const { blog, loggedInUser, onUpdate, onDelete } = props;
  const { title, author, url, likes, id, user } = blog;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggle = () => setExpand(!expand);

  const onLikeClick = async () => {
    onUpdate({
      author,
      title,
      url,
      likes: likes + 1,
      id,
    });
  };

  const remove = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog "${title}" by ${author}?`)) {
      onDelete(id);
    }
  };

  const ownedByUser = user.username === (loggedInUser || {}).username;

  return (
    <div style={blogStyle}>
      <div>
        {title} <b>{author}</b>{' '}
        <button type="button" onClick={toggle}>
          {expand ? 'hide' : 'view'}
        </button>
      </div>

      {expand && (
        <>
          <div>{url}</div>
          <div>likes {likes}</div>
          <button type="button" onClick={onLikeClick}>
            like
          </button>
          <div>{user.name}</div>
          {ownedByUser && (
            <button type="button" onClick={remove}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
}

const LoggedInUserSchema = PropTypes.shape({
  name: PropTypes.string,
  username: PropTypes.string,
  id: PropTypes.string,
});

const BlogUserSchema = PropTypes.shape({
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});

const BlogSchema = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  user: BlogUserSchema.isRequired,
});

Blog.defaultProps = {
  loggedInUser: null,
};

Blog.propTypes = {
  blog: BlogSchema.isRequired,
  loggedInUser: LoggedInUserSchema,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
