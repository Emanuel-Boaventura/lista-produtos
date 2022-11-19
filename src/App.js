import api from './api';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Loading from './components/Loading';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Create from './pages/Create';
import NotFound from './pages/NotFound';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(6);

  async function getData() {
    try {
      setLoading(true);
      const { data } = await api.get('/products');
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home
            data={currentData}
            dataPerPage={dataPerPage}
            totalData={data.length}
            paginate={paginate}
            currentPage={currentPage}
            reload={getData}
          />
        </Route>
        <Route path='/edit'>
          <Edit />
        </Route>
        <Route path='/create'>
          <Create />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
