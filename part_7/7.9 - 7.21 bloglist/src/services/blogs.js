import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const sortedResponse = response.data.toSorted((a, b) => b.likes - a.likes);
  return sortedResponse;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (blog) => {
  console.log("token while creating", token);
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const like = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {
    author: blog.author,
    url: blog.url,
    title: blog.title,
    likes: blog.likes + 1,
  });
  return response.data;
};

const comment = async (comment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comment`, {
    text: comment,
  });
  return response.data;
};

const remove = async (blog) => {
  console.log("blog to be removed", blog);
  const response = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(("remove response", response));

  return response.data;
};

export default { getAll, getOne, create, setToken, like, remove, comment };
