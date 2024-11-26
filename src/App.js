import './App.css';
import Login from './components/Login';
import Admin from './components/Admin';
import Medico from './components/Medico';
import Paciente from './components/Paciente';


function App() {

  const currentPath = window.location.pathname
  if (currentPath === '/admin') {
    return <Admin />;
  }
  if (currentPath === '/medico'){
    return <Medico />;
  }
  if (currentPath === '/paciente'){
    return <Paciente />;
  }
  
  return (
    <div className="App">
      <header className='App-header'>
        <Login/>
      </header>

    </div>

  );
}

export default App;
