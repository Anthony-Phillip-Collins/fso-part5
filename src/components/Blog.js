import { useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';

const Blog = (props) => {
  const [expand, setExpand] = useState(true);
  const { title, author, url, likes, id, user } = props;
  const { onUpdateSuccess, onUpdateFail, onDeleteSuccess, onDeleteFail } =
    props;

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
      const blog = await blogService.update({
        author,
        title,
        url,
        likes: likes + 1,
        id,
      });

      onUpdateSuccess(blog);
    } catch (error) {
      onUpdateFail(error);
    }
  };

  const remove = async () => {
    if (window.confirm(`Remove blog "${title}" by ${author}?`)) {
      try {
        await blogService.remove({ id });
        onDeleteSuccess(id);
      } catch (error) {
        onDeleteFail(error);
      }
    }
  };

  const ownedByUser = user.username === loginService.getUser()?.username;

  return (
    <div style={blogStyle}>
      <div>
        {title} <b>{author}</b>
        <button onClick={toggle}>{expand ? 'hide' : 'view'}</button>
      </div>

      {expand && (
        <>
          <div>{url}</div>
          <div>likes {likes}</div>
          <button onClick={onLikeClick}>like</button>
          <div>{user.name}</div>
        </>
      )}
      {ownedByUser && <button onClick={remove}>remove</button>}
    </div>
  );
};

export default Blog;
