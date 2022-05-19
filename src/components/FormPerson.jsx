import { useRef } from 'react';
import { useRouter } from 'next/router';
import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';
import { addPerson, updatePerson } from '@services/api/person';
import { getMunicipios } from '@services/api/getData';

export default function FormPerson({ setOpen, setAlert, person }) {
  const departamentos = useFetch(endPoints.departamentos.getDepartamentosList);

  const handleClick = (event) => {
    event.preventDefault();
    var departamentoSelect = document.getElementById('departamento');
    var municipiosSelect = document.getElementById('municipio');
    municipiosSelect.options.length = 1;
    getMunicipios(departamentos, parseInt(departamentoSelect.value))?.map((municipio) => {
      let opcion = document.createElement('option');
      opcion.value = municipio.id;
      opcion.text = municipio.nombre;
      municipiosSelect?.add(opcion);
    });
  };

  const formRef = useRef(null);
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      dpi: formData.get('dpi'),
      nit: formData.get('nit'),
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      direccion: formData.get('direccion'),
      municipio: parseInt(formData.get('municipio')),
    };
    console.log(data);
    if (person) {
      updatePerson(person.id, data).then(() => {
        router.push('/dashboard/persons');
      });
    } else {
      addPerson(data)
        .then(() => {
          setAlert({
            active: true,
            message: 'Persona agregada con éxito',
            type: 'success',
            autoClose: false,
          });
          setOpen(false);
        })
        .catch((error) => {
          setAlert({
            active: true,
            message: error.message,
            type: 'error',
            autoClose: false,
          });
        });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="dpi" className="block text-sm font-medium text-gray-700">
                DPI
              </label>
              <input
                defaultValue={person?.dpi}
                type="number"
                name="dpi"
                id="dpi"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="nit" className="block text-sm font-medium text-gray-700">
                NIT
              </label>
              <input
                defaultValue={person?.nit}
                type="number"
                name="nit"
                id="nit"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                defaultValue={person?.nombre}
                type="text"
                name="nombre"
                id="nombre"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                Apellido
              </label>
              <input
                defaultValue={person?.apellido}
                type="text"
                name="apellido"
                id="apellido"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                Direccion
              </label>
              <textarea
                defaultValue={person?.direccion}
                name="direccion"
                id="direccion"
                autoComplete="direccion"
                rows="3"
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">
                Departamento
              </label>
              <select
                onClick={handleClick}
                id="departamento"
                name="departamento"
                autoComplete="departamento-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option onClick={handleClick} value="0">Seleccione</option>
                {departamentos.data?.map((departamento) => (
                  <option key={departamento.id} value={departamento.id}>{`${departamento.nombre}`}</option>
                ))}
              </select>
            </div>

            <div className="col-span-6">
              <label htmlFor="municipio" className="block text-sm font-medium text-gray-700">
                Municipio
              </label>
              <select
                id="municipio"
                name="municipio"
                defaultValue={person?.municipio_id}
                autoComplete="municipio-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="0">Seleccione</option>
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
