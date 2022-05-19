const getMunicipio = (municipio, id, dato) => {
  let result = municipio.data?.find((obj) => {
    return obj.id === id;
  });

  return result?.[dato];
};

const getMunicipios = (departamento, id) => {
  let result = departamento.data?.find((obj) => {
    return obj.id === id;
  });

  return result?.municipios;
};

const getDepartamento = (departamento, municipio, municipio_id) => {
  let municipioId = getMunicipio(municipio, municipio_id, 'departamento_id');
  let result = departamento.data?.find((obj) => {
    return obj.id === municipioId;
  });

  return result?.nombre;
};

export { getMunicipio, getMunicipios, getDepartamento };
