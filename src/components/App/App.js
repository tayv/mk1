import Header from '../Header/Header.js'
import Leaderboard from '../Leaderboard/Leaderboard.js';

function App() {
  return (
    <div className="flex flex-col w-screen min-h-screen justify-center items-center text-xs sm:text-lg md:text-xl bg-blue-100 text-gray-600">
      <Header />
      <Leaderboard />
    </div>
  );
}

export default App;
