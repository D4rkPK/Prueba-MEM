import axios from 'axios';
import endPoints from '@services/api';

const addPerson = async (body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(endPoints.persons.addPersons, body, config);
  return response.data;
};

const deletePerson = async (id) => {
  const response = await axios.delete(endPoints.persons.deletePerson(id));
  return response.data;
};

const updatePerson = async (id, body) => {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.put(endPoints.persons.updatePerson(id), body, config);
  return response.data;
};

export { addPerson, deletePerson, updatePerson };
