import React, { useState } from 'react'; 
import './Leaderboard.css';

import SeasonResults from '../SeasonResults/SeasonResults.js';
import SeasonFilter from '../SeasonFilter/SeasonFilter.js';
  
const Leaderboard = () => {
   

    return  (
        <div className="Leaderboard-container">
            <SeasonFilter value={"season2"}/>
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th colspan="2">Racer</th>
                        <th>Points</th>
                        <th>Change</th>
                    </tr>
                </thead>
                    <SeasonResults />
            </table>
        </div>

        </div>
    )
}
  
export default Leaderboard;