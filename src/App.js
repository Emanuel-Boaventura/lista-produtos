import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Edit from './pages/Edit';
import Create from './pages/Create';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/edit/:productId'>
          <Edit />
        </Route>
        <Route path='/create'>
          <Create />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      <ToastContainer autoClose={2500} />
    </Router>
  );
}

export default App;
