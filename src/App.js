import logo from './logo.svg';
import './App.css';
import SplienModel from './models/SplineModel.js';
import NavBar from './models/NavBar.js';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <SplienModel/>
    </div>
  );
}


export default App;
