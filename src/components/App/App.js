import Header from '../Header/Header.js'
import Leaderboard from '../Leaderboard/Leaderboard.js';

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-xl bg-blue-100 text-gray-600">
      <Header />
      <Leaderboard />
    </div>
  );
}

export default App;
