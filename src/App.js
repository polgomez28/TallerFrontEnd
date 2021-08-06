import { Route, Switch } from 'react-router-dom';
//import { Router } from 'workbox-routing';
import Login from './componentes/Login';
import Dashboard from './componentes/Dashboard';
import NotFound from './componentes/NotFound';
import './App.css';

// import Home from './componentes/Home';
// import About from './componentes/About';
// import User from './componentes/User';
// import Ventas from './componentes/Ventas';
// import Destinos from './componentes/Destinos';

function App() {
  return (
    <div className="App">

      <Switch>

        <Route path="/Login" component={Login}></Route>
        <Route path="/Dashboard" component={Dashboard}></Route>
        <Route component={NotFound}></Route>

        {/* <Route exact path="/" component={Home}></Route>
        <Route path="/About" component={About}></Route>
        <Route path="/User/:nombreUsuario" component={User}></Route>
        <Route path="/Ventas" component={Ventas}></Route>
        <Route path="/Destinos" component={Destinos}></Route> */}
      </Switch>

    </div>
  );
}

export default App;
