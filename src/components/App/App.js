import './App.css';
import Header from '../Header/Header.js'
import Leaderboard from '../Leaderboard/Leaderboard.js';

function App() {
  return (
    <div className="App-container flex flex-col justify-center items-center min-h-screen text-xl bg-gray-900 text-gray-100">
      <Header />
      <Leaderboard />
    </div>
  );
}

export default App;
