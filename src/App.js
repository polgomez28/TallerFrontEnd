import './App.css';
import { Route, Switch } from 'react-router-dom';

import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import NotFound from './componentes/NotFound';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Dashboard" component={Dashboard}></Route>
        <Route component={Login}></Route>
      </Switch>
    </div>
  );
}



export default App;
