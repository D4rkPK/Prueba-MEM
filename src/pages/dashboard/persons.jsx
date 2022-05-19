import React, { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@common/Modal';
import FormProduct from '@components/FormPerson';
import axios from 'axios';
import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';
import Alert from '@common/Alert';
import { deletePerson } from '@services/api/person';
import { getMunicipio, getDepartamento } from '@services/api/getData';

export default function Persons() {
  const municipios = useFetch(endPoints.municipios.getMunicipiosList);
  const departamentos = useFetch(endPoints.departamentos.getDepartamentosList);
  const [open, setOpen] = useState(false);
  const [persons, setPersons] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    async function getPersons() {
      const response = await axios.get(endPoints.persons.AllPersons);
      setPersons(response.data);
    }
    try {
      getPersons();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  const handleDelete = (id) => {
    deletePerson(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Persona eliminada con éxito',
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
  };

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <div className="lg:flex lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Lista de personas</h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpen(true)}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Nueva persona
            </button>
          </span>
        </div>
      </div>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DPI
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NIT
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Direccion
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departamento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    municipio
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {persons.data?.map((person) => (
                  <tr key={`Person-item-${person.id}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${person.nombre}+${person.apellido}`} width={64} height={64} alt="avatar" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.nombre} {person.apellido} {person.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.dpi}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.nit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.direccion}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getDepartamento(departamentos, municipios, person.municipio_id)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getMunicipio(municipios, person.municipio_id, 'nombre')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/edit/${person.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <label className="text-red-600 hover:text-red-900 cursor-pointer" onClick={() => handleDelete(person.id)}>
                        Eliminar
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormProduct setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </>
  );
}
