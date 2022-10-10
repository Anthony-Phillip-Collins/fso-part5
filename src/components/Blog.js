import { useState } from 'react';

const Blog = (props) => {
  const [expand, setExpand] = useState(false);
  const { title, author, url, likes, user } = props;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggle = () => setExpand(!expand);

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
          <div>{user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
