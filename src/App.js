import './App.css';
import GameService from './components/GameService/GameService';
import LeftMenu from './components/LeftMenu/LeftMenu';


function App() {
  return (
    <div className="App">
        <LeftMenu />
        <GameService />
    </div>
  );
}

export default App;
