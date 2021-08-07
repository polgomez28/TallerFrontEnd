import { Route, Switch } from 'react-router-dom';

import { Router } from 'workbox-routing';
import Home from './componentes/Home';
import About from './componentes/About';
import User from './componentes/User';

//import { Router } from 'workbox-routing';

import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import NotFound from './componentes/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">

      <Switch>

        <Route path="/Login" component={Login}></Route>
        <Route path="/Dashboard" component={Dashboard}></Route>
        <Route component={NotFound}></Route>
      </Switch>



    </div>
  );
}

export default App;
