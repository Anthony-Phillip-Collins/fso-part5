import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';
import BlogForm from './BlogForm';

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

describe('<Blog />', () => {
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

    const toggleButton = screen.getByRole('button', { name: 'view' });
    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveTextContent('hide');

    const url = screen.getByText('https://thesimpsons.com');
    expect(url).toBeDefined();

    const likes = screen.getByText('likes', { exact: false });
    expect(likes).toBeDefined();
  });

  test('like button is clicked twice and event handler is called twice', () => {
    const onUpdate = jest.fn();

    render(<Blog blog={blog} onDelete={() => {}} onUpdate={onUpdate} />);

    const toggleButton = screen.getByRole('button', { name: 'view' });
    fireEvent.click(toggleButton);

    const likeButton = screen.getByRole('button', { name: 'like' });
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(onUpdate).toBeCalledTimes(2);
  });
});

describe('<BlogForm />', () => {
  test('calls event handler with right details when new blog is created', () => {
    const create = jest.fn();
    render(<BlogForm create={create} />);

    const getInputByLabel = (label) =>
      screen.getByLabelText(label, { selector: 'input' });

    fireEvent.change(getInputByLabel('Title'), {
      target: { value: blog.title },
    });

    fireEvent.change(getInputByLabel('Author'), {
      target: { value: blog.author },
    });

    fireEvent.change(getInputByLabel('URL'), {
      target: { value: blog.url },
    });

    const button = screen.getByRole('button', { type: 'submit' });
    fireEvent.click(button);

    expect(JSON.stringify(create.mock.calls[0][0])).toStrictEqual(
      JSON.stringify({ title: blog.title, author: blog.author, url: blog.url })
    );
  });
});
