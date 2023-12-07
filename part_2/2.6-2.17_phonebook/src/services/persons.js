import axios from "axios";
const url = "http://localhost:3000/persons";

const getAll = () => {
  return axios.get(url);
};

const getByName = (name) => {
  return axios.get(url).then((response) => {
    return response.data.filter((item) => item.name === name);
  });
};

const create = (newPerson) => {
  return axios.post(url, newPerson);
};

const update = (id, newPerson) => {
  console.log(id, newPerson);
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
