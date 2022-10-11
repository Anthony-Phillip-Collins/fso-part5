import { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';
import loginService from '../services/login';

function Blog(props) {
  const [expand, setExpand] = useState(false);
  const { blog, onUpdateSuccess, onUpdateFail, onDeleteSuccess, onDeleteFail } =
    props;
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
    try {
      const update = await blogService.update({
        author,
        title,
        url,
        likes: likes + 1,
        id,
      });

      onUpdateSuccess(update);
    } catch (error) {
      onUpdateFail(error);
    }
  };

  const remove = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog "${title}" by ${author}?`)) {
      try {
        await blogService.remove({ id });
        onDeleteSuccess(id);
      } catch (error) {
        onDeleteFail(error);
      }
    }
  };

  const ownedByUser = user.username === (loginService.getUser() || {}).username;

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

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdateSuccess: PropTypes.func.isRequired,
  onUpdateFail: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onDeleteFail: PropTypes.func.isRequired,
};

export default Blog;
