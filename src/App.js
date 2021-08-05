import { Route, Switch } from 'react-router-dom';
import { Router } from 'workbox-routing';
import Home from './componentes/Home';
import About from './componentes/About';
import User from './componentes/User';
import Login from './componentes/Login';
import NotFound from './componentes/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Obligatorio React<code>src/App.js</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </header>

      <Switch>

        <Route exact path="/" component={Home}></Route>
        <Route path="/About" component={About}></Route>
        <Route path="/User" component={User}></Route>
        <Route path="/Login" component={Login}></Route>
        <Route component={NotFound}></Route>
      </Switch>

    </div>
  );
}

export default App;
