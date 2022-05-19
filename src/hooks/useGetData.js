import { useState, useEffect } from 'react';

const useGetData = (endPoint, dataId) => {
  const data = [] ;

  let result = endPoint.data?.find((obj) => {
    return obj.id === dataId;
  });
  console.log(result?.nombre);



  async function fetchData() {
    const response = await endPoint.data?.find((obj) => {
    return obj.id === dataId;
  });
    setData(response?.data);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return data;
};

export default useGetData;
