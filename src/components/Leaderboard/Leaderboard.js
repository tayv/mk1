import React, { useState } from 'react'; 

import SeasonResults from '../SeasonResults/SeasonResults.js';
import TypeRadioGroup from '../TypeRadioGroup/TypeRadioGroup';
import FilterListbox from '../SeasonFilter/SeasonFilter.js';
  
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
        <div className="w-10/12 p-4 overflow-x:auto dev-border">
            <div className="flex items-center justify-between p-4 dev-border">
              <TypeRadioGroup value={teamToggle} onChange={onTeamToggleChange} />
              <FilterListbox value={season} onChange={onSeasonFilterChange} />
            </div>
            
            <div>
                <table className="table-auto border-collapse w-full p-4 dev-border">
                    <thead>
                        {
                            (function () {
                                if (season === "allTime") {
                                    return (
                                        <tr>   
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
                                            <th colSpan="2">Racer</th>
                                            <th>Points</th>
                                            <th>Change</th>
                                        </tr>        
                                    )
                                }
                            })()
                        }
                    </thead>
                    <SeasonResults teamToggle={teamToggle} season={season} />
                </table>
            </div>

        </div>
    )
}
  
export default Leaderboard;