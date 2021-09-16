import Header from '../Header/Header.js'
import Leaderboard from '../Leaderboard/Leaderboard.js';

function App() {
  return (
    <div className="flex flex-col w-screen content-start justify-center items-center text-xs sm:text-lg md:text-xl text-gray-600">
      <div className="bg-white">
        <img className="w-screen h-5" src="./bkg_checkerboard.svg" alt="pattern" />
      </div>
      <Header />
      <Leaderboard />
    </div>
  );
}

export default App;
