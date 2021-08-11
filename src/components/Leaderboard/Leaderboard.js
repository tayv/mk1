import React, { useState } from 'react'; 
import './Leaderboard.css';

import SeasonResults from '../SeasonResults/SeasonResults.js';
import SeasonFilter from '../SeasonFilter/SeasonFilter.js';
  
const Leaderboard = () => {
    const [season, setSeason] = useState("season2");

    const onSeasonFilterChange = (value) => {
        setSeason(value);   
       }

    return  (
        <div className="Leaderboard-container">
            <SeasonFilter value={season} onChange={onSeasonFilterChange}/>
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th colSpan="2">Racer</th>
                        <th>Points</th>
                        <th>Change</th>
                    </tr>
                </thead>
                    <SeasonResults season={season} />
            </table>
        </div>

        </div>
    )
}
  
export default Leaderboard;