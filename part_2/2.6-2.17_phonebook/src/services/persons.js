import axios from "axios";
const url = "http://localhost:3000/persons";

const getAll = () => {
  return axios.get(url);
};

const getByName = async (name) => {
  const response = await axios.get(url);
  return response.data.filter((item) => item.name === name);
};

const create = (newPerson) => {
  return axios.post(url, newPerson);
};

const update = (id, newPerson) => {
  return axios.put(`${url}/${id}`, newPerson);
};

const destroy = (id) => {
  return axios.delete(`${url}/${id}`);
};

export default {
  getAll,
  getByName,
  create,
  update,
  destroy,
};
