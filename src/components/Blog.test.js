import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('Blog', () => {
  test('initially renders title and author, but not the url or likes', async () => {
    const blog = {
      title: 'Springfield News',
      author: 'Homer Simpson',
      url: 'https://thesimpsons.com',
      likes: 0,
      id: '0',
      user: {
        name: 'User 1',
        username: 'User1',
        id: '0',
      },
    };

    render(<Blog blog={blog} onDelete={() => {}} onUpdate={() => {}} />);

    const title = screen.getByText('Springfield News');
    expect(title).toBeDefined();

    const author = screen.getByText('Homer Simpson');
    expect(author).toBeDefined();

    const url = screen.queryByText('https://thesimpsons.com');
    expect(url).toBeNull();

    const likes = screen.queryByText('likes', { exact: false });
    expect(likes).toBeNull();
  });
});
