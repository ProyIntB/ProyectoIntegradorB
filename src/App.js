import './App.css';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route}  from 'react-router-dom'
import Home from './pages/Home'
import Clientes from './pages/Clientes'
import Vehiculos from './pages/Vehiculos'
import Remisiones from './pages/Remisiones'
import Facturas from './pages/Facturas'
import Historiales from './pages/Historiales'
import firebase from './firebase'
import { useState, useEffect } from 'react';
/*import NavBar from './NavBar'*/
import Login from './authentication/Login';
import SignUp from './authentication/SignUp';

function App() {

  const [user, setUser] = useState('');
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  }

  const userState = () => {
    const data = localStorage.getItem('user');
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  }

  useEffect(() => {
    userState();
  }, []);

  return (
    <>
      {user !== null ? (
        <>
        <Router>
      <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Clientes" component={Clientes}/>
          <Route path="/Vehiculos" component={Vehiculos}/>
          <Route path="/Remisiones" component={Remisiones}/>
          <Route path="/Facturas" component={Facturas}/>
          <Route path="/Historiales" component={Historiales}/>
        </Switch>
    </Router>
        </>
      ) : (
        <>
        {toggleForm ? (<Login loggedIn={(user) => setUser(user)} toggle={() => formMode()} />) 
        : (<SignUp toggle={() => formMode()} />)}
        </>
      )}
    </>

   
  );
}

export default App;
