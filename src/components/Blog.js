import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = (props) => {
  const [expand, setExpand] = useState(false);
  const { title, author, url, likes, user, id, onUpdateSuccess, onUpdateFail } =
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
    </div>
  );
};

export default Blog;
