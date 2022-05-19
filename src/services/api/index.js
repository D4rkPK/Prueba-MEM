/* const API = process.env.NEXT_PUBLIC_API_URL; */
const API = 'https://servicios.mem.gob.gt';

const endPoints = {
  persons: {
    AllPersons: `${API}/api/api_prueba/prueba/read`,
    addPersons: `${API}/api/api_prueba/prueba/insert`,
    updatePerson: (id) => `${API}/api/api_prueba/prueba/update?id=${id}`,
    deletePerson: (id) => `${API}/api/api_prueba/prueba/delete?id=${id}`,
  },
  departamentos: {
    getDepartamentosList: `${API}/api/api_prueba/prueba/departamento`,
  },
  municipios: {
    getMunicipiosList: `${API}/api/api_prueba/prueba/municipio`,
  },
};

export default endPoints;
