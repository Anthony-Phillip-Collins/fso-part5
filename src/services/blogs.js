import axios from 'axios';
import loginService from './login';

const baseUrl = '/api/blogs';

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${loginService.getUser().token}`,
  },
});

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (blog) => {
  const { data } = await axios.post(baseUrl, blog, authConfig());
  return data;
};

const update = async (blog) => {
  const { data } = await axios.put(`${baseUrl}/${blog.id}`, blog, authConfig());
  return data;
};

const remove = async (blog) => {
  const { data } = await axios.delete(`${baseUrl}/${blog.id}`, authConfig());
  return data;
};

const blogService = { getAll, create, update, remove };

export default blogService;
