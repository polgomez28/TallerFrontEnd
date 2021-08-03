import { Route, Switch } from 'react-router-dom';
//import { Router } from 'workbox-routing';
import Home from './componentes/Home';
import About from './componentes/About';
import User from './componentes/User';
import Login from './componentes/Login';
import NotFound from './componentes/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>

        <Route exact path="/" component={Home}></Route>
        <Route path="/About" component={About}></Route>
        <Route path="/User/:nombreUsuario" component={User}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
