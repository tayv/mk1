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
        <div className="w-screen md:w-10/12">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center sm:justify-between pt-4 pb-2 sm:pb-3">
              <TypeRadioGroup value={teamToggle} onChange={onTeamToggleChange} />
              <FilterListbox value={season} onChange={onSeasonFilterChange} />
            </div>
            
            <div className="border-gray-400 border-2 shadow-xl rounded-lg overflow-x-scroll">
                <table className="table-auto w-full p-4">
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