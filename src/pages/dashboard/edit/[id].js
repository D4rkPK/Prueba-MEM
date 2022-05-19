import FormPerson from '@components/FormPerson';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';

export default function Edit() {
  const [person, setPerson] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getPerson() {
      const getPersonList = await axios.get(endPoints.persons.AllPersons);
      const response = getPersonList.data.data?.find((obj) => {
        return obj.id === parseInt(id);
      });
      setPerson(response);
    }
    getPerson();
  }, []);

  return <FormPerson person={person} />;
}
