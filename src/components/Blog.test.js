import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

let blog;

beforeAll(() => {
  blog = {
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
});

describe('Blog', () => {
  test('initially renders title and author, but not the url or likes', () => {
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

  test('shows url and likes when toggle button is clicked', () => {
    render(<Blog blog={blog} onDelete={() => {}} onUpdate={() => {}} />);

    const button = screen.getByRole('button', { name: 'view' });
    fireEvent.click(button);

    expect(button).toHaveTextContent('hide');

    const url = screen.getByText('https://thesimpsons.com');
    expect(url).toBeDefined();

    const likes = screen.getByText('likes', { exact: false });
    expect(likes).toBeDefined();
  });
});
