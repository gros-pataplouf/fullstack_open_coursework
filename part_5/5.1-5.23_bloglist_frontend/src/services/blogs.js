import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  const sortedResponse = response.data.toSorted((a,b)=> b.likes - a.likes)
  return sortedResponse;
};


const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const like = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, {author: blog.author, url: blog.url, title: blog.title, likes: blog.likes + 1})
  return response.data
}

export default { getAll, create, setToken, like };
