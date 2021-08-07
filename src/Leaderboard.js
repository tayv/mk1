import React, { useState } from 'react'; 
import './Leaderboard.css';
import SeasonResults from './SeasonResults.js';
  
const Leaderboard = () => {
   

    return  (
        <div className="Leaderboard-container">
            <div className="Leaderboard-filter"> 
                <label for="season" style={{visibility: "hidden"}}>Season: </label>
                <select name="season" id="season">
                    <option value="season1">Season 1</option>
                    <option value="season2">Season 2</option>
                    <option value="alltime">All Time</option>
                </select> 
            </div>
        
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