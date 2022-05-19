/* const API = process.env.NEXT_PUBLIC_API_URL; */
const API = "https://servicios.mem.gob.gt";


const endPoints = {
/*   auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  }, */
  persons: {
    /* getPrueba: (id) => `${API}/api/api_prueba/prueba/read/${id}/`, */
    getPersons: `${API}/api/api_prueba/prueba/read`,
/*     addProducts: `${API}/api/${VERSION}/products`,
    updateProducts: (id) => `${API}/api/${VERSION}/products/${id}/`,
    deleteProducts: (id) => `${API}/api/${VERSION}/products/${id}/`, */
 },
  departamentos: {
    getDepartamentosList: `${API}/api/api_prueba/prueba/departamento`,
    


  },
  municipios: {
    getMunicipiosList: `${API}/api/api_prueba/prueba/municipio`,
  },
/*   files: {
    addImage: `${API}/api/${VERSION}/files/upload/`,
  }, */
};

export default endPoints;

