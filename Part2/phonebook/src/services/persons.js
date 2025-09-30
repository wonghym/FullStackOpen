import axios from "axios";

const url = "http://localhost:3001/persons";

const create = (newPerson) => {
  return axios.post(url, newPerson);
};

const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`);
};

const updatePerson = (id, newPerson) => {
  console.log(id, newPerson);
  return axios.put(`${url}/${id}`, newPerson).then((res) => res.data);
};

export default { create, deletePerson, updatePerson };
