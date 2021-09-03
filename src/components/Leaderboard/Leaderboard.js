import React, { useState } from 'react'; 
import './Leaderboard.css';

import SeasonResults from '../SeasonResults/SeasonResults.js';
import SeasonFilter from '../SeasonFilter/SeasonFilter.js';
  
const Leaderboard = () => {
    // Default to latest season so most likely to load relevant results
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
                    {
                        (function () {
                            if (season === "allTime") {
                            return (
                                <tr>
                                    <th></th>
                                    <th>Racer</th>
                                    <th>Championship</th>
                                    <th>Gold</th>
                                    <th>Silver</th>
                                    <th>Bronze</th>
                                    <th>Time Trial</th>
                                </tr>
                            ) 
                            } else {
                                return (
                                    <tr>
                                        <th></th>
                                        <th>Racer</th>
                                        <th>Points</th>
                                        <th>Change</th>
                                    </tr>        
                                )
                            }
                        })()
                    }
                </thead>
                <SeasonResults season={season} />
            </table>
        </div>

        </div>
    )
}
  
export default Leaderboard;