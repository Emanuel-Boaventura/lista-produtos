import api from './api';
import { useState, useEffect } from 'react';

import Loading from './pages/Loading';
import Home from './pages/Home';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const { data } = await api.get('/produtos');
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  // Get current data
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loading />;

  return (
    <Home
      data={currentData}
      dataPerPage={dataPerPage}
      totalData={data.length}
      paginate={paginate}
      currentPage={currentPage}
    />
  );
}

export default App;
