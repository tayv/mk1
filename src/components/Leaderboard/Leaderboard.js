import React, { useState } from 'react'; 
import './Leaderboard.css';

import SeasonResults from '../SeasonResults/SeasonResults.js';
import SeasonFilter from '../SeasonFilter/SeasonFilter.js';
import TeamIndividualToggle from '../TeamToggle/TeamToggle';
  
const Leaderboard = () => {
    // Default to latest season so most likely to load relevant results
    const [season, setSeason] = useState("season2");
    const [teamToggle, setTeamToggle] = useState("individual");

    const onTeamToggleChange = (value) => {
        setTeamToggle(value);   
       }

    const onSeasonFilterChange = (value) => {
        setSeason(value);   
       }

    return  (
        <div className="Leaderboard-container">
            <div className="Leaderboard-filter">
              <TeamIndividualToggle value={teamToggle} onChange={onTeamToggleChange} />
              <SeasonFilter value={season} onChange={onSeasonFilterChange}/>
            </div>
            
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