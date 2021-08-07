import { Route, Switch } from 'react-router-dom';

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
